const { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType } = require('discord.js');

module.exports = async (interaction) => {
    const row1 = new ActionRowBuilder().addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('select_panel_channel')
            .setPlaceholder('Select Suggestion Panel Channel')
            .addChannelTypes(ChannelType.GuildText)
    );

    const row2 = new ActionRowBuilder().addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('select_review_channel')
            .setPlaceholder('Select Suggestion Review Channel')
            .addChannelTypes(ChannelType.GuildText)
    );

    const row3 = new ActionRowBuilder().addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('select_logs_channel')
            .setPlaceholder('Select General Logs Channel')
            .addChannelTypes(ChannelType.GuildText)
    );

    await interaction.reply({ content: 'Select the channels for each function:', components: [row1, row2, row3], ephemeral: true });
};
