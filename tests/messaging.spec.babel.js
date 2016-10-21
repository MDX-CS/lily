import { expect } from 'chai';
import MessageBuilder from '../src/Messaging/MessageBuilder';

describe('Message builder', () => {
  it('should be able to assing a channel', () => {
    let builder = new MessageBuilder(null);
    builder.channel('someChannel');

    expect(builder.channel).to.equal('someChannel');
  });

  it('should be able to type a text message', () => {
    let builder = new MessageBuilder(null);
    builder.text('some text');

    expect(builder.text).to.equal('some text');
  });

  it('should be able to mention a user', () => {
    let builder = new MessageBuilder(null);

    expect(builder.text('hello, <@1>').mention('user').render()).to.equal('hello, <@user>');
  });

  it('should provide an instance of RTM', () => {
    let builder = new MessageBuilder('RTM');

    expect(builder.getRtm()).to.equal('RTM');
  });
});
