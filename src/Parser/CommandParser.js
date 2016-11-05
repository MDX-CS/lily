export default class CommandParser {
  /**
   * Decides whether the given user was mentioned in given message
   *
   */
  static isMentioned(id, message) {
    if (message === undefined) {
      return false;
    }

    return message.includes(`<@${id}>`);
  }


  /**
   * Parses the arguments of given message
   *
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
