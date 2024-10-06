import "dotenv/config";

import { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } from "discord.js";

const roleIds = process.env.ROLE_IDS.split(",").map(roleId => roleId.trim());

const category = "roles";
const data = new SlashCommandBuilder()
  .setName("select-role")
  .setDescription("Allows you to add or remove one of your roles.");

async function execute(interaction, dbConnection)
{
  const fetchedRoles = await interaction.guild.roles.fetch();
  const roleOptions = roleIds
    .map(roleId => {
      const role = fetchedRoles.get(roleId);
      if (role)
      {
        return {
          label: role.name, value: role.id
        };
      }
      return null;
    })
    .filter(Boolean);

  if (!roleOptions.length)
  {
    return interaction.reply({
      content: "I do not have access to any roles right now.",
      ephemeral: true
    });
  }

  const selectRoleMenu = new StringSelectMenuBuilder()
    .setCustomId("selectRoleMenu")
    .addOptions(roleOptions);

  const selectRoleMenuRow = new ActionRowBuilder()
    .addComponents(selectRoleMenu);

  await interaction.reply({
    content: "Pick a role to add or remove:",
    components: [selectRoleMenuRow],
    ephemeral: true
  });
}

export { category, data, execute };