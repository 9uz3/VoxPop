const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings');

module.exports = async (interaction) => {
    const suggestionId = interaction.customId.split('_')[1];
    const guildId = interaction.guildId;
    const settings = await GuildSettings.findOne({ guildId });

    if (!settings || !settings.reviewerRoleId) {
        return interaction.reply({ content: 'Reviewer role not configured.', ephemeral: true });
    }

    if (!interaction.member.roles.cache.has(settings.reviewerRoleId)) {
        return interaction.reply({ content: 'You do not have permission to review suggestions.', ephemeral: true });
    }

    const modal = new ModalBuilder()
        .setCustomId(`modal_reject_${suggestionId}`)
        .setTitle('Reject Suggestion');

    const reasonInput = new TextInputBuilder()
        .setCustomId('rejection_reason')
        .setLabel('Reason for Rejection')
        .setPlaceholder('Enter why this suggestion was rejected')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(500);

    const row = new ActionRowBuilder().addComponents(reasonInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
};
