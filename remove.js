import 'dotenv/config';

import { REST, Routes } from 'discord.js';

const rest = new REST().setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.SERVER_ID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);