const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env['token'];
const GUILD_ID = process.env['guild_id'];
const CLIENT_ID = process.env['client_id'];

const commands = [
	new SlashCommandBuilder().setName('start').setDescription("Get started"),
	new SlashCommandBuilder().setName('next').setDescription("Navigate the application"),
  new SlashCommandBuilder().setName('cv').setDescription("Download my CV"),
  new SlashCommandBuilder().setName('music').setDescription("View my music portfolio"),
  new SlashCommandBuilder().setName('visual').setDescription("View my visual portfolio"),
  new SlashCommandBuilder().setName('development').setDescription("View my development portfolio"),
  new SlashCommandBuilder().setName('socials').setDescription("Instagram, SoundCloud, LinkedIn"),
  new SlashCommandBuilder().setName('help').setDescription("See all available commands"),
  new SlashCommandBuilder().setName('clear').setDescription("Clear channel"),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);