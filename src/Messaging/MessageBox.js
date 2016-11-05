import CommandParser from '../Parser/CommandParser';

export default class MessageBox {
  /**
   * Class constructor
   *
   */
  constructor(message) {
    this.message = message;
  }

  /**
   * Provides arguments
   *
   */
  args(id) {
    let args = CommandParser.getArgs(this.message.text);

    if (id === undefined) {
      return args;
    }

    return args[id];
  }


  /**
   * Provides the channel name
   *
   */
  channel() {
    return this.message.channel;
  }


  /**
   * Provides the sender's name
   *
   */
  user() {
    return this.message.user;
  }


  /**
   * Provides the message body
   *
   */
  message() {
    return this.message.text;
  }


  /**
   * Decides whether the user with given id was mentioned
   *
   */
  isMentioned(id) {
    return CommandParser.isMentioned(id, this.message.text);
  }
}
