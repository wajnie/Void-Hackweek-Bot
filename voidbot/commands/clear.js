const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if (message.author.bot) return;

    const embeddd = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Missing \`MANAGE_MESSAGES\` permission \n\nUser doesn't have permission to Manage Messages`)
        .setColor('ff0000')

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embeddd);

    const embedd = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Missing \`MANAGE_MESSAGES\` permission \n\nBot doesn't have permission to Manage Messages`)
        .setColor('ff0000')

    if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(embedd)

    const errembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Invalid \`[number]\` argument\n\nCorrect usage:\n\`clear | [number from 2 to 100]\``)
        .setColor('ff0000');

    if (args[0] < 2)
        return message.channel.send(errembed)

    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Invalid \`[number]\` argument\n\nCorrect usage:\n\`clear | [number from 2 to 100]\``)
        .setColor('ff0000')

    if (!args[0]) return message.channel.send(embed);

    if (isNaN(args[0])) return message.channel.send(embed);

    let messagecount = parseInt(args[0]);
    message.channel.fetchMessages({
            limit: messagecount
        })
        .then(messages => message.channel.bulkDelete(messages))
        .catch(error => message.reply(`OOF, unexpected error: \`\`\`${error}\`\`\``));
    message.channel.send(`**Cleared \`${args[0]}\` messages**`)

}

module.exports.help = {
    name: "clear"
}
