import { SlashCommandBuilder } from 'discord.js';

const category = 'utility';
const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Provides information about the server.');
async function execute(interaction)
{
	await interaction.reply({
		content: `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
		ephemeral: true
	});
}

export { category, data, execute };