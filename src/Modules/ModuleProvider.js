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


  /**
   * Determines whether the module is suitable for the given message.
   *
   * @param   {MessageBox} box  The message box isntance
   * @returns {bool}  Whether the module is suitable
   */
  suitable(box) {
    if (Array.isArray(this.commands())) {
      return this.commands().indexOf(box.args(0)) !== -1;
    }

    return box.args().join(' ').match(this.commands().pattern);
  }
}
