const discord = require("discord.js");
const botConfig = require("./botConfig.json");


bot.on("ready", async () => {

     console.log(`${bot.user.username} is online!`)
    
      bot.user.setActivity("In maak!", { type: "PLAYING" });

});

client.on("message", async message =>{

   if(message.author.bot) return;

   if(message.channel.type == "dm") return;

   var prefix = botConfig.prefix;

   var messageAray = message.content.split(" ");

   var command = messageAray[0];

   if(command === `${prefix}support`){
       return message.channel.send("Heb je support nodig? Maak dan een ticket aan!");
    }

    if(command === `${prefix}info`){
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle("Wat voor bot is dit?")
            .setDescription("Dit is een alegmene bot genaamd: Piep Piep. Dit is een bot waarmee je kan Solliciteren, tickets aanmaken en nog veel meer!")
            .setColor("#353ddb")
            .addFields(
                {name:"We hope you will have a good time with this bot!", value:"A ticket/sollicitation bot!"},
                {name:"Support server soon!", value:"#soon"},
                {name:"Have you questions? DM", value:"Tahatjuh#0001"},
                {name:"Bot Entwickler/Owner", value:"Tahatjuh#0001"}
    )
            .addField("Bot name", client.user.username)
            .setThumbnail("https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png")
            .setFooter("Made by: Tahatjuh#0001", "https://informaticalessen.be/wp-content/uploads/2015/08/copyright.jpg")
            .setTimestamp();
        
            return message.channel.send(botEmbed);
     }
     if(command === `${prefix}serverinfo`){
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle("Information from this server")
            .setColor("#00d5ff")
            .addFields(
                {name:"You are joined the server:", value: message.member.joinedAt},
                {name:"Total Members", value:message.guild.memberCount},
                    );
        
            return message.channel.send(botEmbed);
            }
     
           

    bot.login(proces.env.token);

    if (command === `${prefix}help`) {

        return message.channel.send("Will you get support? Do ,new and a staff will help you!");

    }


    if (command === `${prefix}ticket`) {

        const categoryID = "839267270471450654"

        var userName = message.author.username;
        var userDiscriminator = message.author.disriminator;

        var ticketBestaat = false;

        message.guild.channels.cache.forEach(channel => {

            if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
                ticketBestaat = true;

                message.reply("You have already created a ticket");

                return;
            }

        });

        if (ticketBestaat) return;

        var ticketEmbed = new discord.MessageEmbed()
            .setTitle("Hello" + message.author.username)
            .setFooter("Your ticket will be created");

        message.channel.send(ticketEmbed);

        message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: `text` }).then(
            (createdChannel) => {
                createdChannel.setParent(categoryID).then(
                    (settedParent) => {

                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === `@everyone`), {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false
                        });

                        settedParent.updateOverwrite(message.author.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                            ADD_REACTIONS: true,
                            CREATE_INSTANT_INVITE: false,
                            ATTACH_FILES: true,
                            CONNECT: true,
                            ADD_REACTIONS: true
                        });


                    }
                ).catch(err => {
                    message.channel.send("Something went wrong, please try again later.");
                });
            }
        ).catch(err => {
            message.channel.send("Something went wrong, please try again later.");
        });

    }

    if (command === `${prefix}close`) {

        const categoryID = "839267270471450654"

        if (!message.member.hasPermission("MOVE_MEMBERS")) return message.reply("You are not authorized to manage this command.");

        if (message.channel.parentID == categoryID) {
            message.channel.delete();
        } else {

            message.channel.send("This command can only be used in a ticket.");
        }

        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("The ticket is marked as **completed**.")
            .setFooter("Ticket closed");

        //channel voor logging
        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
        if (ticketChannel) return message.reply("Channel does not exist");
    }


});

bot.login(process.env.token);