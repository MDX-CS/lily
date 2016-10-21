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
  register(box, builder) {
    builder
      .channel(box.channel())
      .text('Hello, <@1>')
      .mention(box.user())
      .attach((attachment) => {
        return attachment.text('How is it going?');
      })
      .send();
  }
}
