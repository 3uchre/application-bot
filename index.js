//Require necessary discord.js classes
const { Client, Intents, MessageEmbed } = require('discord.js');

const token = process.env['token'];

//Require variables from our files
const keepAlive = require("./server");
var msg = require('./messages.js');

//Index variable
var i = 0;

//Create new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Client variables
channelID = "940217582630359042"

//Declare embeds
const euchreEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Euchre – Linktree')
	    .setURL('https://linktr.ee/3uchre/')
	    .setDescription("Since 2019, I've been producing and DJing as Euchre. Follow the link to hear my tracks and mixes.")
	    .setThumbnail('https://i.imgur.com/oWkbZ3u.jpg')
	    .setTimestamp();

const tlfEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('The Long Faces – Spotify')
	    .setURL('https://open.spotify.com/artist/1DhiWyne1hHwVHTti49o40?si=L5AzkbZ8SWOPTi4rhQk1zg')
	    .setDescription("Since forming The Long Faces back in 2018, we've built a fanbase of over a million listeners from around the world. Click the link to hear our music.")
	    .setThumbnail('https://i.imgur.com/J2av4aE.jpg')
	    .setTimestamp();

const revolveEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Revolve – YouTube')
	    .setURL('https://youtu.be/Rg2G3JMaSes')
	    .setDescription("For my final project at Leeds Conservatoire I created a 10 minute audiovisual exhibition using spatial audio and virtual reality, in collaboration with Franky Hall. Click the link above to see this project.")
	    .setThumbnail('https://i.imgur.com/MIC0ZtB.png')
	    .setTimestamp();

const ballGamesEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('BALL GAMES – Instagram')
	    .setURL('https://www.instagram.com/p/CZh7bm2hHHN/')
	    .setDescription("Click the link to see my original artwork for BALL GAMES, a new radio show and club night that I recently launched with collaborator Astral Bandit.")
	    .setThumbnail('https://i.imgur.com/jGzDHPt.jpg')
	    .setTimestamp();

const khemeiaEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Khemeía – Instagram')
	    .setURL('https://www.instagram.com/_khemeia_/')
	    .setDescription("Click the link to see my artwork for Khemeia, a new show soon that I'm about to launch on Internet Public Radio. ")
	    .setThumbnail('https://i.imgur.com/oYYNNnp.jpg')
	    .setTimestamp();

const instaEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Dan Ball – Instagram')
	    .setURL('https://www.instagram.com/3uchre/')
	    .setTimestamp();

const linkedinEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Dan Ball – LinkedIn')
	    .setURL('https://www.linkedin.com/in/danball106/')
	    .setTimestamp();

const soundcloudEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Euchre – SoundCloud')
	    .setURL('https://soundcloud.com/3uchre/')
	    .setTimestamp();

//When client is ready, run this once
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return;
  } 

  const { commandName } = interaction;

	if (commandName === 'start') {
    i = 0; //reset message index
    await interaction.reply(msg[i]);

  } else if (commandName === 'next') {
    if (i < msg.length -1) {
      i++; //next message
      await interaction.reply(msg[i]); //return message
    } else {
        await interaction.reply("**More Options**\n\n\Enter `/cv` to download my CV\n\nEnter `/music` to view my music portfolio\n\nEnter `/visual` to view my visual portfolio\n\nEnter `/development` to view my development portfolio\n\nEnter `/socials` for my Instagram, SoundCloud & LinkedIn profiles\n\nEnter `/start` to start again\n\nIf you get lost, enter `/help`");
    }
  } else if (commandName === 'help') {
      await interaction.reply("**Commands**\n\n\Enter `/help` to see this message\n\nEnter `/start` to start again\n\nEnter `/next` to navigate the application\n\nEnter `/cv` to download my CV\n\nEnter `/music` to view my music portfolio\n\nEnter `/visual` to view my visual portfolioEnter \n\nEnter `/development` to view my development portfolio\n\nEnter `/socials` for my Instagram, SoundCloud & LinkedIn profiles");
  } else if (commandName === 'cv') {
      await interaction.reply({ files: ['./attachments/Dan_Ball_CV_IOM.pdf'] });
  } else if (commandName === 'music') {
      await interaction.reply({ embeds: [euchreEmbed, tlfEmbed, revolveEmbed,] });
  } else if (commandName === 'visual') {
      await interaction.reply({ embeds: [ballGamesEmbed, khemeiaEmbed] });
  } else if (commandName === 'development') {
      await interaction.reply("**Development**\n\n**Music Sorter:** I've often found that when downloading music from a variety of sources for DJing, I end up with a confused array of different folders and formats. I solved this problem by embedding a simple bash script into an application using Automator. This application takes a disorganised folder of music, converts everything to the same format, backs up lossless files and artwork in separate folders, and cleans everything up, ready to import into your DJ software of choice.\nSoon, I hope to release it as an open-source application, as I've found it to be incredibly useful when organising a large DJ library. See the source code below.\n\n**id-bot:** The source code that I used to create this bot in JavaScript is attached below. In this role, I look to combine technical knowledge with experience in the music scene to create a user experience that caters specifically to music lovers.\n\n‎");
      client.channels.fetch(channelID)
      .then(channel => {
      channel.send({files: ['./attachments/music_sort.sh/']});
      channel.send({files: ['./attachments/id-bot_source.zip']});
      })
    
  } else if (commandName === 'socials') {
      await interaction.reply({ embeds: [instaEmbed, soundcloudEmbed, linkedinEmbed, ]});
  } else if (commandName === 'clear') {
      await interaction.reply({ content: 'Clearing channel...', ephemeral: true });
      client.channels.fetch(channelID)
      .then(channel => {
      channel.bulkDelete(100);
    })
  }
});

keepAlive();
client.login(token);