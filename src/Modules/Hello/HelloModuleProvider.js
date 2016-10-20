import ModuleProvider from '../ModuleProvider';

export default class HelloModuleProvider extends ModuleProvider{
  /**
   * Assing the command keyword
   *
   */
  commands() {
    return ['greet'];
  }

  /**
   * Register the module provider
   *
   */
  register(args, message) {
    this.RTM.sendMessage(`Hello there, <@${message.user}>!`, message.channel);
  }
}
