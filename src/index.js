/**
 * Lily bot
 *
 * @package lily
 * @author Pavel Koch <kouks.koch@gmail.com>
 */

/*
 |-----------------------------------------------------------------------
 | Register global configuration
 |-----------------------------------------------------------------------
 |
 | Load .env file
 |
 */

import DotEnv from 'dotenv';
DotEnv.config();

/*
 |-----------------------------------------------------------------------
 | Bring Lily to life
 |-----------------------------------------------------------------------
 |
 | Load the RTM (Real Time Messaging) client and run the app!
 |
 */

import EventHandler from './Events/EventHandler';
import SlackClient from '@slack/client';

const Handler = new EventHandler(
  new SlackClient.RtmClient(process.env.SLACK_API_TOKEN),
  SlackClient.RTM_EVENTS
);

Handler.listen();
