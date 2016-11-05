import ModuleProvider from '../ModuleProvider';

export default class HelloModuleProvider extends ModuleProvider {
  /**
   * Assing the command keywords.
   *
   * @returns {Array|Object}  Keywords
   */
  commands() {
    return ['greet'];
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
      .text('Hello, <@1>')
      .mention(box.user())
      .attach(attachment =>
        attachment
          .info()
          .text('How is it going?')
          .fields({
            Hello: 'World',
            AlsoHello: 'Universe',
          })
          .title('Greeting')
          .footer('By kouks')
          .timestamp()
      )
      .send();
  }
}
