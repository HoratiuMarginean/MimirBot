import { Events } from 'discord.js';

const name = Events.MessageCreate;
async function execute(message)
{
	// Only accept DMs
	if (message.channel.type != 1)
	{
		return;
	}
	// Ignore messages sent by the bot
	if (message.author.bot)
	{
		return;
	}

	// if (message.content == '!start_boss')
	// {
	// 	if (!global.userIds.includes(message.author.id))
	// 	{
	// 		global.userIds.push(message.author.id);
	// 	}
	// 	message.client.users.send(message.author.id, 'Boss notifications: ON');
	// }
	// else if (message.content == '!stop_boss')
	// {
	// 	if (global.userIds.includes(message.author.id))
	// 	{
	// 		global.userIds.splice(global.userIds.indexOf(message.author.id), 1);
	// 	}
	// 	message.client.users.send(message.author.id, 'Boss notifications: OFF');
	// }
	// else if (message.author.id != process.env.MY_ID)
	// {
	// 	message.client.users.send(process.env.MY_ID, `[From: ${message.author.tag}, Id: ${message.author.id}]\n${message.content}`);
	// }
}

export { name, execute };