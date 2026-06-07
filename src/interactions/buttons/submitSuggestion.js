const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = async (interaction) => {
    const modal = new ModalBuilder()
        .setCustomId('modal_submit_suggestion')
        .setTitle('Submit a Suggestion');

    const titleInput = new TextInputBuilder()
        .setCustomId('suggestion_title')
        .setLabel('Suggestion Title')
        .setPlaceholder('Enter a brief title for your idea')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(100);

    const descInput = new TextInputBuilder()
        .setCustomId('suggestion_desc')
        .setLabel('Suggestion Description')
        .setPlaceholder('Describe your idea in detail')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(1000);

    const row1 = new ActionRowBuilder().addComponents(titleInput);
    const row2 = new ActionRowBuilder().addComponents(descInput);
    
    modal.addComponents(row1, row2);

    await interaction.showModal(modal);
};
