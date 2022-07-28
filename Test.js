const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

let prefix = config.prefix;

client.on("ready", () => {
    console.log(`Toy listo ·w·`);
});

client.on("message", (message) => {
     const discordTTS = require("discord-tts"); // vamos a requerir del siguiente modulo, npm i discord-tts
     const voiceChannel = message.member.voice.channel; // Una const para saber si el usuario entro a un canal de voz
     const decir = args.join(' ') // Una const para definir lor argumentos a decir / escribir
    if(!voiceChannel) return message.channel.send('**<a:No:769884924995829800> | Entra a un canal de voz y vuelve a intentarlo.**') // Si la const voiceChannel es false retorna este mensaje

    if(message.content.startsWith(prefix+"decir")) return message.channel.send('**<a:No:769884924995829800> | ¿Que quieres que diga?**') // Si la const decir es false retorna este mensaje

    voiceChannel.join().then(connection => { 
        const stream = discordTTS.getVoiceStream(decir); // Hacemos una const para conectar con discord-tts y dentro ponemos >decir>(los argumentos que se escucharan) 
        const dispatcher = connection.play(stream);// Hacemos la conexion y lo reproducimos
        dispatcher.on("finish",()=>voiceChannel.leave())// Cuando finalize el tts el bot saldra automaticamente del canal
  })

});

client.login(config.token);                              
    



