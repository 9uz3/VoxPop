const mongoose = require('mongoose');

const adminPermissionSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    addedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

adminPermissionSchema.index({ guildId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('AdminPermission', adminPermissionSchema);
