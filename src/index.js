/**
 * The ultimate Slack bot.
 *
 * @package lily
 * @author Pavel Koch <kouks.koch@gmail.com>
 */

import Slack from 'slack-node';
import SlackClient from '@slack/client';
import Handler from './Events/Handler';
import { env } from './helpers';

/*
 |-----------------------------------------------------------------------
 | Bring Lily to life
 |-----------------------------------------------------------------------
 |
 | Load the RTM (Real Time Messaging) client and run the app!
 |
 */

const Lily = new Handler(
  new SlackClient.RtmClient(env('SLACK_API_TOKEN')),
  new Slack(env('SLACK_API_TOKEN')),
  SlackClient.RTM_EVENTS,
);

Lily.listen();
