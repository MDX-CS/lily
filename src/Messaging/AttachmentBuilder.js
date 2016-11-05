export default class AttachmentBuilder {
  /**
   * Constructor.
   *
   * @returns {void}
   */
  constructor() {
    this.structure = { };
  }


  /**
   * Adds text to the attachment.
   *
   * @param   {string} body  The attachment body to be assigned
   * @returns {this}  Instance of this class
   */
  text(body) {
    this.structure.text = body;

    return this;
  }


  /**
   * Adds title to the attachment.
   *
   * @param   {string} body  The attachment title body to be assigned
   * @param   {string} url  The attachment title url to be assigned
   * @returns {this}  Instance of this class
   */
  title(body, url) {
    this.structure.title = body;
    this.structure.title_link = url;

    return this;
  }


  /**
   * Adds author to the attachment.
   *
   * @param   {string} body  The attachment author body to be assigned
   * @param   {string} url  The attachment author url to be assigned
   * @returns {this}  Instance of this class
   */
  author(body, url) {
    this.structure.author = body;
    this.structure.author_link = url;

    return this;
  }


  /**
   * Changes color of the attachment.
   *
   * @param   {string} color  The color attachment should be changed to
   * @returns {this}  Instance of this class
   */
  color(color) {
    this.structure.color = color;

    return this;
  }


  /**
   * Changes color of the attachment.
   *
   * @returns {this}  Instance of this class
   */
  danger() {
    this.color('#ff3860');

    return this;
  }


  /**
   * Changes color of the attachment.
   *
   * @returns {this}  Instance of this class
   */
  info() {
    this.color('#3273dc');

    return this;
  }


  /**
   * Changes color of the attachment.
   *
   * @returns {this}  Instance of this class
   */
  success() {
    this.color('#23d160');

    return this;
  }


  /**
   * Changes color of the attachment.
   *
   * @returns {this}  Instance of this class
   */
  warning() {
    this.color('#ffdd57');

    return this;
  }


  /**
   * Adds footer to the attachment.
   *
   * @param   {string} body  The body of the footer.
   * @returns {this}  Instance of this class
   */
  footer(body) {
    this.structure.footer = body;

    return this;
  }


  /**
   * Adds timestamp to the attachment.
   *
   * @param   {string} body  The timestamp to be shown
   * @returns {this}  Instance of this class
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
   * Adds fields to the attachment.
   *
   * @param   {Object} structure  The field structure
   * @returns {this}  Instance of this class
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
   * Builds the attachment object.
   *
   * @returns {this}  Instance of this class
   */
  build() {
    return this.structure;
  }
}
