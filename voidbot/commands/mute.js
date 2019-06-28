const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let mute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (message.author.bot) return;
    if (!args[0]) {
        const argembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Brakujący \`[user]\` argument \n\nCorrect usage:\n\`mute | [user] | [you can put time here]\``)
            .setColor('ff0000')
        return message.channel.send(argembed)
    }

    if (message.content.match(message.author.id))
        return message.reply("**Aww, come on. Don't do this to yourself**");

    let muterole = message.guild.roles.find(`name`, "muted");
    if (!muterole) {
        const bladembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`[muted]\` role \n\nFix:\nUse \`muted\` command`)
            .setColor('ff0000')
        return message.channel.send(bladembed)

        if (mute.roles.find("name", "muted")) {
            const embedd = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription(`Error in muting an user\n\nUser is already muted`)
                .setColor('ff0000')
            return message.channel.send(embedd)
        }
    }
    if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) {
        const aakickembedd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`MANAGE_ROLES\` permission \n\nBot can't mute anyone because he doesn't have permission to Manage Roles`)
            .setColor('ff0000')
        return message.channel.send(aakickembedd)
    }
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        const wereembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`[KICK_MEMBERS]\` permission \n\nUser doesn't have permission to Kick Members, so he can't use this command`)
            .setColor('ff0000')
        return message.channel.send(wereembed)
    }
    let mutetime = args[1];
    if (!mutetime) {
        const muteeembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ff0000')
            .addField("Mute", `<@${mute.id}>`)
        await (mute.addRole(muterole.id));
        return message.channel.send(muteeembed)
    }
    var cos = mutetime.toLowerCase().match(/[0-9]+(ms|s|m|h|d|w|y)/g);
    if (cos) {
        if (args[1].match(","))
            return message.reply('**Error in specifying time, please use \`.\` instead of \`,\` for example 1.5h, not 1,5h**');

        const muteembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ffff00')
            .addField("Mute", `<@${mute.id}>`)
            .addField("Time", `${mutetime}`)
        await (mute.addRole(muterole.id));
        message.channel.send(muteembed)

        setTimeout(function() {
            if (mute.roles.find("name", "muted")) {
                mute.removeRole(muterole.id);
                message.channel.send(`<@${mute.id}> has been unmuted (\`he was muted for \`${args[1]}\`) `)
            }
        }, ms(mutetime));
    } else {
        const muteeembedd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ffff00')
            .addField("Mute", `<@${mute.id}>`)
        await (mute.addRole(muterole.id));
        return message.channel.send(muteeembedd)
    }
}
module.exports.help = {
    name: "mute"
}
