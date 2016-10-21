export default class AbstractClass {
  /**
   * Constructor
   *
   */
  check() {
    this.required.forEach((method) => {
      if (this[method] === undefined) {
        throw new TypeError(`Must implement the ${method}() method`);
      }
    });
  }

  /**
   * Assign a required method
   *
   */
  require(method) {
    if (this.required === undefined) {
      this.required = new Array;
    }

    this.required.push(method);

    return this;
  }


  /**
   * Abstract class should not be instantiated directly
   *
   */
  shouldNotBeInstantiated(name) {
    if (this.constructor === AbstractClass || this.constructor.name == name) {
      throw new TypeError('This class is abstract and should not ne instantiated directly');
    }

    return this;
  }
}
