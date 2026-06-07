require('dotenv').config();

const requiredEnv = ['DISCORD_TOKEN', 'MONGODB_URI', 'CLIENT_ID', 'OWNER_ID'];
const missingEnv = requiredEnv.filter(env => !process.env[env]);

if (missingEnv.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', `ERROR: Missing required environment variables: ${missingEnv.join(', ')}`);
    console.error('\x1b[33m%s\x1b[0m', 'Please check your .env file.');
    process.exit(1);
}

// Check for placeholders
const placeholders = [
    'your_bot_token_here',
    'your_mongodb_connection_string_here',
    'your_client_id_here',
    'your_discord_id_here'
];

const hasPlaceholders = requiredEnv.filter(env => placeholders.includes(process.env[env]));

if (hasPlaceholders.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', `ERROR: You are still using placeholder values in .env for: ${hasPlaceholders.join(', ')}`);
    console.error('\x1b[33m%s\x1b[0m', 'You MUST replace these with your actual Discord and MongoDB credentials.');
    process.exit(1);
}

module.exports = {
    token: process.env.DISCORD_TOKEN,
    mongoUri: process.env.MONGODB_URI,
    clientId: process.env.CLIENT_ID,
    ownerId: process.env.OWNER_ID,
    colors: {
        primary: 0x5865F2, // Blurple
        success: 0x57F287, // Green
        danger: 0xED4245, // Red
        warning: 0xFEE75C, // Yellow
        info: 0x3498DB // Blue
    }
};
