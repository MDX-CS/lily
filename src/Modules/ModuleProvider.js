import AbstractClass from '../Support/AbstractClass';

export default class ModuleProvider extends AbstractClass {
  /**
   * Class constructor.
   *
   * @returns {void}
   */
  constructor() {
    super();

    this.require('register')
      .require('commands')
      .shouldNotBeInstantiated('ModuleProvider')
      .check();
  }
}
