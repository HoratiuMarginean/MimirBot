import 'dotenv/config'

import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders)
{
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles)
	{
		const filePath = path.join(commandsPath, file);
		const fileUrl = pathToFileURL(filePath).href;
		const command = await import(fileUrl);
		if ('data' in command && 'execute' in command)
		{
			commands.push(command.data.toJSON());
		}
		else
		{
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(process.env.TOKEN);
(async () =>
{
	try
	{
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.APP_ID, process.env.SERVER_ID), // For server-specific commands
			// Routes.applicationCommands(process.env.APP_ID), // For global commands
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error)
	{
		console.error(error);
	}
})();