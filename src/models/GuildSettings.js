const mongoose = require('mongoose');

const guildSettingsSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    panelChannelId: { type: String, default: null },
    reviewChannelId: { type: String, default: null },
    logsChannelId: { type: String, default: null },
    logCreationChannelId: { type: String, default: null },
    logApprovalChannelId: { type: String, default: null },
    logRejectionChannelId: { type: String, default: null },
    logAdminChannelId: { type: String, default: null },
    reviewerRoleId: { type: String, default: null },
    panelTitle: { type: String, default: '💡 Suggestions Center' },
    panelDescription: { type: String, default: 'Send your ideas to improve the server.' }
});

module.exports = mongoose.model('GuildSettings', guildSettingsSchema);
