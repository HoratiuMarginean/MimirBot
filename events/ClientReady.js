import "dotenv/config";

import { Events, ActivityType } from "discord.js";

import { HumbleBundleGames } from "../cyclic/HumbleBundleGames.js";

const name = Events.ClientReady;
const once = true;
function execute(client, connection)
{
  console.log(`Ready! Logged in as ${client.user.tag}`);

  client.user.setActivity("Reading...", { type: ActivityType.Custom });

  HumbleBundleGames(client, process.env.HUMBLE_BUNDLE_CHANNEL_ID, connection);
}

export { name, once, execute };