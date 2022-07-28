const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const discordTTS = require("discord-tts"); // vamos a requerir del siguiente modulo, npm i discord-tts
const voiceChannel = message.member.voice.channel; // Una const para saber si el usuario entro a un canal de voz
const decir = args.join(' ') // Una const para definir lor argumentos a decir / escribir

let prefix = config.prefix;

client.on("ready", () => {
    console.log(`Toy listo`);
});

client.on("message", (message) => {
    if (message.author.bot) return;
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
    if(!voiceChannel) return message.channel.send('**<a:No:769884924995829800> | Entra a un canal de voz y vuelve a intentarlo.**') // Si la const voiceChannel es false retorna este mensaje

    if(message.content.startsWith(prefix+"decir")) return message.channel.send('**<a:No:769884924995829800> | ¿Que quieres que diga?**') // Si la const decir es false retorna este mensaje

    voiceChannel.join().then(connection => { 
        const stream = discordTTS.getVoiceStream(decir); // Hacemos una const para conectar con discord-tts y dentro ponemos >decir>(los argumentos que se escucharan) 
        const dispatcher = connection.play(stream);// Hacemos la conexion y lo reproducimos
        dispatcher.on("finish",()=>voiceChannel.leave())// Cuando finalize el tts el bot saldra automaticamente del canal
  })

});

client.login(config.token);
