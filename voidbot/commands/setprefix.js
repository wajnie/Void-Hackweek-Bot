const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        const lumbed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing permission \`MANAGE_CHANNELS\` \n\nUser doesn't have Manage Channels permission. Access denied.`)
            .setColor('ff0000')
        return message.channel.send(lumbed)
    }
    if (!args[0]) {
        const argembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription('Missing \`[prefix]\` argument \n\nCorrect usage:\n\`setprefix | [prefix]\`')
            .setColor('ff0000')
        return message.channel.send(argembed)
    }
    if (args[0].length > 2) {
        const argsembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription('Too long \`[prefix]\` argument \n\Correct usage:\n\`setprefix | [prefix]\`')
            .setColor('ff0000')
            .setFooter('Prefix musi być max 2-literowy')
        return message.channel.send(argsembed);
    }
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    prefixes[message.guild.id] = {
        prefixes: args[0]
    };
    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });
    let sEmbed = new Discord.RichEmbed()
        .setColor('00ff00')
        .setAuthor("Prefix has been changed!")
        .setDescription(`Set as: \`${args[0]}\``)
        .setFooter("Prefix set:")
        .setTimestamp(message.createdAt);
    message.channel.send(sEmbed);
}
module.exports.help = {
    name: "setprefix"
}
