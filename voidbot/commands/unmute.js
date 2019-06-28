const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    let memberr = message.mentions.members.first();
    const member1 = message.guild.member(memberr);
    let muted = message.guild.roles.find("name", "muted");

    if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) {
        const aakickembedd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ff0000')
            .setDescription(`Missing \`MANAGE_ROLES\` permission\n\nBot doesn't have Manage Roles permission.`)
        return message.channel.send(aakickembedd)
    }
    let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    // let prefix = prefixes[message.guild.id].prefixes;
    const emved = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('FF0000')
        .setDescription(`Missing \`MANAGE_ROLES\` permission\n\nUser doesn't have Manage Roles permission.`)
        
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(emved)
    const ended = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('FF0000')
        .setDescription(`Missing \`[user]\` argument\nCorrect usage:\n\`unmute | [user]`)
        
    if (!args[0]) return message.channel.send(ended)

    if (message.mentions.users.size === 0) {
        return message.reply(ended).catch(console.error);
    }
    
    if (!mute.roles.find("name", "muted")) {
        const embedd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ff0000')
            .setDescription(`User is not muted.`)
        return message.channel.send(embedd)
    }
    
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('7FFF00')
        .addField("Unmute", args[0])
        .setTimestamp()
        .setFooter("Done")
    if (message.author.bot) return
    mute.removeRole(muted) + message.channel.send(embed)
}
module.exports.help = {
    name: "unmute"
}
