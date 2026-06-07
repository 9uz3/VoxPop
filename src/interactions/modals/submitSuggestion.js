const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Suggestion = require('../../models/Suggestion');
const GuildSettings = require('../../models/GuildSettings');
const AuditLog = require('../../models/AuditLog');
const { colors } = require('../../config/config');

module.exports = async (interaction, client) => {
    const guildId = interaction.guildId;
    const settings = await GuildSettings.findOne({ guildId });

    if (!settings || !settings.reviewChannelId) {
        return interaction.reply({ content: '❌ Suggestions are currently disabled (Review channel not configured).', ephemeral: true });
    }

    const reviewChannel = interaction.guild.channels.cache.get(settings.reviewChannelId);
    if (!reviewChannel) {
        return interaction.reply({ content: '❌ Could not find the review channel.', ephemeral: true });
    }

    const title = interaction.fields.getTextInputValue('suggestion_title');
    const description = interaction.fields.getTextInputValue('suggestion_desc');

    try {
        // Get latest suggestion ID for this guild
        const lastSuggestion = await Suggestion.findOne({ guildId }).sort({ suggestionId: -1 });
        const suggestionId = (lastSuggestion?.suggestionId || 0) + 1;

        const newSuggestion = await Suggestion.create({
            suggestionId,
            guildId,
            userId: interaction.user.id,
            username: interaction.user.username,
            title,
            description,
            status: 'Pending'
        });

        const reviewEmbed = new EmbedBuilder()
            .setTitle(`New Suggestion #${suggestionId}`)
            .addFields(
                { name: 'Author', value: `${interaction.user} (${interaction.user.id})`, inline: true },
                { name: 'Title', value: title },
                { name: 'Description', value: description },
                { name: 'Status', value: '🕒 Pending Review' }
            )
            .setColor(colors.warning)
            .setTimestamp()
            .setFooter({ text: `Suggestion ID: ${suggestionId}` });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`approve_${suggestionId}`)
                .setLabel('✅ Approve')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`reject_${suggestionId}`)
                .setLabel('❌ Reject')
                .setStyle(ButtonStyle.Danger)
        );

        const reviewMessage = await reviewChannel.send({ embeds: [reviewEmbed], components: [row] });
        
        newSuggestion.messageId = reviewMessage.id;
        await newSuggestion.save();

        // Log Creation
        if (settings.logCreationChannelId) {
            const logChannel = interaction.guild.channels.cache.get(settings.logCreationChannelId);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setTitle('Suggestion Created')
                    .setDescription(`Suggestion #${suggestionId} was created by ${interaction.user}.`)
                    .addFields({ name: 'Title', value: title })
                    .setColor(colors.info)
                    .setTimestamp();
                await logChannel.send({ embeds: [logEmbed] });
            }
        }

        await AuditLog.create({
            guildId,
            action: 'SUGGESTION_CREATE',
            executorId: interaction.user.id,
            targetId: suggestionId.toString(),
            details: { title }
        });

        await interaction.reply({ content: `✅ Your suggestion has been submitted! (ID: #${suggestionId})`, ephemeral: true });

    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ An error occurred while submitting your suggestion.', ephemeral: true });
    }
};
