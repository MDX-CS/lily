import ModuleProvider from '../ModuleProvider';

export default class HelloModuleProvider extends ModuleProvider {
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
    this.builder
      .channel(message.channel)
      .text('Hello, <@1>')
      .mention(message.user)
      .send();
  }
}
