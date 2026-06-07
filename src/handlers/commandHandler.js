const fs = require('fs');
const path = require('path');
const { Collection, REST, Routes } = require('discord.js');
const { token, clientId } = require('../config/config');
const chalk = require('chalk');

module.exports = (client) => {
    client.commands = new Collection();
    const commands = [];
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(token);

    (async () => {
        try {
            console.log(chalk.yellow(`Started refreshing ${commands.length} application (/) commands.`));
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
            console.log(chalk.green(`Successfully reloaded application (/) commands.`));
        } catch (error) {
            console.error(error);
        }
    })();
};
