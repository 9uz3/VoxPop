const { ActionRowBuilder, RoleSelectMenuBuilder } = require('discord.js');

module.exports = async (interaction) => {
    const row = new ActionRowBuilder().addComponents(
        new RoleSelectMenuBuilder()
            .setCustomId('select_reviewer_role')
            .setPlaceholder('Select Suggestion Reviewer Role')
    );

    await interaction.reply({ content: 'Select the role that will be able to review suggestions:', components: [row], ephemeral: true });
};
