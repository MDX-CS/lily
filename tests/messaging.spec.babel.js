import { expect } from 'chai';
import MessageBuilder from '../src/Messaging/MessageBuilder';
import MessageBox from '../src/Messaging/MessageBox';

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

describe('Message box', () => {
  it('should provide parsed arguments', () => {
    let message = { text: 'Hello, <@lily> greet Hello' };

    expect(new MessageBox(message).args()).to.include('greet')
      .and.include('Hello');
  });

  it('should provide parsed arguments by their id', () => {
    let message = { text: 'Hello, <@lily> greet Hello' };
    let box = new MessageBox(message);

    expect(box.args(0)).to.equal('greet');
    expect(box.args(1)).to.equal('Hello');
  });

  it('should provide the channel name', () => {
    let message = { channel: 'someChannel' };
    let box = new MessageBox(message);

    expect(box.channel()).to.equal('someChannel');
  });

  it('should provide the sender\'s name', () => {
    let message = { user: 'someUser' };
    let box = new MessageBox(message);

    expect(box.user()).to.equal('someUser');
  });

  it('should decide whetver given user is mentioned the the message text', () => {
    let message = { user: 'someUser', text: 'Hello, <@someUser>!' };
    let box = new MessageBox(message);

    expect(box.isMentioned('someUser')).to.be.true;
  });
});
