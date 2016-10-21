export default class MessageBuilder {
  /**
   * Class constructor
   *
   */
  constructor(rtm, slack) {
    this.slack = slack;
    this.rtm = rtm;
  }


  /**
   * Set channel
   *
   */
  channel(channel) {
    this.channel = channel;

    return this;
  }


  /**
   * Set text
   *
   */
  text(text) {
    this.text = text;

    return this;
  }


  /**
   * Add mention clause
   *
   */
  mention(id) {
    if (this.mentions === undefined) {
      this.mentions = new Array;
    }

    this.mentions.push(id);

    return this;
  }


  /**
   * Render the text
   *
   */
  render(id) {
    let rendered = '';

    this.mentions.forEach((mention, index) => {
      rendered += this.text.replace(`<@${index + 1}>`, `<@${mention}>`);
    });

    return rendered;
  }


  /**
   * Sends the message through rtm
   *
   */
  send() {
    return this.rtm.sendMessage(this.render(), this.channel);
  }


  /**
   * Get the rtm variable
   *
   */
  getRtm() {
    return this.rtm;
  }
}
