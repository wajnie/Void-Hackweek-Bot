const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
    let memberr = message.mentions.users.first();
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };
    let wLvl = warns[wUser.id].warns;

    const errerembed2 = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Missing \`[user]\` argument \n\nCorrect usage:\n\`kick | [user] \` `)
        .setColor('ff0000')

    if (!args[0]) return message.channel.send(errerembed2)
    const embed = new Discord.RichEmbed()
        .setColor('ff0000')
        .setDescription(`**<@${wUser.id}>'s Warn Status**\n\`${wLvl}\` Warns`)
        .setFooter(memberr.tag)
    message.channel.send('**Getting information...**').then((msg) => {
        setTimeout(function() {
            msg.edit(embed);
        }, 300)
    });
}
module.exports.help = {
    name: "info"
}
