import ModuleProvider from '../../Modules/ModuleProvider';
import AbstractClass from '../../Support/AbstractClass';

export default class EventResolver extends AbstractClass {
  /**
   * Class constructor.
   *
   * @returns {void}
   */
  constructor() {
    super();

    this
      .require('events')
      .require('resolve')
      .require('suitable')
      .shouldNotBeInstantiated('Event')
      .check();

    this.modules = [];
  }


  /**
   * Assigns given module provider to this event.
   *
   * @param   {ModuleProvider} module  The module to be assiged
   * @returns {void}
   */
  assign(module) {
    if (!(module instanceof ModuleProvider)) {
      throw new TypeError('Module provider must be a child of the ModuleProvider class');
    }

    this.modules.push(module);
  }


  /**
   * Start up the rtm listeners.
   *
   * @param   {RtmClient} rtm  The real time messaging client instance
   * @param   {Slack} slack  The Slack client class
   * @returns {void}
   */
  listen(rtm, slack) {
    this.rtm = rtm;
    this.slack = slack;

    this.events().forEach(event =>
      this.rtm.on(event, (message) => {
        this.modules.forEach(module =>
          this.resolve(module, message)
        );
      })
    );
  }
}
