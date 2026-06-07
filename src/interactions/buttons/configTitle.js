const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = async (interaction) => {
    const modal = new ModalBuilder()
        .setCustomId('modal_config_title')
        .setTitle('Configure Panel Title');

    const titleInput = new TextInputBuilder()
        .setCustomId('panel_title_input')
        .setLabel('Panel Title')
        .setPlaceholder('e.g., Suggestions Center')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const row = new ActionRowBuilder().addComponents(titleInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
};
