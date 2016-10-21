import HelloModuleProvider from '../Modules/Hello/HelloModuleProvider';
import ModuleProvider from '../Modules/ModuleProvider';
import MessageBox from '../Messaging/MessageBox';

export default class EventHandler {
  /**
   * We boot up the service
   *
   */
  constructor(builder, events) {
    this.events = events;
    this.builder = builder;
    this.rtm = builder.getRtm();
    this.modules = new Array();

    this.registerModules();

    this.rtm.start();
  }


  /**
   * Register all event modules
   *
   */
  registerModules() {

    this
      .assign(this.events.MESSAGE, new HelloModuleProvider(this.builder));

  }


  /**
   * Listen to various events
   *
   */
  listen() {
    for (let event in this.modules) {
      this.rtm.on(event, (message) => {
        let box = new MessageBox(message);

        if (! box.isMentioned(this.rtm.activeUserId)) {
          return;
        }

        this.modules[event].forEach((module) => this.resolveModule(module, box));
      });
    }
  }


  /**
   * Assign a module to given event
   *
   */
  assign(event, module) {
    if (this.modules[event] === undefined) {
      this.modules[event] = new Array;
    }

    this.modules[event].push(module);

    return this;
  }


  /**
   * Assign a module to given event
   *
   */
  resolveModule(module, box) {
    if (module.commands().indexOf(box.args(0)) === -1) {
      return;
    }

    if (! module instanceof ModuleProvider) {
      throw new TypeError('Module provider must be a child of the ModuleProvider class');
    }

    module.register(box);
  }
}
