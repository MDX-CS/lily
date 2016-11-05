import ModuleProvider from '../ModuleProvider';

export default class RegexModuleProvider extends ModuleProvider {
  /**
   * Assing the command keyword
   *
   */
  commands() {
    return {
      pattern: /.+ regex .+/
    };
  }


  /**
   * Register the module provider
   *
   */
  register(box, builder) {
    builder
      .respond()
      .text('Hello!')
      .send();
  }
}
