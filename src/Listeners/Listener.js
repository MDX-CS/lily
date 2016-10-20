export default class Listener {
  /**
   * Class constructor
   *
   */
  constructor(RTM) {
    // Do not let people instantiate this class
    // if (new.target === Listener) {
    //   throw new TypeError("Cannot construct Abstract instances directly");
    // }

    // Make the implementation of the trigger method obligatory
    if (this.trigger === undefined) {
      throw new TypeError("Must override method trigger()");
    }

    // Assign our dependencies
    this.RTM = RTM;
  }


}
