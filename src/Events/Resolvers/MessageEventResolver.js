import MessageBuilder from '../../Messaging/MessageBuilder';
import MessageBox from '../../Messaging/MessageBox';
import EventResolver from './EventResolver';

export default class MessageEventResolver extends EventResolver {
  /**
   * Returns list of events this class resolves.
   *
   * @returns {Array}  The array of events this class resolves
   */
  events() {
    return ['message'];
  }

  /**
   * Action to resolve the event.
   *
   * @param   {ModuleProvider} module  The module being resolved
   * @param   {Object} message  The event message received from slack
   * @returns {void}
   */
  resolve(module, message) {
    const box = new MessageBox(message);

    if (this.suitable(module, box)) {
      module.register(box, new MessageBuilder(this.rtm, this.slack, box));
    }
  }


  /**
   * Determines whether the module is suitable for the given message.
   *
   * @param   {ModuleProvider} module  The module being tested
   * @param   {MessageBox} box  The message box isntance
   * @returns {bool}  Whether the module is suitable
   */
  suitable(module, box) {
    if (!box.isMentioned(this.rtm.activeUserId)) {
      return false;
    }

    if (Array.isArray(module.commands())) {
      return module.commands().indexOf(box.args(0)) !== -1;
    }

    return box.args().join(' ').match(module.commands().pattern);
  }
}
