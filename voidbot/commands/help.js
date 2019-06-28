const Discord = require("discord.js")
const fs = require("fs")
const config = require("./config.json");
module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    const prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;
    // ❯ symbol
    const embed = new Discord.RichEmbed()
        .setColor(0xFFFF)
        .addField("❯ Commands", `List of available. \nFor command description, you can use \`${prefix}support <command>\`. `)
        .addField("❯ Mod", "`kick` `ban` `mute` `unmute` `warn` `unwarn` `lock` `clear`")
        .addField("❯ Config", "`mutedrole` `setprefix`")
        .addField("❯ Other", "`invitelb` `info` `userrole`")
    message.channel.send(embed)
}
module.exports.help = {
    name: "help"
}
