'use strict';
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")
bot.on("ready", () => {
    console.log(bot.commands);
    let status = [`Discord Hack Week | =help`]
    bot.user.setActivity(status, {
        type: 'WATCHING'
    });
})

bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Error: not found");
        return;
    }

    console.log(`Loading ${jsfile.length} commands`);
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} is done`)
        bot.commands.set(props.help.name, props);
    });
});
bot.on("message", async message => {
    var usercreatedat = message.createdAt.toString().split(' ')
    let lastActivity = message.author.username
    console.log(`[${usercreatedat[1]} ${usercreatedat[2]} ${usercreatedat[3]} ${usercreatedat[4]}]\n[${lastActivity}]: [${message.content}]\nChannel: [${message.channel.name}]\nID:[${message.author.id}]\n`);

    if (message.channel.type === "dm") {
        return;
    }
    const prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {

        prefixes[message.guild.id] = {

            prefixes: config.prefix
        };
    }

    const prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.toLowerCase().split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if (command.startsWith(prefix)) {
        let commandfile = bot.commands.get(command.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args);
    };
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
        .setColor(0xFFFF)
    if (message.content.toLowerCase().match(prefix + 'support kick')) {
        embed.setDescription('\`kick <user> <... reason>\`')
            .addField('❯ Description', 'Kicks the mentioned user, reason is not required')
            .addField('❯ Examples', `${prefix}kick <@${message.author.id}> because why not\n${prefix}kick <@${message.author.id}>`)
        return message.channel.send(embed);
    }
    if (message.content.toLowerCase().match(prefix + 'support ban')) {
        embed.setDescription('\`ban <user> <... reason>\`')
            .addField('❯ Description', 'Bans the mentioned user, reason is not required')
            .addField('❯ Examples', `${prefix}ban <@${message.author.id}> breaking rules \n${prefix}ban <@${message.author.id}>`)
        return message.channel.send(embed);
    }
    if (message.content.toLowerCase().match(prefix + 'support unmute')) {
        embed.setDescription('\`unmute <user> <... reason>\`')
            .addField('❯ Description', 'Unmutes the mentioned user')
            .addField('❯ Examples', `${prefix}unmute <@${message.author.id}> missclick \n${prefix}unmute <@${message.author.id}> sorry, wrong person`)
        return message.channel.send(embed);
    }
    if (message.content.toLowerCase().match(prefix + 'support mute')) {
        embed.setDescription('\`mute <user> <... time> <... reason>\`')
            .addField('❯ Description', 'Mutes the mentioned user')
            .addField('❯ Examples', `${prefix}mute <@${message.author.id}> **2h** yes \n${prefix}mute <@${message.author.id}> mute him permanently`)
        return message.channel.send(embed);
    }
    if (message.content.toLowerCase().match(prefix + 'support warn')) {
        embed.setDescription('\`warn <user> <... reason>\`')
            .addField('❯ Description', 'Warns an user. 3 warns equals kick, 6 equals ban')
            .addField('❯ Examples', `${prefix}warn <@${message.author.id}> breaking rules \n${prefix}warn <@${message.author.id}> swearing`)
        return message.channel.send(embed);
    }
    if (message.content.toLowerCase().match(prefix + 'support inf')) {
        embed.setDescription('\`info <user>\`')
            .addField('❯ Description', "Shows user's amount of warns")
        return message.channel.send(embed);
    }
    if (message.content.toLowerCase().match(prefix + 'support unwarn')) {
        embed.setDescription('\`unwarn <user> <... reason>\`')
            .addField('❯ Description', 'Deletes a warn from an user. The number can be negative. 3 warns equals kick, 6 equals ban')
            .addField('❯ Examples', `${prefix}unwarn <@${message.author.id}> missclick \n${prefix}unwarn <@${message.author.id}> sorry, wrong person`)
        return message.channel.send(embed);
    }

    if (message.content.toLowerCase().match(prefix + 'support muted')) {
        embed.setDescription('\`muted\`')
            .addField('❯ Description', 'Creates \`muted\` role, which is used in \`mute\` and \`unmute\` command.')
        return message.channel.send(embed);
    }

    if (message.content.toLowerCase().match(prefix + 'support setp')) {
        embed.setDescription('\`setprefix <new prefix>\`')
            .addField('❯ Description', 'Bot sets the new server prefix. Remember, Bot saves only one prefix..')
            .addField('❯ Examples', `${prefix}setprefix! \n${prefix}setprefix ? \n**Wrong**:\nustawprefix 123 321`)
        return message.channel.send(embed);
    }
    
    if (message.content.toLowerCase().match(prefix + 'support userro')) {
        embed.setDescription('\`userrole <exact name of the role>\`')
            .addField('❯ Description', 'Shows users that have given role. You have to get exact name of the role, even if it has emoji in it or UPPERCASE LETTERS.')
            .addField('❯ Examples', `${prefix}userrole guests :x: \n${prefix}userrole Guests :white_check_mark:`)
        return message.channel.send(embed);
    }
    
    if (message.content.toLowerCase().match(prefix + 'support invite')) {
        embed.setDescription('\`lbinvite\`')
            .addField('❯ Description', 'Shows top 10 most used invites, and the invite creator.')
        return message.channel.send(embed);
    }

    if (message.content.match('594084114924306437')) {
        if (message.author.bot)
            return;
        const helpgekoembed = new Discord.RichEmbed()
            .setAuthor('Void', bot.user.avatarURL)
            .setThumbnail(bot.user.avatarURL)
            .addField('About Void:', `Void is a moderation bot. It has basic moderation stuff, simple warning method and effective mute system. You can check every command by typing \`${prefix}help\`.`, true)
            .addField('Prefix', `\**Bot's prefix\** here is \`${prefix}\`. Default prefix is \`=\`. You can change it by \`=setprefix <prefix>\`. `)
            .setTimestamp()
            .setFooter('Thank you for using our Bot!', bot.user.avatarURL)
            .setColor(0xFFFF)
        return message.channel.send(helpgekoembed)
    }
});
bot.login(config.token);
