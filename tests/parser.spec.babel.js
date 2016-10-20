import { expect } from 'chai';
import CommandParser from '../src/Parser/CommandParser';

describe('When parsing a message it', () => {
  it('should find out whether the bot has been mentioned', () => {
    let id = 'lily';
    let message = 'Some text <@lily> Some more text';

    expect(CommandParser.isMentioned(id, message)).to.be.true;
  });

  it('should determine the command args', () => {
    let message = 'Some text <@lily> some more args';

    expect(CommandParser.getArgs(message)).to.include('some')
      .and.include('more')
      .and.include('args');
  });
});
