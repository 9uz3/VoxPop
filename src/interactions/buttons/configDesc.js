const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = async (interaction) => {
    const modal = new ModalBuilder()
        .setCustomId('modal_config_desc')
        .setTitle('Configure Panel Description');

    const descInput = new TextInputBuilder()
        .setCustomId('panel_desc_input')
        .setLabel('Panel Description')
        .setPlaceholder('e.g., Send your ideas to improve the server.')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const row = new ActionRowBuilder().addComponents(descInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
};
