const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    action: { type: String, required: true },
    executorId: { type: String, required: true },
    targetId: { type: String, default: null },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
