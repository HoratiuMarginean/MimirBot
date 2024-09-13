import { SlashCommandBuilder } from 'discord.js';
import { setTimeout as wait } from 'node:timers/promises';
import { SECOND } from '../../common/constants.js';

const category = 'utility';
const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with pong!');
async function execute(interaction)
{
	await interaction.deferReply();
	await wait(3 * SECOND);
	await interaction.editReply('pong!');
	await wait(3 * SECOND);
	await interaction.deleteReply();
}

export { category, data, execute };