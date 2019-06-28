const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) {
        const aakickembedd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`MANAGE_ROLES\` permission \n\nBot doesn't have permission to create \`muted\` role.`)
            .setColor('ff0000')
        return message.channel.send(aakickembedd)
    }
    if (message.guild.roles.find("name", "muted")) {
        const emded = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ff0000')
            .setDescription(`Why do you need 2 same named ranks? Rename other rank and come back.`)
        return message.channel.send(emded)
    }
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        const wereembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ff0000')
            .setDescription(`Missing \`MANAGE_CHANNELS\` \n\nUser doesn't have Manage Channels permission to do that.`)
        return message.channel.send(wereembed)
    }
    muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: []
    }).catch(error => message.channel.send('OOf, an error appeared! Check my permissions before you do anything with that command.'));
    message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        });
    });
    const tryembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('32CD32')
        .addField('Successfully created role.', 'Created \`muted\` role with correct permissions.')
    message.channel.send('`Creating muted role...`')
        .then((msg) => {
            setTimeout(function() {
                msg.edit(tryembed);
            }, 2000)
        });
}
module.exports.help = {
    name: "mutedrole"
}
