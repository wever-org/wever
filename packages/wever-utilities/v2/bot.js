const guildId = process.env['GUILD_ID']
const clientId = process.env['CLIENT_ID']
const clientSecret = process.env["CLIENT_SECRET"];
const publicKey = process.env['PUBLIC_KEY']
const inviteLink = process.env['INVITE_LINK']
const token = process.env['DISCORD_TOKEN']
const REDIRECT_URL = process.env['REDIRECT_URL'];

const chalk = require('chalk');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const discord = require('discord.js');
const WOKCommands = require('wokcommands')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Intents = discord.Intents;

const client = new discord.Client(
      {
            intents: [
                  Intents.FLAGS.GUILDS,
                  Intents.FLAGS.GUILD_MEMBERS,
                  Intents.FLAGS.GUILD_BANS,
                  // Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                  Intents.FLAGS.GUILD_INTEGRATIONS,
                  // Intents.FLAGS.GUILD_WEBHOOKS,
                  // Intents.FLAGS.GUILD_INVITES,
                  // Intents.FLAGS.GUILD_VOICE_STATES,
                  // Intents.FLAGS.GUILD_PRESENCES,
                  Intents.FLAGS.GUILD_MESSAGES,
                  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                  Intents.FLAGS.GUILD_MESSAGE_TYPING,
                  // Intents.FLAGS.DIRECT_MESSAGES,
                  // Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                  // Intents.FLAGS.DIRECT_MESSAGE_TYPING,
                  // Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
            ],
      }
);


// When the client is ready, run this code (only once)
client.on('ready', () => {
      // console.log(client.user);

      /**
       * Setup commands
       */
      const commands = new WOKCommands(client, {
            // The name of the local folder for your command files
            commandsDir: path.join(__dirname, 'commands'),
            mongoUri: process.env.MONGO_URI,
            testServers: ['937750444330065920'],
      })
      .setDefaultPrefix('!')
      .setColor(0x00ffff)


      console.log(chalk.cyan(`>===>> ${chalk.green(client.user.tag)} Bot service is started at ${chalk.green((new Date()).toGMTString())}.`));
});




client.on("messageCreate", msg => {
      if (msg.author.bot) return;
});



// Login to Discord with your client's token
module.exports = function startBot() {
      client.login(process.env.DISCORD_TOKEN);
      return client;
}
