import AttachmentBuilder from './AttachmentBuilder';

export default class MessageBuilder {
  /**
   * Class constructor.
   *
   * @param   {RtmClient} rtm  The real time messaging client
   * @param   {Slack} slack  The Slack client class
   * @param   {MessageBox} box  The Message box instance
   * @returns {void}
   */
  constructor(rtm, slack, box) {
    this.slack = slack;
    this.rtm = rtm;
    this.box = box;
  }


  /**
   * Sets channel.
   *
   * @param   {string} channel  The name of the channel
   * @returns {this}  Instance of this class
   */
  channel(channel) {
    this.channel = channel;

    return this;
  }


  /**
   * Sets previous channel.
   *
   * @returns {this}  Instance of this class
   */
  respond() {
    this.channel(this.box.channel());

    return this;
  }


  /**
   * Sets text.
   *
   * @param   {string} text  The message body
   * @returns {this}  Instance of this class
   */
  text(text) {
    this.text = text;

    return this;
  }


  /**
   * Add mention clause.
   *
   * @param   {int} id  The mentioned user id
   * @returns {this}  Instance of this class
   */
  mention(id) {
    if (this.mentions === undefined) {
      this.mentions = [];
    }

    this.mentions.push(id);

    return this;
  }


  /**
   * Adds attachment to the message.
   *
   * @param   {callable} callback  The attachment builder function
   * @returns {this}  Instance of this class
   */
  attach(callback) {
    if (this.attachments === undefined) {
      this.attachments = [];
    }

    this.attachments.push(callback(new AttachmentBuilder()).build());

    return this;
  }


  /**
   * Sends the message through rtm or webapi.
   *
   * @returns {bool}  Whether the message has been sent
   */
  send() {
    if (this.attachments === undefined) {
      return this.rtm.sendMessage(this.buildSimpleMessage(), this.channel);
    }

    return this.slack.api('chat.postMessage', this.buildMessageWithAttachments());
  }


  /**
   * Render the text.
   *
   * @returns {string}  The rendered message
   */
  buildSimpleMessage() {
    if (this.mentions === undefined) {
      return this.text;
    }

    let rendered = '';

    this.mentions.forEach((mention, index) => {
      rendered += this.text.replace(`<@${index + 1}>`, `<@${mention}>`);
    });

    return rendered;
  }


  /**
   * Builds message with attachments.
   *
   * @returns {Object}  The rendered message with attachments
   */
  buildMessageWithAttachments() {
    return {
      as_user: true,
      channel: this.channel,
      text: this.buildSimpleMessage(),
      attachments: JSON.stringify(this.attachments),
    };
  }


  /**
   * Returns the RTM instance.
   *
   * @returns {RtmClient}  The rtm client
   */
  getRtm() {
    return this.rtm;
  }
}
