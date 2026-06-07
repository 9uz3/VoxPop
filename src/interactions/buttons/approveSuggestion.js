const { EmbedBuilder } = require('discord.js');
const Suggestion = require('../../models/Suggestion');
const GuildSettings = require('../../models/GuildSettings');
const AuditLog = require('../../models/AuditLog');
const { colors } = require('../../config/config');

module.exports = async (interaction) => {
    const suggestionId = interaction.customId.split('_')[1];
    const guildId = interaction.guildId;
    const settings = await GuildSettings.findOne({ guildId });

    if (!settings || !settings.reviewerRoleId) {
        return interaction.reply({ content: '❌ Reviewer role not configured.', ephemeral: true });
    }

    if (!interaction.member.roles.cache.has(settings.reviewerRoleId)) {
        return interaction.reply({ content: '❌ You do not have permission to review suggestions.', ephemeral: true });
    }

    try {
        const suggestion = await Suggestion.findOne({ guildId, suggestionId });
        if (!suggestion) return interaction.reply({ content: '❌ Suggestion not found in database.', ephemeral: true });
        if (suggestion.status !== 'Pending') return interaction.reply({ content: '❌ This suggestion has already been reviewed.', ephemeral: true });

        suggestion.status = 'Approved';
        suggestion.approvedBy = interaction.user.id;
        suggestion.approvedAt = new Date();
        await suggestion.save();

        const approvedEmbed = EmbedBuilder.from(interaction.message.embeds[0])
            .setColor(colors.success)
            .setFields(
                interaction.message.embeds[0].fields.filter(f => f.name !== 'Status')
            )
            .addFields(
                { name: 'Status', value: '✅ Approved' },
                { name: 'Approved By', value: `${interaction.user}`, inline: true },
                { name: 'Date', value: `<t:${Math.floor(Date.now() / 1000)}:f>`, inline: true }
            );

        await interaction.message.edit({ embeds: [approvedEmbed], components: [] });

        // DM Author
        try {
            const author = await interaction.client.users.fetch(suggestion.userId);
            const dmEmbed = new EmbedBuilder()
                .setTitle('✅ Suggestion Approved')
                .setDescription(`Your suggestion **#${suggestionId}** has been approved.`)
                .addFields(
                    { name: 'Title', value: suggestion.title },
                    { name: 'Approved By', value: interaction.user.tag }
                )
                .setColor(colors.success)
                .setTimestamp();
            await author.send({ embeds: [dmEmbed] });
        } catch (dmError) {
            console.log(`Could not send DM to ${suggestion.userId}`);
        }

        // Log Approval
        if (settings.logApprovalChannelId) {
            const logChannel = interaction.guild.channels.cache.get(settings.logApprovalChannelId);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setTitle('Suggestion Approved')
                    .setDescription(`Suggestion #${suggestionId} was approved by ${interaction.user}.`)
                    .addFields({ name: 'Title', value: suggestion.title })
                    .setColor(colors.success)
                    .setTimestamp();
                await logChannel.send({ embeds: [logEmbed] });
            }
        }

        await AuditLog.create({
            guildId,
            action: 'SUGGESTION_APPROVE',
            executorId: interaction.user.id,
            targetId: suggestionId,
            details: { authorId: suggestion.userId }
        });

        await interaction.reply({ content: `✅ Suggestion #${suggestionId} approved!`, ephemeral: true });

    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Error approving suggestion.', ephemeral: true });
    }
};
