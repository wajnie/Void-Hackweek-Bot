const Discord = require("discord.js");
arraySort = require('array-sort');
module.exports.run = async (bot, message, args) => {
    const errerembed2 = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Unknown missing permission \nIt is one of these: \n\`VIEW_AUDIT_LOG\` \`MANAGE_WEBHOOKS\`  \`MANAGE_INVITES\` `)
        .setColor('ff0000')
    if (!message.guild.member(bot.user).hasPermission("VIEW_AUDIT_LOG")) {
        return message.channel.send(errerembed2);
    }
    if (!message.guild.member(bot.user).hasPermission("MANAGE_WEBHOOKS")) {
        return message.channel.send(errerembed2);
    }
    if (!message.guild.member(bot.user).hasPermission("MANAGE_INVITES")) {
        return message.channel.send(errerembed2);
    }
    if (message.author.bot) return;
    let invites = await message.guild.fetchInvites()
    if (!invites) return message.channel.send("**There's no invite**")
    invites = invites.array();
    arraySort(invites, 'uses', {
        reverse: true
    });
    let invitess = [
        ['\**User and his invite\**']
    ];
    for (var i = 0; i < Math.min(invites.length, 10); i++) {
        let invite = invites[i];
        invitess.push(`\n\`${i + 1}.\` ${invite.inviter.tag} - \`${invite.uses}\` uses`);
    }
    const embed = new Discord.RichEmbed()
        .setAuthor('Server Invites', message.guild.iconURL)
        .addField('\nTop 10 Leaderboard:', `${invitess}`)
        .setColor(0xFFFF)
    message.channel.send(embed)
}
module.exports.help = {
    name: "invitelb"
}
