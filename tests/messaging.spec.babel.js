import { expect } from 'chai';
import AttachmentBuilder from '../src/Messaging/AttachmentBuilder';
import MessageBuilder from '../src/Messaging/MessageBuilder';
import MessageBox from '../src/Messaging/MessageBox';

describe('Message builder', () => {
  it('assings a channel', () => {
    let builder = new MessageBuilder(null);
    builder.channel('someChannel');

    expect(builder.channel).to.equal('someChannel');
  });

  it('produces a text message', () => {
    let builder = new MessageBuilder(null);
    builder.text('some text');

    expect(builder.text).to.equal('some text');
  });

  it('mentions a user', () => {
    let builder = new MessageBuilder(null);

    expect(builder.text('hello, <@1>').mention('user').buildSimpleMessage()).to.equal('hello, <@user>');
  });

  it('provides an instance of RTM', () => {
    let builder = new MessageBuilder('RTM');

    expect(builder.getRtm()).to.equal('RTM');
  });

  it('builds up attachments', () => {
    let builder = new MessageBuilder();
    builder.attach((attachment) => attachment.text('someAttachmentText'));

    expect(builder.attachments).to.have.deep.property('[0].text', 'someAttachmentText');
  });

  it('builds up multiple attachments', () => {
    let builder = new MessageBuilder();
    builder.attach((attachment) => attachment.text('someAttachmentText'))
      .attach((attachment) => attachment.text('anotherAttachmentText'));

    expect(builder.attachments).to.have.deep.property('[0].text', 'someAttachmentText');
    expect(builder.attachments).to.have.deep.property('[1].text', 'anotherAttachmentText');
  });

  it('builds up message with attachments', () => {
    let builder = new MessageBuilder();
    builder.text('Hello!')
      .attach((attachment) => attachment.text('How is it going?'));

    let data = builder.buildMessageWithAttachments();

    expect(data).to.have.property('text', 'Hello!');
    expect(data).to.have.property('attachments', '[{"text":"How is it going?"}]');
  });

  it('mentions people in a message with attachments', () => {
    let builder = new MessageBuilder();
    builder.text('Hello, <@1>')
      .mention('user')
      .attach((attachment) => attachment.text('How is it going?'));

    let data = builder.buildMessageWithAttachments();

    expect(data).to.have.property('text', 'Hello, <@user>');
    expect(data).to.have.property('attachments', '[{"text":"How is it going?"}]');
  });
});

describe('Message box', () => {
  it('provides parsed arguments', () => {
    let message = { text: 'Hello, <@lily> greet Hello' };

    expect(new MessageBox(message).args()).to.include('greet')
      .and.include('Hello');
  });

  it('provides parsed arguments by their id', () => {
    let message = { text: 'Hello, <@lily> greet Hello' };
    let box = new MessageBox(message);

    expect(box.args(0)).to.equal('greet');
    expect(box.args(1)).to.equal('Hello');
  });

  it('provides the channel name', () => {
    let message = { channel: 'someChannel' };
    let box = new MessageBox(message);

    expect(box.channel()).to.equal('someChannel');
  });

  it('provides the sender\'s name', () => {
    let message = { user: 'someUser' };
    let box = new MessageBox(message);

    expect(box.user()).to.equal('someUser');
  });

  it('decides whetver given user is mentioned in the message', () => {
    let message = { user: 'someUser', text: 'Hello, <@someUser>!' };
    let box = new MessageBox(message);

    expect(box.isMentioned('someUser')).to.be.true;
  });
});

describe('Attachment builder', () => {
  it('adds text to the attachment', () => {
    let attachment = new AttachmentBuilder;
    attachment.text('someAttachmentText');

    expect(attachment.structure.text).to.equal('someAttachmentText');
  });

  it('adds title to the attachment', () => {
    let attachment = new AttachmentBuilder;
    attachment.title('someAttachmentLink', 'some-link');

    expect(attachment.structure.title).to.equal('someAttachmentLink');
    expect(attachment.structure.title_link).to.equal('some-link');
  });

  it('adds author to the attachment', () => {
    let attachment = new AttachmentBuilder;
    attachment.author('someAttachmentAuthor', 'some-link');

    expect(attachment.structure.author).to.equal('someAttachmentAuthor');
    expect(attachment.structure.author_link).to.equal('some-link');
  });

  it('changes the color of the attachment', () => {
    let attachment = new AttachmentBuilder;
    attachment.color('someColor');

    expect(attachment.structure.color).to.equal('someColor');
  });

  it('adds footer to the attachment', () => {
    let attachment = new AttachmentBuilder;
    attachment.footer('someAttachmentFooter');

    expect(attachment.structure.footer).to.equal('someAttachmentFooter');
  });

  it('adds timestamp to the attachment', () => {
    let attachment = new AttachmentBuilder;
    attachment.timestamp(123);

    expect(attachment.structure.ts).to.equal(123);
  });

  it('automatically determines timestamp for the attachment', () => {
    let attachment = new AttachmentBuilder;
    attachment.timestamp();

    expect(attachment.structure.ts).to.equal(Math.floor(Date.now() / 1000));
  });

  it('builds the attachment object', () => {
    let attachment = new AttachmentBuilder;
    attachment.text('someAttachmentText');

    expect(attachment.build()).to.have.property('text', 'someAttachmentText');
  });
});

