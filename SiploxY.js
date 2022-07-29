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
    if(message.content.startsWith(prefix + 'SiploxY')) {
        message.channel.send(`Yo`);
    }
    if(message.content.startsWith(prefix + 'Nya')) { 
        message.channel.send({embed: {
        color: 6816932,
        description: "·w·"
        }})
    }
    if(message.content.startsWith(prefix + "Pat")) {
        const embedDatos = new Discord.MessageEmbed() 
        .setTitle("OwO")
        .setColor("PURPLE")
        .setDescription("")
        .setImage("https://c.tenor.com/9R7fzXGeRe8AAAAC/fantasista-doll-anime.gif")

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "Sleep")) {
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
    if(message.content.startsWith(prefix + "say")) {
    const args = message.content.slice(prefix.length)//.trim().split(/ +/g)
    if(!args) return message.channel.send("Necesitas poner algo para que pueda decirlo.") 

    message.channel.send(args)
    }

    

});
client.login(config.token);