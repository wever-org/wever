const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Embed messages!')
    .addStringOption(option => option.setName('content').setDescription('message content'))
    .addIntegerOption(option => option.setName('color').setDescription('embed color'))
    .addStringOption(option => option.setName('title').setDescription('embed title'))
    .addStringOption(option => option.setName('description').setDescription('embed description'))
    .addStringOption(option => option.setName('thumbnail').setDescription('embed thumbnail'))
    .addStringOption(option => option.setName('image').setDescription('embed image'))

module.exports = data