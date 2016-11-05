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
