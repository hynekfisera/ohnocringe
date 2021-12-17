const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId } = require("./config.json");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.TOKEN;

const commands = [
  new SlashCommandBuilder()
    .setName("ohno")
    .setDescription("Replies with an 'Oh No Cringe' video link")
    .addStringOption((option) => option.setName("language").setDescription("The video language").setRequired(true)),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

/*rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);*/

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
