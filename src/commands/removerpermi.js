const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const AdminPermission = require('../models/AdminPermission');
const AuditLog = require('../models/AuditLog');
const { ownerId, colors } = require('../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerpermi')
        .setDescription('Removes administrator access from a user.')
        .addUserOption(option => option.setName('user').setDescription('The user to remove').setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'Only the bot owner can use this command.', ephemeral: true });
        }

        const user = interaction.options.getUser('user');

        try {
            const result = await AdminPermission.findOneAndDelete({ guildId: interaction.guildId, userId: user.id });
            if (!result) return interaction.reply({ content: 'User is not an administrator.', ephemeral: true });

            await AuditLog.create({
                guildId: interaction.guildId,
                action: 'ADMIN_REMOVE',
                executorId: interaction.user.id,
                targetId: user.id
            });

            const embed = new EmbedBuilder()
                .setTitle('Permission Removed')
                .setDescription(`Successfully removed ${user} from system administrators.`)
                .setColor(colors.danger)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Error removing permission.', ephemeral: true });
        }
    },
};
