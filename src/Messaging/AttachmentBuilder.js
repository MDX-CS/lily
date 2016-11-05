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
   * Changes color of the attachment
   *
   */
  danger() {
    this.color('#ff3860');

    return this;
  }


  /**
   * Changes color of the attachment
   *
   */
  info() {
    this.color('#3273dc');

    return this;
  }


  /**
   * Changes color of the attachment
   *
   */
  success() {
    this.color('#23d160');

    return this;
  }


  /**
   * Changes color of the attachment
   *
   */
  warning() {
    this.color('#ffdd57');

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
   * Adds fields to the attachment
   *
   */
  fields(structure) {
    if (this.structure.fields === undefined) {
      this.structure.fields = [];
    }
    Object.keys(structure).forEach(title =>
      this.structure.fields.push({
        title,
        value: structure[title],
        short: true,
      })
    );

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
