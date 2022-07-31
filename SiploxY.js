const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");    

let prefix = config.prefix;

client.on("ready", () => {
    console.log(`Toy listo ·w·`);
});

client.on("message", (message) => {
    if (message.author.bot) return;
	const args = message.content.trim().split(/ +/g);
    if(message.content.startsWith(prefix + 'help')) {
        
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .addField('8ball', 'Adivinará el futuro de la pregunta que hagas', true)
            .addField('Dado', 'Tirara un dado, te dará un numero del 1 al 6', true)
            .addField('SadCat', 'Enviará imagenes aleatorias de gatos tristes')
            .addField('Avatar', 'Enviará el avatar de la persona a la que hayas mencionado')
            .addField('Say', 'Dirá lo que que tu escribas y borrará tu mensaje', true)
            .addField('Pat', 'Acariciarás a la persona que menciones' )
            .setColor("PURPLE")
        
        message.author.send(embed);
    }    
    if(message.content.startsWith(prefix + 'SiploxY')) {
        message.channel.send(`Yo`);
    }
    if(message.content.startsWith(prefix + 'Nya')) { 
        message.channel.send({embed: {
        color: 6816932,
        description: "·w·"
        }})
    }
    if(message.content.startsWith(prefix + "pat")) {
        const embedDatos = new Discord.MessageEmbed() 
        .setTitle("OwO")
        .setColor("PURPLE")
        .setDescription("")
        .setImage("https://c.tenor.com/9R7fzXGeRe8AAAAC/fantasista-doll-anime.gif")

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "sleep")) {
        const embedDatos = new Discord.MessageEmbed() 
        .setTitle("Zzz")
        .setColor("PURPLE")
        .setDescription("")
        .setImage("https://c.tenor.com/rVQy1P3iqJkAAAAC/gura-gawr.gif")

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "8ball")) {
        let respuesta = ["Sis", "Non", "Puede ser", "Es lo mas probable", "Las probabilidades son bajas", "No lo creo", "Definitivamente.", "Definitivamente no."  ]
        var random = respuesta[Math.floor(Math.random() * respuesta.length)]
      const embed = new Discord.MessageEmbed()/
      
      
      message.channel.send(random)
    }
    if(message.content.startsWith(prefix + "dado")) {
        let respuestadado = ["🎲 ¡Te ha salido un **1**!", "🎲 ¡Te ha salido un **2**!", "🎲 ¡Te ha salido un **3**!", "🎲 ¡Te ha salido un **4**!", "🎲 ¡Te ha salido un **5**!", "🎲 ¡Te ha salido un **6**!"]
        var randomdado = respuestadado[Math.floor(Math.random() * respuestadado.length)]
      const embed = new Discord.MessageEmbed()/
      
      
      message.channel.send(randomdado)
    }
    if(message.content.startsWith(prefix + "say")) {
    const args = message.content.slice(5)
    if(!args) return message.channel.send("Necesitas poner algo para que pueda decirlo ·w·") 

    message.channel.send(args)

    message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
    }
    if(message.content.startsWith(prefix + "SadCat")) {
     const fetch = require('node-fetch')
     const { MessageEmbed } = require("discord.js")
    
    
     fetch(`https://api.alexflipnote.dev/sadcat`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle('Meow')
            .setImage(body.file)
            .setColor("PURPLE")
            message.channel.send(embed)
        })
    }
    if(message.content.startsWith(prefix + "avatar")) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let avatar = user.user.displayAvatarURL({ dynamic: true, size: 2048}) 

        message.channel.send(avatar)
    }


});
client.login(config.token);