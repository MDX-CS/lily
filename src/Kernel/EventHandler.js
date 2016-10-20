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

    // We register all our modules
    this.registerModules();

    // Start up the real time messaging channel
    this.RTM.start();
  }


  /**
   * Register all event modules
   *
   */
  registerModules() {

    this.assign(this.Events.MESSAGE, new HelloModuleProvider(this.RTM));

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
          this.resolveModule(module, CommandParser.getArgs(message.text))}
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
  resolveModule(module, args) {
    if (module.command() !== args[0]) {
      return;
    }

    if (! module instanceof ModuleProvider) {
      throw new TypeError('Module must be a child of the ModuleProvider class');
    }

    module.register(args.slice(1));
  }
}
