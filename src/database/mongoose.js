const mongoose = require('mongoose');
const chalk = require('chalk');
const { mongoUri } = require('../config/config');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log(chalk.green('✓ MongoDB Connected Successfully'));
    } catch (err) {
        console.error(chalk.red('✗ MongoDB Connection Error:'), err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
