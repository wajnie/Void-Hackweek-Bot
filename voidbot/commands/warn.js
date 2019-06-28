const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    let memberr = message.mentions.members.first();
    const use = message.mentions.users.first();

    if (message.content.match(message.author.id))
        return message.reply("**Aww, come on. Don't do this to yourself**");

    if (message.author.bot) return;

    let user = message.mentions.users.first();
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        const argembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`KICK_MEMBERS\` permission\n\nUser doesn't have permission to kick.`)
            .setColor('ff0000')
        return message.channel.send(argembed)
    }
    let warnUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!warnUser) {
        const argembedd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`[user]\` argument\n\nCorrect usage:\n\`warn | [user] | [optional reason]\` `)
            .setColor('ff0000')
        return message.channel.send(argembedd)
    }

    if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
        const akickembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ff0000')
            .addField(`Missing \`KICK_MEMBERS\` permission`, `Bot doesn't have permission to kick.`)
        return message.channel.send(akickembed)
    }
    if (user.bot === true)
        return message.channel.send("**Bots can't be warned, silly**")
    let reason = args.join(" ").slice(22);

    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    message.channel.send(`**${user.tag}** has been warned.`).catch(console.error)
    if (warns[wUser.id].warns == 3) {
        if (!memberr.kickable)
            return message.channel.send(`I can't kick **${use.tag}** because of his \`3\` warns. Maybe he is a higher rank than me, or i don't have enough permissions.`);
        message.channel.send(`**${user.tag}** has been kicked for having \`3\` warns`)
        message.guild.member(wUser).kick("3 warns")
    }
    if (warns[wUser.id].warns == 6) {
        if (!memberr.bannable)
            return message.channel.send(`I can't ban ${use.tag}** because of his \`6\` warns. Maybe he is a higher rank than me, or i don't have enough permissions.`);
        message.channel.send(`**${user.tag}** has been banned for having \`6\` warns!`)
        message.guild.member(wUser).ban("6 warns")
    }
}
module.exports.help = {
    name: "warn"
}
