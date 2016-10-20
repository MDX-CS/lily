import ModuleProvider from '../ModuleProvider';

export default class HelloModuleProvider extends ModuleProvider{
  /**
   * Assing the command keyword
   *
   */
  command() {
    return 'greet';
  }

  /**
   * Register the module provider
   *
   */
  register(args) {
    console.log('Hey');
  }
}
