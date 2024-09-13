import { SlashCommandBuilder } from 'discord.js';

const category = 'utility';
const data = new SlashCommandBuilder()
	.setName('user')
	.setDescription('Provides information about the user.');
async function execute(interaction)
{
	await interaction.reply({
		content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
		ephemeral: true
	});
}

export { category, data, execute };