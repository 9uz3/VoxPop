const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config/config');
const connectDB = require('./database/mongoose');
const chalk = require('chalk');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Connect to Database
connectDB();

// Load Handlers
require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

// Error Handling
process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:'), promise, chalk.red('reason:'), reason);
});

process.on('uncaughtException', (err) => {
    console.error(chalk.red('Uncaught Exception:'), err);
});

client.login(token);
