import HelloModuleProvider from '../Modules/Hello/HelloModuleProvider';
import MessageBuilder from '../Messaging/MessageBuilder';
import ModuleProvider from '../Modules/ModuleProvider';
import MessageBox from '../Messaging/MessageBox';

export default class EventHandler {
  /**
   * We boot up the service
   *
   */
  constructor(rtm, slack, events) {
    this.events = events;
    this.rtm = rtm;
    this.slack = slack;
    this.modules = [];

    this.registerModules();

    this.rtm.start();
  }


  /**
   * Register all event modules
   *
   */
  registerModules() {

    this
      .assign(this.events.MESSAGE, new HelloModuleProvider());

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
      this.modules[event] = [];
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

    module.register(box, new MessageBuilder(this.rtm, this.slack));
  }
}
