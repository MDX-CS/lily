import AttachmentBuilder from './AttachmentBuilder';

export default class MessageBuilder {
  /**
   * Class constructor
   *
   */
  constructor(rtm, slack, box) {
    this.slack = slack;
    this.rtm = rtm;
    this.box = box;
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
   * Set channel
   *
   */
  respond() {
    this.channel(this.box.channel());

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
   * Adds attachment to the message
   *
   */
  attach(callback) {
    if (this.attachments === undefined) {
      this.attachments = [];
    }

    this.attachments.push(callback(new AttachmentBuilder).build());

    return this;
  }


  /**
   * Sends the message through rtm
   *
   */
  send() {
    if (this.attachments === undefined) {
      return this.rtm.sendMessage(this.buildSimpleMessage(), this.channel);
    }

    return this.slack.api('chat.postMessage', this.buildMessageWithAttachments());
  }


  /**
   * Render the text
   *
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
   * Get the rtm variable
   *
   */
  buildMessageWithAttachments() {
    return {
      as_user: true,
      channel: this.channel,
      text: this.buildSimpleMessage(),
      attachments: JSON.stringify(this.attachments)
    };
  }


  /**
   * It builds up messages
   *
   */
  getRtm() {
    return this.rtm;
  }
}
