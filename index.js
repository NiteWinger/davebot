const Discord = require('discord.js');
const eco = require("discord-economy");
const { Client, Attachment } = require('discord.js');
const bot = new Discord.Client();

const prefix = 'd!'

let cooldown = new Set();
let jobseconds = 6000;

bot.on('ready', () =>{
    console.log('Why hello there, Old Sports!');
    bot.user.setActivity('d!help | Why hello there, Old Sports!');
})

bot.on('message', async message => {
    
    var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    
    var args = message.content.split(' ').slice(1);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (command === 'kebab') {
        if (args[0] === 'Fredbears') {
            message.channel.send('Thanks, Old Sport, I will be looking there. Especally in the Fazbunker, I hope Jeff left his.')
        }else{
            if (args[0] === 'Freddys') {
                message.channel.send('Thanks, Old Sport, I will be looking there. I bet Phoney stole my kebab.')
            }else{
                if (args[0] === 'Prize-Corner') {
                    message.channel.send('No way I am getting near Matt...')
                }else{
                    message.channel.send('Where is the Kebab, Old Sport?')
                }
            }
        }

    }

    if (command === 'kidnap') {
        message.channel.send('Sorry, Old Sport, but this feature is unavilable for now.')
    }

    if (command === 'stats') {
        var output = await eco.FetchBalance(message.author.id)
            const stats = new Discord.RichEmbed()
            .setTitle('Server Stats')
            .addField('Server Name', message.guild.name)
            .addField('Username', message.author)
            .addField('Dave Coins', ':eggplant: ' + output.balance)
            message.channel.send(stats);
    }

    if (command === 'help') {
        const help = new Discord.RichEmbed()
        .setTitle('DaveBot Help')
        .addField('**Fun**', 'Fun Commands')
        .addField('d!kebab (location)', 'Dave will ask for your kebab.')
        .addField('d!say (message)', 'Dave will send a special message.')
        .addField('d!roll', 'Dave rolls and dice and tells you the result.')
        .addField('**Economy**', 'Economy Commands')
        .addField('d!stats', 'Shows your DaveBot Stats.')
        .addField('d!balance', 'Shows your Dave Coins Balance.')
        .addField('d!pay (user) (amount)', 'Pay a user some of your Dave Coins.')
        .addField('d!daily', 'Claim your daily 100 Dave Coins.')
        .addField('d!work', 'Work for extra money.')
        .addField('**Other**', 'Other Commands')
        .addField('d!credit', 'Shows the Credit for the DaveBot.')
        .addField('d!support', 'Sends the Invite to the Support Server.')
        message.channel.send(help);
    }

    if (command === 'credit') {
        const credit = new Discord.RichEmbed()
        .setTitle('DaveBot Credit')
        .addField('Development', 'NiteWinger#5857')
        .addField('Artwork', 'Dave Miller#1987')
        message.channel.send(credit);
    }

    if (command === 'support') {
        message.channel.send('You can find support for the DaveBot here: https://discord.gg/kTsVrZe')
    }

    if (command === 'say') {
        if (args[0] === 'Hello') {
            message.channel.send('Why hello there, Old Sport')
        }else{
            if (args[0] === 'Fax') {
                message.channel.send('Pick up the Fax! Pick up the Fax! Grand Canyon! Grand Canyon!')
            }else{
                if (args[0] === 'Jack') {
                    message.channel.send('Old Sport Old Sport Old Sport Old Sport Old Sport Old Sport Old Sport Old Sport Old Sport Old Sport')
                }else{
                    if (args[0] === 'Gay') {
                        message.channel.send('Who ships Barry x Rupert?')
                    }else{
                        if (args[0] === 'No-U') {
                            const nou = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551091954512035860/unknown.png');
                            message.channel.send(nou);
                        }else{
                            message.channel.send(`${args[0]}`)
                        }
                    }
                }
            }
        }
    }

    if (command === 'gamenight') {
        message.channel.send('Why hello there, players! Today we are playing DaveOpoly!')
        const daveopoly = new Attachment('https://cdn.discordapp.com/attachments/540350622713774080/551151335358070827/DaveOpoly.png');
        message.channel.send(daveopoly);
    }

    if (command === 'roll') {
        var roll = Math.floor(Math.random() * 6) + 1;
        message.channel.send('There, You rolled a ' + roll)
    }

    if (command === 'daily') {

        var output = await eco.Daily(message.author.id)
 
        if (output.updated) {
 
        var profile = await eco.AddToBalance(message.author.id, 100)
        message.reply(`You claimed your daily dave coins! You now have :eggplant: ${profile.newbalance}.`);
 
        } else {
        message.channel.send(`Sorry, Old Sport, but you already claimed your daily coins!\nBut no worries, over ${output.timetowait} you can daily again!`)
        }
    }

    if (command === 'ecogive') {

            if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('Sorry, Old Sport, but this command is admin only!')

            var UserID = args[0]
            var toAdd = args[1]

            eco.AddToBalance(UserID, toAdd)
            message.channel.send(`You have given ${args[0]} :eggplant: ${args[1]}.`)
    }

    if (command === 'balance') {

        var output = await eco.FetchBalance(message.author.id)

        const balanceembed = new Discord.RichEmbed()
        .setTitle ('Balance')
        .addField('Dave Coins', ':eggplant: ' + output.balance)
        message.channel.send(balanceembed)
    }

    if (command === 'bal') {
        var output = await eco.FetchBalance(message.author.id)

        const balanceembed2 = new Discord.RichEmbed()
        .setTitle ('Balance')
        .addField('Dave Coins', ':eggplant: ' + output.balance)
        message.channel.send(balanceembed2)
    }

    if (command === 'pay') {
        var user = message.mentions.users.first()
        var amount = args[1]
     
        if (!user) return message.reply('Which Old Sport do you want to pay?')
        if (!amount) return message.reply('How much do you want to pay your Old Sport?')
     
        var output = await eco.FetchBalance(message.author.id)
        if (output.balance < amount) return message.reply('Sorry, Old Sport, but you do not even have that much')
     
        var transfer = await eco.Transfer(message.author.id, user.id, amount)
        message.reply(`Transfering coins succesfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
    }

    if (command === 'work') {

        if(cooldown.has(message.author.id)){
            message.delete();
            return message.channel.send("Sorry, Old Sport, but you need to wait ten minutes between working")
        }
        cooldown.add(message.author.id);

     var output = await eco.Work(message.author.id, {
            failurerate: 10,
            money: Math.floor(Math.random() * 500),
            jobs: ['janitor', 'preformer', "supplier", "nightguard"]
          })
          if (output.earned == 0) return message.reply('Old Sport, you just got caught in a springlock failure so you earned nothing!')
       
          message.channel.send(`Hey, Old Sport, you worked as a \` ${output.job} \` and earned :eggplant: ${output.earned}\nYou now own :eggplant: ${output.balance}`)

          setTimeout(() => {
            cooldown.delete(message.author.id)
        }, jobseconds * 1000)
}

    if (command === 'meme') {
        var memenumber = Math.floor(Math.random() * 15)

        if (memenumber === 0) {
            const meme0 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379025713430528/tumblr_pknl6xdIqc1wgn6o4o1_500.png');
            message.channel.send(meme0);
        }else{
            if (memenumber === 1) {
                const meme1 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379051986681876/50b04644535ce4feb453fe2412b28e1789357730_hq.png');
                message.channel.send(meme1);
            }else{
                if (memenumber === 2) {
                    const meme2 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379083083251713/oqgalh260a921.png');
                    message.channel.send(meme2);
                }else{
                    if (memenumber === 3) {
                        const meme3 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379217107910688/rg9wwvom5gk11.png');
                        message.channel.send(meme3);
                    }else{
                        if (memenumber === 4) {
                            const meme4 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379241556508693/44479992_1388913537906372_6577599188103527671_n.png');
                            message.channel.send(meme4);
                        }else{
                            if (memenumber === 5) {
                                const meme5 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379323097972755/tumblr_oz4ay76uP51tnt9tuo2_400.png');
                                message.channel.send(meme5);
                            }else{
                                if (memenumber === 6) {
                                    const meme6 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379380677640213/f818d21695d59953759445f4e62c09cfb528d474r1-2048-1802v2_00.png');
                                    message.channel.send(meme6);
                                }else{
                                    if (memenumber === 7) {
                                        const meme7 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379438911356928/Yes.png');
                                        message.channel.send(meme7);
                                    }else{
                                        if (memenumber === 8) {
                                            const meme8 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551379653429035009/maxresdefault.png');
                                            message.channel.send(meme8);
                                        }else{
                                            if (memenumber === 9) {
                                                const meme9 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551380176664133660/tumblr_ph4h6w4N121wgn6o4o5_500.png');
                                                message.channel.send(meme9);
                                            }else{
                                                if (memenumber === 10) {
                                                    const meme10 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551380201121251348/tumblr_pknl6xdIqc1wgn6o4o4_500.png');
                                                    message.channel.send(meme10)
                                                }else{
                                                    if (memenumber === 11) {
                                                        const meme11 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551380307417366538/tumblr_pd3l18LJOg1u5hdp7o1_400.png');
                                                        message.channel.send(meme11);
                                                    }else{
                                                        if (memenumber === 12) {
                                                            const meme12 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551380492524453895/49667544_821661228167053_7908031530492400366_n.png');
                                                            message.channel.send(meme12);
                                                        }else{
                                                            if (memenumber === 13) {
                                                                const meme13 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551381020046524416/Dxqh8ixWwAEEuoT.png');
                                                                message.channel.send(meme13);
                                                            }else{
                                                                if (memenumber === 14) {
                                                                    const meme14 = new Attachment('https://cdn.discordapp.com/attachments/551061634320302140/551381202213404673/51685961_1275717432566982_6902773979350085615_n.png');
                                                                    message.channel.send(meme14);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

})

bot.login(process.env.BOT_TOKEN);
