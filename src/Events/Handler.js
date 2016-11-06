import HelloModuleProvider from '../Modules/Hello/HelloModuleProvider';
import RegexModuleProvider from '../Modules/Regex/RegexModuleProvider';
import PunsModuleProvider from '../Modules/Puns/PunsModuleProvider';

import MessageEventResolver from './Resolvers/MessageEventResolver';

export default class EventHandler {
  /**
   * We boot up the service.
   *
   * @param   {RtmClient} rtm  The real time messaging client
   * @param   {Slack} slack  The Slack client class
   * @returns {void}
   */
  constructor(rtm, slack) {
    this.rtm = rtm;
    this.slack = slack;

    // We need to register all Resolvers as well as Modules. This
    // is the place where you register newly creted modules and
    // resolvers with the application kernel.
    this.registerResolvers();
    this.registerModules();

    this.rtm.start();
  }


  /**
   * Register all modules.
   *
   * @returns {void}
   */
  registerModules() {
    this
      .message(new HelloModuleProvider())
      .message(new PunsModuleProvider())
      .message(new RegexModuleProvider());
  }


  /**
   * Register all event resolvers.
   *
   * @returns {void}
   */
  registerResolvers() {
    this.resolvers = {
      message: new MessageEventResolver(),
    };
  }


  /**
   * Listen to various events.
   *
   * @returns {void}
   */
  listen() {
    Object.keys(this.resolvers).forEach(resolver =>
      this.resolvers[resolver].listen(this.rtm, this.slack)
    );
  }


  /**
   * Assign a module to a message event.
   *
   * @param   {ModuleProvider} module  The module to be assigned
   * @returns {this}  Instance of this class
   */
  message(module) {
    this.resolvers.message.assign(module);

    return this;
  }
}
