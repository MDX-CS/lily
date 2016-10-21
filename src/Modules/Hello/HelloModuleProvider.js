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
  register(box) {
    this.builder
      .channel(box.channel())
      .text('Hello, <@1>')
      .mention(box.user())
      .send();
  }
}
