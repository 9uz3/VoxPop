const GuildSettings = require('../../models/GuildSettings');
const AuditLog = require('../../models/AuditLog');

module.exports = async (interaction, client) => {
    const customId = interaction.customId;
    const guildId = interaction.guildId;

    if (customId === 'modal_config_title') {
        const title = interaction.fields.getTextInputValue('panel_title_input');
        try {
            await GuildSettings.findOneAndUpdate({ guildId }, { panelTitle: title }, { upsert: true });
            await AuditLog.create({
                guildId,
                action: 'CONFIG_TITLE',
                executorId: interaction.user.id,
                details: { newTitle: title }
            });
            await interaction.reply({ content: `Panel title updated to: **${title}**`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to update title.', ephemeral: true });
        }
    } else if (customId === 'modal_config_desc') {
        const desc = interaction.fields.getTextInputValue('panel_desc_input');
        try {
            await GuildSettings.findOneAndUpdate({ guildId }, { panelDescription: desc }, { upsert: true });
            await AuditLog.create({
                guildId,
                action: 'CONFIG_DESC',
                executorId: interaction.user.id,
                details: { newDesc: desc }
            });
            await interaction.reply({ content: 'Panel description updated successfully.', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to update description.', ephemeral: true });
        }
    } else if (customId === 'modal_submit_suggestion') {
        const submitSuggestion = require('./submitSuggestion');
        await submitSuggestion(interaction, client);
    } else if (customId.startsWith('modal_reject_')) {
        const rejectReason = require('./rejectReason');
        await rejectReason(interaction, client);
    }
};
