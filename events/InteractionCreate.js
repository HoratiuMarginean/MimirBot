import { Events } from "discord.js";

const name = Events.InteractionCreate;
async function execute(interaction, dbConnection)
{
  if (interaction.isChatInputCommand())
  {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command)
    {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try
    {
      await command.execute(interaction, dbConnection);
    }
    catch (error)
    {
      console.error(error);
      if (interaction.replied || interaction.deferred)
      {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true
        });
      }
      else
      {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true
        });
      }
    }
  }
  else if (interaction.isStringSelectMenu())
  {
    if (interaction.customId === "selectRoleMenu")
    {
      const roleId = interaction.values[0];
      const role = interaction.guild.roles.cache.get(roleId);
      if (role)
      {
        if (interaction.member.roles.cache.has(roleId))
        {
          try
          {
            await interaction.member.roles.remove(role);
            await interaction.reply({
              content: `❌ **${role.name}** removed!`,
              ephemeral: true
            });
          }
          catch (error)
          {
            console.error(error);
            await interaction.reply({
              content: "There was an error while removing this role.",
              ephemeral: true
            });
          }
        }
        else
        {
          try
          {
            await interaction.member.roles.add(role);
            await interaction.reply({
              content: `✅ **${role.name}** added!`,
              ephemeral: true
            });
          }
          catch (error)
          {
            console.error(error);
            await interaction.reply({
              content: "There was an error while adding this role.",
              ephemeral: true
            });
          }
        }
      }
    }
  }
}

export { name, execute };