const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const discordTTS = require("discord-tts");


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
    if(message.content.startsWith(prefix+"decir")) {
	let decir = args.join(' ')
	const voiceChannel = message.member.voice.channel;

	if(!decir) return message.channel.send('**<a:No:769884924995829800> | ¿Que quieres que diga?**') 
    if(!voiceChannel) return message.channel.send('**<a:No:769884924995829800> | Entra a un canal de voz y vuelve a intentarlo.**')

     voiceChannel.join().then(connection => { 
        const stream = discordTTS.getVoiceStream(decir);
        const dispatcher = connection.play(stream);
        dispatcher.on("finish",()=>voiceChannel.leave())
        })
    }
    if(message.content.startsWith(prefix + "8ball")) {//definimos el comando
        let respuesta = ["Si", "No", "Tal vez", "Obvio", "Yo digo que si", "Yo digo que no", "Probablemente"]//aqui las probables respuestas que va a tener
        var random = respuesta[Math.floor(Math.random() * respuesta.length)]//aqui decimos que va a elegir una respuesta random de el let respuesta
      const embed = new Discord.MessageEmbed()//definimos el embed
      
      
      message.channel.send("Yo creo que " + random)
    }//cerramos
    

})
client.login(config.token);