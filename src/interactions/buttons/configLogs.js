const { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType } = require('discord.js');

module.exports = async (interaction) => {
    const row1 = new ActionRowBuilder().addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('log_creation')
            .setPlaceholder('Log: Suggestion Creation')
            .addChannelTypes(ChannelType.GuildText)
    );

    const row2 = new ActionRowBuilder().addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('log_approval')
            .setPlaceholder('Log: Suggestion Approval')
            .addChannelTypes(ChannelType.GuildText)
    );

    const row3 = new ActionRowBuilder().addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('log_rejection')
            .setPlaceholder('Log: Suggestion Rejection')
            .addChannelTypes(ChannelType.GuildText)
    );

    const row4 = new ActionRowBuilder().addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('log_admin')
            .setPlaceholder('Log: Administrative Changes')
            .addChannelTypes(ChannelType.GuildText)
    );

    await interaction.reply({ content: 'Select the log channels:', components: [row1, row2, row3, row4], ephemeral: true });
};
