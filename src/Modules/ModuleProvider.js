import AbstractClass from '../Support/AbstractClass';

export default class ModuleProvider extends AbstractClass {
  /**
   * Class constructor
   *
   */
  constructor(RTM) {
    super();

    this.require('register')
      .require('commands')
      .check();

    this.RTM = RTM;
  }
}
