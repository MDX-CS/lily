export default class CommandParser {
  /**
   * Decides whether the given user was mentioned in given message.
   *
   * @param   {int} id  The id of the entity mentioned
   * @param   {string} message  The message to test against
   * @returns {bool}  Whether the given user was mentioned
   */
  static isMentioned(id, message) {
    if (message === undefined) {
      return false;
    }

    return message.includes(`<@${id}>`);
  }


  /**
   * Parses the arguments of given message.
   *
   * @param   {string} message  The message to parse
   * @returns {Array}  The arguments parsed
   */
  static getArgs(message) {
    let record = false;
    const args = [];

    message.split(' ').forEach((fraction) => {
      if (record) {
        args.push(fraction);
      }

      if (fraction.match(/<@.+>/)) {
        record = true;
      }
    });

    return args;
  }
}
