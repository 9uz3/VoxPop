const AdminPermission = require('../../models/AdminPermission');
const { ownerId } = require('../../config/config');

module.exports = async (interaction, client) => {
    const isAdmin = await AdminPermission.findOne({ guildId: interaction.guildId, userId: interaction.user.id });
    const isOwner = interaction.user.id === ownerId;

    // Suggestion submission and review buttons don't require admin permission for everyone, but for specific roles.
    // We handle that inside the specific button handlers.
    
    const customId = interaction.customId;

    try {
        if (customId === 'config_channels') {
            const configChannels = require('./configChannels');
            await configChannels(interaction);
        } else if (customId === 'config_logs') {
            const configLogs = require('./configLogs');
            await configLogs(interaction);
        } else if (customId === 'config_title') {
            const configTitle = require('./configTitle');
            await configTitle(interaction);
        } else if (customId === 'config_desc') {
            const configDesc = require('./configDesc');
            await configDesc(interaction);
        } else if (customId === 'config_roles') {
            const configRoles = require('./configRoles');
            await configRoles(interaction);
        } else if (customId === 'publish_panel') {
            const publishPanel = require('./publishPanel');
            await publishPanel(interaction);
        } else if (customId === 'submit_suggestion') {
            const submitSuggestion = require('./submitSuggestion');
            await submitSuggestion(interaction);
        } else if (customId.startsWith('approve_')) {
            const approveSuggestion = require('./approveSuggestion');
            await approveSuggestion(interaction);
        } else if (customId.startsWith('reject_')) {
            const rejectSuggestion = require('./rejectSuggestion');
            await rejectSuggestion(interaction);
        }
    } catch (error) {
        console.error(error);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    }
};
