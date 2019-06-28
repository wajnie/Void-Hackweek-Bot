const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    
            const defRole = message.guild.defaultRole;
            const defRolePerms = message.channel.rolePermissions(defRole).serialize();
            message.channel.overwritePermissions(defRole, {
                SEND_MESSAGES: !defRolePerms.SEND_MESSAGES
            });
            
            //if (defRole.hasPermission("SEND_MESSAGES") === fals){
              //  console.log('adjoaojidwakijiodsj')
                //    message.channel.send('**Successfully unlocked channel**').catch(error => message.reply(`OOF, unexpected error: \`\`\`${error}\`\`\``))
            //}
            
           // if (defRole.hasPermission("SEND_MESSAGES") == true){
             //   console.log('ddddddd')
               //     message.channel.send('**Succesfully locked channel**').catch(error => message.reply(`OOF, unexpected error: \`\`\`${error}\`\`\``))
            //}
            message.channel.send((`Successfully set **Server`) + "'s" + (` Default Role** permission \`SEND_MESSAGES\` to \`${!defRolePerms.SEND_MESSAGES}\` `));
        }
            module.exports.help = {
                name: "lock"
            }
