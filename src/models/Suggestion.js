const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    suggestionId: { type: Number, required: true },
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    approvedBy: { type: String, default: null },
    rejectedBy: { type: String, default: null },
    rejectionReason: { type: String, default: null },
    messageId: { type: String, default: null }, // ID of the message in the review channel
    publicMessageId: { type: String, default: null }, // ID of the message in the public channel (if applicable)
    createdAt: { type: Date, default: Date.now },
    approvedAt: { type: Date, default: null },
    rejectedAt: { type: Date, default: null }
});

suggestionSchema.index({ guildId: 1, suggestionId: 1 }, { unique: true });

module.exports = mongoose.model('Suggestion', suggestionSchema);
