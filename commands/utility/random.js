import { SlashCommandBuilder } from 'discord.js';
import { setTimeout as wait } from 'node:timers/promises';
import { SECOND } from '../../common/constants.js';

const category = 'utility';
const data = new SlashCommandBuilder()
	.setName('random')
	.setDescription('Does... something.');
async function execute(interaction)
{
	await interaction.reply({
		content: 'Hello!',
		ephemeral: true
	});
	await wait(5 * SECOND);
	await interaction.followUp({
		content: '...my friend.',
		ephemeral: true
	});
}

export { category, data, execute };