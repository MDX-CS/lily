import { expect } from 'chai';
import SlackClient from '@slack/client';
import { env } from '../src/helpers';

require('dotenv').config();

describe('On setup it', () => {
  it('loads the environment file', () => {
    expect(env('APP_NAME')).to.equal('Lily');
    expect(env('SLACK_API_TOKEN')).to.not.be.empty;
  });

  it('connects to the RTM Client', () => {
    let RTM = new SlackClient.RtmClient(env('SLACK_API_TOKEN'));
    expect(RTM).to.be.ok;
  });
});
