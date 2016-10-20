import Listener from './Listener';

export default class SayHelloWorld extends Listener {
  /**
   * Triggers the command
   *
   */
  trigger(message) {
    this.RTM.sendMessage('Hello World!', message.channel);
  }
}
