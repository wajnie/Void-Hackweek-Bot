const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    let roleName = message.content.split(" ").slice(1).join(" ");
    const embedd = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Missing \`[role]\` argument \n\nProper usage:\n\`userrole | [role]\``)
        .setColor('ff0000')
    if (!roleName) return message.channel.send(embedd)
    let findrole = message.guild.roles.find(role => role.name === roleName)
    const errorembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Invalid \`[role]\` argument\n\nProper usage:\n\`userrole | [role]\``)
        .setColor('ff0000')
        .setFooter("Role like that doesn't exist, remember you have to type exact name of the role.")
    if (!findrole) return message.channel.send(errorembed);
    message.channel.send('**List is being created**. If the bot will not reply after 10 seconds, that means there is an unexpected error.')
    let membersWithRole = message.guild.members.filter(member => {
        return member.roles.find("name", roleName);
    }).map(member => {
        return member.user.tag;
    })

    const errorrembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`The amount of people is more than 20, and the bot can't show it. \`${membersWithRole.length}\` users have this role`)
        .setColor('ff0000')
    if (membersWithRole.length > 20)
        return message.channel.send(errorrembed);

    let embed = new Discord.RichEmbed()
        .addField(`Users with ${roleName} role. \`${membersWithRole.length}\` members have it.`, membersWithRole.join("\n"))
        .setColor(0xFFFF)
    message.channel.send(embed)
}
module.exports.help = {
    name: "userrole"
}
