/**
 * Lily bot
 *
 * @package lily
 * @author Pavel Koch <kouks.koch@gmail.com>
 */

import DotEnv from 'dotenv';
import Slack from 'slack-node';
import SlackClient from '@slack/client';
import Handler from './Events/Handler';

/*
 |-----------------------------------------------------------------------
 | Register global configuration
 |-----------------------------------------------------------------------
 |
 | Load .env file
 |
 */

DotEnv.config();

/*
 |-----------------------------------------------------------------------
 | Bring Lily to life
 |-----------------------------------------------------------------------
 |
 | Load the RTM (Real Time Messaging) client and run the app!
 |
 */

const App = new Handler(
  new SlackClient.RtmClient(process.env.SLACK_API_TOKEN),
  new Slack(process.env.SLACK_API_TOKEN),
  SlackClient.RTM_EVENTS,
);

App.listen();
