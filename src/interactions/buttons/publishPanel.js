const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings');
const { colors } = require('../../config/config');

module.exports = async (interaction) => {
    const settings = await GuildSettings.findOne({ guildId: interaction.guildId });

    if (!settings || !settings.panelChannelId) {
        return interaction.reply({ content: '❌ You must configure the panel channel first!', ephemeral: true });
    }

    const channel = interaction.guild.channels.cache.get(settings.panelChannelId);
    if (!channel) {
        return interaction.reply({ content: '❌ Could not find the configured panel channel.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
        .setTitle(settings.panelTitle)
        .setDescription(settings.panelDescription)
        .setColor(colors.primary)
        .setFooter({ text: 'Powered by Suggestion Bot' })
        .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('submit_suggestion')
            .setLabel('💡 Submit Suggestion')
            .setStyle(ButtonStyle.Success)
    );

    try {
        await channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: `✅ Suggestion panel published to ${channel}!`, ephemeral: true });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Failed to publish the panel. Check my permissions.', ephemeral: true });
    }
};
