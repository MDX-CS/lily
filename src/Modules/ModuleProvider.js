import AbstractClass from '../Support/AbstractClass';

export default class ModuleProvider extends AbstractClass {
  /**
   * Class constructor
   *
   */
  constructor() {
    super();

    this.require('register')
      .require('commands')
      .shouldNotBeInstantiated('ModuleProvider')
      .check();
  }
}
