export default class CommandParser {
  /**
   * Decides whether the given user was mentioned in given message
   *
   */
  static isMentioned(id, message) {
    return message.includes(`<@${id}>`);
  }


  /**
   * Parses the arguments of given message
   *
   */
  static getArgs(message) {
    let record = false;
    let args = [];

    message.split(' ').forEach((fraction) => {
      if (record) {
        args.push(fraction);
      }

      if (fraction.match(/\<@.+\>/)) {
        record = true;
      }
    })

    return args;
  }
}
