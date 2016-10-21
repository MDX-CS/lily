export default class MessageBuilder {
  /**
   * Class constructor
   *
   */
  constructor(rtm) {
    this.rtm = rtm;
  }


  /**
   * Get the rtm variable
   *
   */
  rtm() {
    return this.rtm;
  }
}
