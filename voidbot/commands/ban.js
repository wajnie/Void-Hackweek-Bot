const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    if (message.content.match(message.author.id))
        return message.reply("**Aww, come on. Don't do this to yourself**");
	
    let reason = args.slice(1).join(" ");
    let memberr = message.mentions.members.first();
    const member1 = message.guild.member(memberr);
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    const use = message.mentions.users.first()

    const errerembed2 = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Missing \`[user]\` argument \n\nCorrect usage:\n\`ban | [user] \` `)
	.setColor('ff0000')

     const errerembed = new Discord.RichEmbed()
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription(`Missing \`KICK_MEMBERS\` permission\n\nBot doesn't have enough permissions to ban.`)
        .setColor('ff0000')
    if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
        return message.channel.send(errerembed);
    }
    if (!args[0]) {
        return message.channel.send(errerembed2);
    }
    if (message.mentions.users.size === 0) {
        return message.channel.send(errerembed2);
    }
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        const notkidkembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`KICK_MEMBERS\` permission\n\nUser doesn't have enough permissions to kick.`)
            .setColor('ff0000')
        return message.channel.send(notkidkembed)
    }
    if (!memberr.bannable)
        return message.channel.send(`I can't ban **${use.tag}**. Maybe he is a higher rank than me, or i don't have enough permissions`);
    await memberr.ban(reason)
        .catch(error => message.reply(`Error: \`\`\`${error}\`\`\``));
    message.channel.send(`Successfully banned **${use.tag}** from the server`) + memberr.ban(reason)
}
module.exports.help = {
    name: "ban"
}
