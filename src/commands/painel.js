const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const AdminPermission = require('../models/AdminPermission');
const { ownerId, colors } = require('../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('painel')
        .setDescription('Opens the administrative suggestion panel.'),
    async execute(interaction) {
        const isAdmin = await AdminPermission.findOne({ guildId: interaction.guildId, userId: interaction.user.id });
        if (interaction.user.id !== ownerId && !isAdmin) {
            return interaction.reply({ content: 'You do not have permission to access this panel.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('Suggestion System Administration')
            .setDescription('Manage the suggestion system configuration below.')
            .addFields(
                { name: 'Channels', value: 'Configure where suggestions are sent and reviewed.', inline: true },
                { name: 'Logs', value: 'Configure action logging channels.', inline: true },
                { name: 'Content', value: 'Customize panel title and description.', inline: true },
                { name: 'Roles', value: 'Configure who can review suggestions.', inline: true }
            )
            .setColor(colors.primary)
            .setFooter({ text: 'Suggestion Bot Management' })
            .setTimestamp();

        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('config_channels').setLabel('Configure Channels').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('config_logs').setLabel('Configure Logs').setStyle(ButtonStyle.Secondary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('config_title').setLabel('Configure Title').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('config_desc').setLabel('Configure Description').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('config_roles').setLabel('Configure Roles').setStyle(ButtonStyle.Secondary)
        );

        const row3 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('publish_panel').setLabel('Publish Panel').setStyle(ButtonStyle.Success)
        );

        await interaction.reply({ embeds: [embed], components: [row1, row2, row3], ephemeral: true });
    },
};
