const Discord = require('discord.js-selfbot');
const clientLog = new Discord.Client();
const clientCheck = new Discord.Client();
let tokenLog = "token"; //selflog // token self-bot (common bot soon)
let token = "token"; // me // your token main acount
let prefix = ">";
let BotVersion = "1.0";
const servers =["id server 1"," id server 2", "...", "..."]// your servers that you want to log
const logChannel = "channel ID where is logging" // id channel where do you want to log


clientLog.on('ready', () => {
    //clientLog.channels.cache.get(`channel id`).send(`Ready...`)
    console.log(`Logged in as ${clientLog.user.tag}!`);
    //	clientLog.channels.cache.get(`channel id`).send(`Logged in as ${clientLog.user.tag}!`)
    clientLog.user.setActivity("Я слежу за тобой, ничтожество");
    clientLog.channels.cache.get(logChannel).send(`i am ready! :face_with_monocle: `)
});

clientLog.on('message', message => {
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.content === prefix + 'ping') {
        message.reply(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(clientLog.ws.ping)}ms`);

    }
});

clientCheck.on("messageDelete", function(message){
    if (!servers.includes(message.guild.id)) return;
    
    if(message.attachments.first() != undefined){
        let tmpUrl = message.attachments.first().url;
        let delEmbed = new Discord.MessageEmbed()// log message style, change if you want
        .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png")
        .setTitle('Deleted message')
        .setDescription(message.content)
        .addField('Server', `${message.guild.name}`, true)
        .addField('Channel', `${message.channel.name}`, true)
        .addField('Author', `${message.author.tag}`, true)
        .setColor('#407bc7')
        .setImage(tmpUrl)
        .setTimestamp();
        clientLog.channels.cache.get(logChannel).send(delEmbed); //id channel where do you want to log
      }
      else{
      let delEmbed = new Discord.MessageEmbed() 
        .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png")
        .setTitle('Deleted message')
        .setDescription(message.content)
        .addField('Server', `${message.guild.name}`, true)
        .addField('Channel', `${message.channel.name}`, true)
        .addField('Author', `${message.author.tag}`, true)
        .setColor('#407bc7')
        .setTimestamp();
        clientLog.channels.cache.get(logChannel).send(delEmbed); //id channel where do you want to log
      }
        

        
});
clientCheck.login(token);
clientLog.login(tokenLog);
