import 'dotenv/config'

import { Events, ActivityType } from 'discord.js';
import connection from '../database/connection.js';

import { HumbleBundleNews } from '../cyclic/HumbleBundleNews.js';

const name = Events.ClientReady;
const once = true;
function execute(client)
{
	console.log(`Ready! Logged in as ${client.user.tag}`);

	client.user.setActivity('Reading...', { type: ActivityType.Custom });

	HumbleBundleNews(client, process.env.HUMBLE_BUNDLE_CHANNEL_ID, connection);
}

export { name, once, execute };