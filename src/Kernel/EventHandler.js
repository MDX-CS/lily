import HelloModuleProvider from '../Modules/Hello/HelloModuleProvider';
import PunsModuleProvider from '../Modules/Puns/PunsModuleProvider';
import RegexModuleProvider from '../Modules/Regex/RegexModuleProvider';

import MessageBuilder from '../Messaging/MessageBuilder';
import ModuleProvider from '../Modules/ModuleProvider';
import MessageBox from '../Messaging/MessageBox';

export default class EventHandler {
  /**
   * We boot up the service.
   *
   * @param   {RtmClient} rtm  The real time messaging client
   * @param   {Slack} slack  The Slack client class
   * @param   {Array} events  The array of events
   * @returns {void}
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
   * Register all event modules.
   *
   * @returns {void}
   */
  registerModules() {
    this
      .assign(this.events.MESSAGE, new HelloModuleProvider())
      .assign(this.events.MESSAGE, new PunsModuleProvider())
      .assign(this.events.MESSAGE, new RegexModuleProvider());
  }


  /**
   * Listen to various events.
   *
   * @returns {void}
   */
  listen() {
    Object.keys(this.modules).forEach(event =>
      this.rtm.on(event, (message) => {
        this.modules[event].forEach(module =>
          this.resolveModule(module, new MessageBox(message))
        );
      })
    );
  }


  /**
   * Assign a module to given event.
   *
   * @param   {string} event  The event to be assigned to
   * @param   {ModuleProvider} module  The module to be assigned
   * @returns {this}  Instance of this class
   */
  assign(event, module) {
    if (this.modules[event] === undefined) {
      this.modules[event] = [];
    }

    this.modules[event].push(module);

    return this;
  }


  /**
   * Assign a module to given event.
   *
   * @param   {ModuleProvider} module  The module to be assigned
   * @param   {MessageBox} box  Message box instance
   * @returns {mixed}  Module response
   */
  resolveModule(module, box) {
    if (!box.isMentioned(this.rtm.activeUserId)) {
      return null;
    }

    if (!module.suitable(box)) {
      return null;
    }

    if (!(module instanceof ModuleProvider)) {
      throw new TypeError('Module provider must be a child of the ModuleProvider class');
    }

    return module.register(box, new MessageBuilder(this.rtm, this.slack, box));
  }
}
