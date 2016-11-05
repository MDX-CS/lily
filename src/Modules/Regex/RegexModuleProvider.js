import ModuleProvider from '../ModuleProvider';

export default class RegexModuleProvider extends ModuleProvider {
  /**
   * Assing the command keywords.
   *
   * @returns {Array|Object}  Keywords
   */
  commands() {
    return {
      pattern: /.+ regex .+/,
    };
  }


  /**
   * Register the module provider.
   *
   * @param   {MessageBox} box  The message box instance
   * @param   {MessageBuilder} builder  The message builder instance
   * @returns {mixed}  Response
   */
  register(box, builder) {
    builder
      .respond()
      .text('Hello!')
      .send();
  }
}
