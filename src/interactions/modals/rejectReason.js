const { EmbedBuilder } = require('discord.js');
const Suggestion = require('../../models/Suggestion');
const GuildSettings = require('../../models/GuildSettings');
const AuditLog = require('../../models/AuditLog');
const { colors } = require('../../config/config');

module.exports = async (interaction, client) => {
    const suggestionId = interaction.customId.split('_')[2];
    const guildId = interaction.guildId;
    const reason = interaction.fields.getTextInputValue('rejection_reason');
    const settings = await GuildSettings.findOne({ guildId });

    try {
        const suggestion = await Suggestion.findOne({ guildId, suggestionId });
        if (!suggestion) return interaction.reply({ content: '❌ Suggestion not found.', ephemeral: true });
        if (suggestion.status !== 'Pending') return interaction.reply({ content: '❌ This suggestion has already been reviewed.', ephemeral: true });

        suggestion.status = 'Rejected';
        suggestion.rejectedBy = interaction.user.id;
        suggestion.rejectionReason = reason;
        suggestion.rejectedAt = new Date();
        await suggestion.save();

        const channel = interaction.guild.channels.cache.get(interaction.channelId);
        const message = await channel.messages.fetch(suggestion.messageId);

        const rejectedEmbed = EmbedBuilder.from(message.embeds[0])
            .setColor(colors.danger)
            .setFields(
                message.embeds[0].fields.filter(f => f.name !== 'Status')
            )
            .addFields(
                { name: 'Status', value: '❌ Rejected' },
                { name: 'Rejected By', value: `${interaction.user}`, inline: true },
                { name: 'Reason', value: reason },
                { name: 'Date', value: `<t:${Math.floor(Date.now() / 1000)}:f>`, inline: true }
            );

        await message.edit({ embeds: [rejectedEmbed], components: [] });

        // DM Author
        try {
            const author = await interaction.client.users.fetch(suggestion.userId);
            const dmEmbed = new EmbedBuilder()
                .setTitle('❌ Suggestion Rejected')
                .setDescription(`Your suggestion **#${suggestionId}** has been rejected.`)
                .addFields(
                    { name: 'Title', value: suggestion.title },
                    { name: 'Reason', value: reason },
                    { name: 'Rejected By', value: interaction.user.tag }
                )
                .setColor(colors.danger)
                .setTimestamp();
            await author.send({ embeds: [dmEmbed] });
        } catch (dmError) {
            console.log(`Could not send DM to ${suggestion.userId}`);
        }

        // Log Rejection
        if (settings.logRejectionChannelId) {
            const logChannel = interaction.guild.channels.cache.get(settings.logRejectionChannelId);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setTitle('Suggestion Rejected')
                    .setDescription(`Suggestion #${suggestionId} was rejected by ${interaction.user}.`)
                    .addFields(
                        { name: 'Title', value: suggestion.title },
                        { name: 'Reason', value: reason }
                    )
                    .setColor(colors.danger)
                    .setTimestamp();
                await logChannel.send({ embeds: [logEmbed] });
            }
        }

        await AuditLog.create({
            guildId,
            action: 'SUGGESTION_REJECT',
            executorId: interaction.user.id,
            targetId: suggestionId,
            details: { authorId: suggestion.userId, reason }
        });

        await interaction.reply({ content: `❌ Suggestion #${suggestionId} rejected.`, ephemeral: true });

    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Error rejecting suggestion.', ephemeral: true });
    }
};
