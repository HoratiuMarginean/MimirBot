// #region Imports
import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import dbConnection from "./database/connection.js";

import "./deployCommands.js";
// #endregion Imports

// #region Init
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ 
  intents:
	[
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.DirectMessages,
	  GatewayIntentBits.MessageContent
	]
});
// #endregion Init

// #region Commands
client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders)
{
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
  for (const file of commandFiles)
  {
    const filePath = path.join(commandsPath, file);
    const fileUrl = pathToFileURL(filePath).href;
    const command = await import(fileUrl);
    if ("data" in command && "execute" in command)
    {
      client.commands.set(command.data.name, command);
    }
    else
    {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}
// #endregion Commands

// #region Events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
for (const file of eventFiles)
{
  const filePath = path.join(eventsPath, file);
  const fileUrl = pathToFileURL(filePath).href;
  const event = await import(fileUrl);
  if (event.once)
  {
    client.once(event.name, (...args) => event.execute(...args, dbConnection));
  }
  else
  {
    client.on(event.name, (...args) => event.execute(...args, dbConnection));
  }
}
// #endregion Events

client.login(process.env.TOKEN);