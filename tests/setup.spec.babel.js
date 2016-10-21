import { expect } from 'chai';
import SlackClient from '@slack/client';

require('dotenv').config();

describe('On setup it', () => {
	it('should load environment file', () => {
		expect(process.env.APP_NAME).to.equal('Lily');
    expect(process.env.SLACK_API_TOKEN).to.exist;
	});

  it('should connect to the RTM Client', () => {
    let RTM = new SlackClient.RtmClient(process.env.SLACK_API_TOKEN);
    expect(RTM).to.be.ok;
  });
});
