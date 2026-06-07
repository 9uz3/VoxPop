const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const AdminPermission = require('../models/AdminPermission');
const AuditLog = require('../models/AuditLog');
const { ownerId, colors } = require('../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addpermi')
        .setDescription('Adds a user to system administrators.')
        .addUserOption(option => option.setName('user').setDescription('The user to add').setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'Only the bot owner can use this command.', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        
        try {
            const existing = await AdminPermission.findOne({ guildId: interaction.guildId, userId: user.id });
            if (existing) return interaction.reply({ content: 'User is already an administrator.', ephemeral: true });

            await AdminPermission.create({
                guildId: interaction.guildId,
                userId: user.id,
                addedBy: interaction.user.id
            });

            await AuditLog.create({
                guildId: interaction.guildId,
                action: 'ADMIN_ADD',
                executorId: interaction.user.id,
                targetId: user.id
            });

            const embed = new EmbedBuilder()
                .setTitle('Permission Added')
                .setDescription(`Successfully added ${user} to system administrators.`)
                .setColor(colors.success)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Error adding permission.', ephemeral: true });
        }
    },
};
