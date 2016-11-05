import CommandParser from '../Parser/CommandParser';

export default class MessageBox {
  /**
   * Class constructor.
   *
   * @param   {Object} message  The message received
   * @returns {void}
   */
  constructor(message) {
    this.message = message;
  }

  /**
   * Provides arguments.
   *
   * @param   {int} id  Desired id of the argument
   * @returns {void}
   */
  args(id) {
    const args = CommandParser.getArgs(this.message.text);

    if (id === undefined) {
      return args;
    }

    return args[id];
  }


  /**
   * Provides the channel name.
   *
   * @returns {string}  The channel name
   */
  channel() {
    return this.message.channel;
  }


  /**
   * Provides the sender's name.
   *
   * @returns {string}  The sender's name
   */
  user() {
    return this.message.user;
  }


  /**
   * Provides the message body.
   *
   * @returns {string}  The message body
   */
  message() {
    return this.message.text;
  }


  /**
   * Decides whether the user with given id was mentioned.
   *
   * @param   {int} id  The user's id
   * @returns {bool}  Whether the user has been mentioned
   */
  isMentioned(id) {
    return CommandParser.isMentioned(id, this.message.text);
  }
}
