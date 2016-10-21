export default class AttachmentBuilder {
  /**
   * Constructor
   *
   */
  constructor() {
    this.structure = { };
  }


  /**
   * Adds text to the attachment
   *
   */
  text(body) {
    this.structure.text = body;

    return this;
  }


  /**
   * Adds title to the attachment
   *
   */
  title(body, url) {
    this.structure.title = body;
    this.structure.title_link = url;

    return this;
  }


  /**
   * Adds author to the attachment
   *
   */
  author(body, url) {
    this.structure.author = body;
    this.structure.author_link = url;

    return this;
  }


  /**
   * Changes color of the attachment
   *
   */
  color(body) {
    this.structure.color = body;

    return this;
  }


  /**
   * Adds footer to the attachment
   *
   */
  footer(body) {
    this.structure.footer = body;

    return this;
  }


  /**
   * Adds timestamp to the attachment
   *
   */
  timestamp(body) {
    if (body === undefined) {
      this.structure.ts = Math.floor(Date.now() / 1000);

      return this;
    }

    this.structure.ts = body;

    return this;
  }


  /**
   * Builds the attachment object
   *
   */
  build() {
    return this.structure;
  }
}
