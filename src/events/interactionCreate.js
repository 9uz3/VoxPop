const { Events, EmbedBuilder } = require('discord.js');
const AdminPermission = require('../models/AdminPermission');
const { ownerId } = require('../config/config');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                const errorMessage = { content: 'There was an error while executing this command!', ephemeral: true };
                if (interaction.replied || interaction.deferred) await interaction.followUp(errorMessage);
                else await interaction.reply(errorMessage);
            }
        } else if (interaction.isButton()) {
            const buttonHandler = require('../interactions/buttons/buttonRouter');
            await buttonHandler(interaction, client);
        } else if (interaction.isModalSubmit()) {
            const modalHandler = require('../interactions/modals/modalRouter');
            await modalHandler(interaction, client);
        } else if (interaction.isAnySelectMenu()) {
            const selectMenuHandler = require('../interactions/selectMenus/selectMenuRouter');
            await selectMenuHandler(interaction, client);
        }
    },
};
