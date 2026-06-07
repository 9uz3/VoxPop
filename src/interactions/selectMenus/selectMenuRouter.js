const GuildSettings = require('../../models/GuildSettings');
const AuditLog = require('../../models/AuditLog');

module.exports = async (interaction, client) => {
    const customId = interaction.customId;
    const guildId = interaction.guildId;
    const values = interaction.values;

    let update = {};
    let action = '';

    if (customId === 'select_panel_channel') {
        update = { panelChannelId: values[0] };
        action = 'CONFIG_PANEL_CHANNEL';
    } else if (customId === 'select_review_channel') {
        update = { reviewChannelId: values[0] };
        action = 'CONFIG_REVIEW_CHANNEL';
    } else if (customId === 'select_logs_channel') {
        update = { logsChannelId: values[0] };
        action = 'CONFIG_LOGS_CHANNEL';
    } else if (customId === 'log_creation') {
        update = { logCreationChannelId: values[0] };
        action = 'CONFIG_LOG_CREATION';
    } else if (customId === 'log_approval') {
        update = { logApprovalChannelId: values[0] };
        action = 'CONFIG_LOG_APPROVAL';
    } else if (customId === 'log_rejection') {
        update = { logRejectionChannelId: values[0] };
        action = 'CONFIG_LOG_REJECTION';
    } else if (customId === 'log_admin') {
        update = { logAdminChannelId: values[0] };
        action = 'CONFIG_LOG_ADMIN';
    } else if (customId === 'select_reviewer_role') {
        update = { reviewerRoleId: values[0] };
        action = 'CONFIG_REVIEWER_ROLE';
    }

    try {
        await GuildSettings.findOneAndUpdate({ guildId }, update, { upsert: true });
        
        await AuditLog.create({
            guildId,
            action,
            executorId: interaction.user.id,
            details: { newValue: values[0] }
        });

        await interaction.reply({ content: `Configuration updated successfully: **${action.replace('CONFIG_', '').replace('_', ' ')}**`, ephemeral: true });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Failed to update configuration.', ephemeral: true });
    }
};
