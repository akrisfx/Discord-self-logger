const Discord = require('discord.js-selfbot');
let config;
try{
    config = require('./config.json')
} catch {
    config = require('./config.example.json')
}


const clientLog = new Discord.Client();
const clientCheck = new Discord.Client();
const servers = config.servers; // your servers that you want to log 
const logChannel = config.logServerChannel; // id channel where do you want to log 
let tokenLog = config.logToken; //selflog // token bot in 
let token = config.checkToken; // me // your token main acount
let logServerChannel = config.logServerChannel
let prefix = ">";
let BotVersion = "1.1";
tokenLog = config.logToken;             // delete this str___________________________________________
token = config.checkToken;              // delete this str___________________________________________
let logImageServer = config.logImg; // delete this str______________________________________________


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

clientCheck.on("messageDelete", function(message) {
    if (!servers.includes(message.guild.id)) return;

    let setTitles = 'Deleted message'
    if(message.edits[1]) { setTitles = 'Deleted message (edited)' }
    messageSended = `${message.createdAt}`
    messageSended = messageSended.substring(messageSended.lastIndexOf('G') - 21, messageSended.lastIndexOf('G'))
    
    if(message.attachments.first() != undefined){
        let tmpUrl = message.attachments.first().url;
        let delEmbed = new Discord.MessageEmbed()// log message style, change if you want
            .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png")
            .setTitle(setTitles)
            .setDescription(message.edits)
            .addField('Server', `${message.guild.name}`, true)
            .addField('Channel', `#${message.channel.name}`, true)
            .addField('Author', `${message.author.tag}`, true)
            .setColor('#0f7')
            .addField('Time', `${messageSended}`, true)
            .setImage(tmpUrl)
            .setTimestamp();
            clientLog.channels.cache.get(logServerChannel).send(delEmbed); //id channal where do you want to log
            clientLog.channels.cache.get(logImageServer).send(`${tmpUrl}`) 
            
    } else {
        let delEmbed = new Discord.MessageEmbed() 
        .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png")
        .setTitle(setTitles)
        .setDescription(message.edits)
        .addField('Server', `${message.guild.name}`, true)
        .addField('Channel', `#${message.channel.name}`, true)
        .addField('Author', `${message.author.tag}`, true)
        .setColor('#ff035f')
        .addField('Time', `${messageSended}`, true)
        .setTimestamp();
        clientLog.channels.cache.get(logServerChannel).send(delEmbed); //id chennal where do you want to log
    }
})
clientCheck.login(token);
clientLog.login(tokenLog);
