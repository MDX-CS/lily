import ModuleProvider from '../Modules/ModuleProvider';
import HelloModuleProvider from '../Modules/Hello/HelloModuleProvider';
import CommandParser from '../Parser/CommandParser';

export default class EventHandler {
  /**
   * We boot up the service
   *
   */
  constructor(RTM, Events) {
    this.RTM = RTM;
    this.Events = Events;
    this.modules = new Array();

    this.registerModules();

    this.RTM.start();
  }


  /**
   * Register all event modules
   *
   */
  registerModules() {

    this
      .assign(this.Events.MESSAGE, new HelloModuleProvider(this.RTM));

  }


  /**
   * Listen to various events
   *
   */
  listen() {
    for (let event in this.modules) {
      this.RTM.on(event, (message) => {
        if (! CommandParser.isMentioned(this.RTM.activeUserId, message.text)) {
          return;
        }

        this.modules[event].forEach((module) => {
          this.resolveModule(module, CommandParser.getArgs(message.text), message)}
        );
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
  resolveModule(module, args, message) {
    if (module.commands().indexOf(args[0]) === -1) {
      return;
    }

    if (! module instanceof ModuleProvider) {
      throw new TypeError('Module provider must be a child of the ModuleProvider class');
    }

    module.register(args.slice(1), message);
  }
}
