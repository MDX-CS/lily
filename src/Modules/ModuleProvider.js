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


  /**
   * Determines whether the module is suitable for the given message
   *
   */
  suitable(box) {
    if (Array.isArray(this.commands())) {
      return this.commands().indexOf(box.args(0)) !== -1;
    }

    let partial = box.args().join(' ');

    return partial.match(this.commands().pattern);
  }
}
