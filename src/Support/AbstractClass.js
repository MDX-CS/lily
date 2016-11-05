export default class AbstractClass {
  /**
   * Constructor.
   *
   * @returns {void}
   */
  check() {
    this.required.forEach((method) => {
      if (this[method] === undefined) {
        throw new TypeError(`Must implement the ${method}() method`);
      }
    });
  }

  /**
   * Assign a required method.
   *
   * @param   {string} method  The name of the method
   * @returns {this}  Instance of this class
   */
  require(method) {
    if (this.required === undefined) {
      this.required = [];
    }

    this.required.push(method);

    return this;
  }


  /**
   * Abstract class should not be instantiated directly.
   *
   * @param   {string} name  The name of the class
   * @returns {this}  Instance of this class
   */
  shouldNotBeInstantiated(name) {
    if (this.constructor === AbstractClass || this.constructor.name === name) {
      throw new TypeError('This class is abstract and should not ne instantiated directly');
    }

    return this;
  }
}
