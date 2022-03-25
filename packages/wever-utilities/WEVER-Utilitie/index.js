require("dotenv").config();

const guildId = process.env['GUILD_ID']
const clientId = process.env['CLIENT_ID']
const clientSecret = "tNoh3MLPgxcuTLF2nXnG0H8AkMmYPLOh";
const publicKey = process.env['PUBLIC_KEY']
const inviteLink = process.env['INVITE_LINK']
const token = process.env['DISCORD_TOKEN']
const REDIRECT_URL = "https://wever-utilitie-psi.vercel.app";

const chalk = require('chalk');
const fetch = require('node-fetch');
const fs = require('fs');
// const axios = require('axios');
const { app, keepAlive } = require("./server")


const discord = require('discord.js');
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





/**
 * Setting up commands
 */
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    // console.log(command)
	commands.push(command.toJSON());
}
const rest = new REST({ version: '9' }).setToken(token);
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const getQuote = (counts) => {
    return fetch("https://programming-quotes-api.herokuapp.com/Quotes/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return `${data["en"]} \n\u00A0\u00A0\u00A0\u00A0 -${data["author"]}`;
        })
}

// When the client is ready, run this code (only once)
client.on('ready', () => {
    // console.log(client.user);
    console.log(chalk.cyan(`>===>> ${chalk.green(client.user.tag)} Bot service is started at ${chalk.green((new Date()).toGMTString())}.`));
});




client.on("message", msg => {
    if (msg.author.bot) return;
    // console.log(msg)

    if (msg.content === "!inspire") {
        getQuote().then(async quote => {
            msg.reply({
                embeds: [
                    {
                        color: 0x00ffff,
                        title: 'Inspiring Quotes',
                        description: quote,
    
                    }
                ]
            });
        })
    }
});




client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
    
    if (interaction.commandName === 'embed') {
        const content = interaction.options.getString('content');
        const color = interaction.options.getInteger('color');
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const thumbnail = interaction.options.getString('thumbnail');
        const image = interaction.options.getString('image');

        client.api.channels[interaction.channel.id].messages.post({
            data: {
                content,
                embeds: [
                    {
                        color,
                        title,
                        description,
                        thumbnail,
                        image
                    }
                ]
            }
        });

        

    }
});


keepAlive(client);
// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
