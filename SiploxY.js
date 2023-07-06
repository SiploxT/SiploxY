const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const ms = require('ms');
const axios = require('axios');


let prefix = config.prefix;

client.on("ready", () => {
    console.log(`Toy listo ·w·`);
});

client.once('ready', () => { // setActivity ACTIVIDAD DE ESTADO
    client.user.setActivity('Prefix: s! || wawa ·w·', { type: 'PLAYING' });

});

const snipes = new Discord.Collection()   // VAR SNIPE

client.on('messageDelete', message => {     // VAR SNIPE 2
    snipes.set(message.channel.id, message)
    
})

client.on("messageDelete", async (deletedMessage) => {
    const { guild } = deletedMessage;
    const deletionLog = (await guild.fetchAuditLogs({ type: "MESSAGE_DELETE" })).entries.first();
    if (!deletionLog) return;
  
    const { executor } = deletionLog;
    console.log(`~${executor.username}~ ha borrado un mensaje en ~${guild.name}~ que decía: "${deletedMessage.content}" ·w·`);

});

client.on("message", async (message) => {
    let week = 0
    let days = 0
    if (message.author.bot) return;
	const args = message.content.trim().split(/ +/g);
    if(message.content.startsWith(prefix + 'help')) {

        const embedUtilidad = new Discord.MessageEmbed()
            .setTitle("Utilidad")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("PURPLE")
            .addField('Reminder (BETA)', 'Te recordará cualquier cosa que le pidas en el tiempo que le pidas.')
            .addField('Userinfo', 'Enviará toda la información posible del usuario mencionado.', true)
            .addField('Avatar', 'Enviará el avatar de el usuario mencionado', true)
            .addField('Serverinfo', 'Mostrará toda la información posible del servidor.')
            .addField('Servericon', 'Mostrará el icono del servidor en el que estes.', true)
            .addField('Rolinfo', 'Mostrará toda la información de el rol que menciones.', true)
            .addField('Roles', 'Mostrará todos los roles de el servidor en el que estes', true)
            .addField('Snipe', 'Enviará el contenido del ultimo mensaje que ha sido borrado en un guild', true)
            .addField('Ping', 'Comprobará la latencia de la API de Discord', true)
            .addField('Img (BETA)', 'Enviará una imagen de la busqueda que hagas.', true)

        const embedEntretenimiento = new Discord.MessageEmbed()
            .setTitle("Entretenimiento")
            .setColor("PURPLE")
            .addField('Say', 'Dirá lo que que tu escribas y borrará tu mensaje', true)
            .addField('Roulette', 'Tirará una ruleta entre las opciones que des, eligirá una de ellas.', true)
            .addField('8ball', 'Adivinará el futuro de la pregunta que hagas', true)
            .addField('Dado', 'Tirara un dado, te dará un numero del 1 al 6', true)
            .addField('Coinflip', 'Lanzará una monera y saldrá cara o cruz', true)
            .addField('Randomuser', 'Dirá el nombre de un usuario aleatorio del server', true)
            .addField('RandomCap (BETA)', 'Enviará una captura aleatoria tomada por un usuario cualquiera.', true)

        const embedImagenes = new Discord.MessageEmbed()
            .setTitle("Imagenes")
            .setColor("PURPLE")
            .addField('Capybara', 'Enviará imagenes aleatorias de Capybaras', true)
            .addField('Neko', 'Enviará imagenes aleatorias de nekos ·w·', true)
            .addField('Cat', 'Enviará imagenes aleatorias de gatos ￣ω￣', true)
            .addField('SadCat', 'Enviará imagenes aleatorias de gatos tristes', true)
            .addField('Dog', 'Enviará imagenes aleatorias de perros', true)

        const embedInteracción = new Discord.MessageEmbed()
            .setTitle("Interacción")
            .setColor("PURPLE")
            .addField('Pat', 'Acariciarás a la persona que menciones', true)
            .addField('Cuddle', 'Te acurrucarás con las personas que menciones', true)
            .addField('Hug', 'Abrazás a  la  persona que menciones', true)
            .addField('Kiss', 'Besarás a la persona que menciones **o.o**', true)
            .addField('Dance', 'Hará que bailes', true)
            .addField('Slap', 'Le darás una bofetada a la persona que menciones', true)
            .addField('Punch', 'Le darás un golpe a las persona que menciones', true)
            .addField('Kill', 'Matarás a la persona que menciones', true)

        const embedEmoción = new Discord.MessageEmbed()
            .setTitle('Emociones')
            .setColor("PURPLE")
            .addField('Blush', 'Empezarás a sonrojarte', true)
            .addField('Happy', 'Mostrarás lo feliz que estas ^-^', true)
            .addField('Suprise', 'Expresarás como de sorprendido estás ◉_◉')
            .addField('Neutral', '..Úsalo cuando no tengas nada que decir.')
            .addField('Sleepy', 'Mostrarás el sueño que tienes', true)
            .addField('Disgust', 'Enseñarás los disgustado que estas ＞︿＜')
            .addField('Angry', 'Te enfadarás.')
            .addField('Confused', 'Mostrarás tu confusión (。_。)')
            .addField('Fear', 'Expresa lo asustado que es-estas... o((⊙﹏⊙))o.')
            .addField('Cry', 'Te echarás a llorar unu', true)
            .setFooter("~~ s!botinfo para ver mas información del bot ~~")

        message.author.send(embedUtilidad)
        message.author.send(embedEntretenimiento)
        message.author.send(embedImagenes)
        message.author.send(embedInteracción);
        message.author.send(embedEmoción)

        message.channel.send("Te he mandado un mensaje con todos los comandos a tu md ·w·")
                                                                   
    }
    // EMOTES ♥ ♥ ♥ //
    // EMOTES ♥ ♥ ♥ // 
    let emotes = ["·w·", "(p≧w≦q)", "o((>ω< ))o", "( •̀ ω •́ )✧", "ヾ(•ω•`)o", "(^人^)", "(。・ω・。)", "(★ ω ★)", "(^._.^)ﾉ", "(*/ω＼*)", "＞﹏＜", "(lll￢ω￢)", "つ﹏⊂"] 
    var msgEmote = emotes[Math.floor(Math.random() * emotes.length)]
    // COMANDOS DE UTILIDAD ♥ ♥ ♥ //
    // COMANDOS DE UTILIDAD ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "botinfo")) {
        let uptime = ``;
        let totalS = (client.uptime / 1000);
        let HRS = Math.floor(totalS / 3600);
        totalS %= 3600;
        let MINS = Math.floor(totalS / 60);
        let SEC = Math.floor(totalS % 60);

        if(HRS > 23){
            days = days + 1;
            hours = 0;
        }

        if(days == 7){
            days = 0;
            week = + 1;
        }

        if(week > 0){
            uptime += `${week} week`;
        }

        if(MINS > 60){
            MINS = 0;
        }

        uptime += `${days} Dias, ${HRS} Horas, ${MINS} Minutos ${SEC} Segundos`;


        const embedInfo = new Discord.MessageEmbed()
        .setAuthor("SiploxY", client.user.avatarURL())
        .setThumbnail(client.user.avatarURL())
        .addField("Developer: ", `siploxT#2805`)
        .addField("Servers: ", ` ${client.guilds.cache.size}`)
        .addField("Usuarios: ", ` ${client.users.cache.size}`)
        .addField("Uptime: ", ` ${uptime}` )
        .addField("Ram: ", ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        .addField("Libreria: ", "discord.js@14.8.0")
        .setColor("PURPLE")

        message.channel.send(embedInfo)
    }
    if (message.content.startsWith(prefix + "reminder")) {
        const argsReminder = message.content.slice(prefix.length).trim().split(/ +/);
        const time = argsReminder[1];
        const textReminder = argsReminder.slice(2).join(' ');

        message.channel.send(`Entendido, te lo recordaré dentro de **${time}**.`)
    
        setTimeout(() => {
            message.channel.send(`${message.author}: Recuerda hacer lo siguiente - ${textReminder}.`);
            message.channel.send(`Me has pedido recordarte esto hace: ${time}`)
        }, ms(time));
    }
    if (message.content.startsWith(prefix + "userinfo")) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.member(user);
    
        const userRoles = member.roles.cache
            .filter(role => role.id !== message.guild.id)
            .map(role => role.name).join(`, `);
    
        const joinDate = member.joinedAt.toDateString();
    
        const userinfoEmbed = new Discord.MessageEmbed()
            .setThumbnail(user.displayAvatarURL())
            .setTitle(`Información de ~${user.username} ~ - ${msgEmote}`)
            .addField(`Id de usuario`, `- ${user.id}`)
            .addField(`Fecha de unión al servidor`, `- ${joinDate}`)
            .addField(`Roles`, `- ${userRoles}`)
            .setColor("PURPLE")
    
        message.channel.send(userinfoEmbed);
    }
    if(message.content.startsWith(prefix + "avatar") || message.content.startsWith(prefix + "a")) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let avatar = user.user.displayAvatarURL({ dynamic: true, size: 2048})
   
        const embedAvatar = new Discord.MessageEmbed()
   
        .setDescription("**Avatar de** <@" + user + "> **:** " )
        .setColor("RANDOM")
        .setImage(avatar)
   
        message.channel.send(embedAvatar)
}
    if(message.content.startsWith(prefix + "serverinfo")) {
        const server = message.guild // Info del server
        // ↓↓↓ Cantidad de Usuarios
        const totalBots = server.members.cache.filter(member => member.user.bot).size;
        const totalMembers = server.memberCount
        const totalUsers = totalMembers - totalBots
        // ↓↓↓ Estado de los Usuarios
        const onlineMembers = server.members.cache.filter(member => member.presence.status === 'online').size;
        const idleMembers = server.members.cache.filter(member => member.presence.status === 'idle').size;
        const dndMembers = server.members.cache.filter(member => member.presence.status === 'dnd').size;
        const offlineMembers = server.members.cache.filter(member => member.presence.status === 'offline').size;
        // ↓↓↓ Cantidad de Canales
        const totalChannels = server.channels.cache.size;
        const textChannels = server.channels.cache.filter(channel => channel.type === 'text').size;
        const voiceChannels = server.channels.cache.filter(channel => channel.type === 'voice').size;
        const threadChannels = server.channels.cache.filter(channel => channel.type === 'thread').size;
        // ↓↓↓ Nivel de Verificación
        const verificationLevel = server.verificationLevel;
        // ↓↓↓ Icono del Servidor
        let icon = message.guild.iconURL({size : 2048, dyamic : true})
        // ↓↓↓ Nivel de Verificación
        function getVerificationLevelText(level) {
            switch (level) {
              case 'NONE':
                return 'Ninguno';
              case 'LOW':
                return 'Bajo';
              case 'MEDIUM':
                return 'Medio';
              case 'HIGH':
                return 'Alto';
              case 'VERY_HIGH':
                return 'Muy alto';
              default:
                return 'Desconocido';
            }
        }

        const embedServer = new Discord.MessageEmbed()
        .setTitle(`Información del server - ${msgEmote}`)
        .setDescription(`**Nombre:** ${server.name}\n**ID:** ${server.id}`)
        .setThumbnail(icon)
        .addField('__Usuarios__', `- Total: ${totalMembers}\n- Usuarios: ${totalUsers}\n- Bots: ${totalBots}`)
        .addField('__Estados de los Usuarios__', `- En línea: ${onlineMembers}\n- Ausente: ${idleMembers}\n- No molestar: ${dndMembers}\n- Desconectado: ${offlineMembers}`)
        .addField('__Canales__', `- Total: ${totalChannels}\n- Texto: ${textChannels}\n- Voz: ${voiceChannels}\n- Hilos: ${threadChannels}`)
        .addField('__Nivel de Verificación__', `- ${getVerificationLevelText(verificationLevel)}`)
        .setFooter(`Región: ${server.region}`)
        .setColor('PURPLE');

        message.channel.send(embedServer)
    
    }
    if(message.content.startsWith(prefix + "servericon")) {
        let icon = message.guild.iconURL({size : 2048, dyamic : true})
        let id = message.guild;

        const embedIcon = new Discord.MessageEmbed()
        
        .setTitle("El icono de " + message.guild.name + " es:")
        .setColor("RANDOM")
        .setImage(icon)

        message.channel.send(embedIcon)
    }
    if(message.content.startsWith(prefix + "rolinfo")) {
        const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if(!rol) return message.channel.send(`Tienes que mencionar un rol para que pueda enseñarte su información. ${msgEmote}`)

        let mencionable = {
            'true': 'Si',
            'false': 'No'
        }
        let separado = {
            'true': 'Si',
            'false': 'No'
        }
        let sistema = {
            'true': 'Si',
            'false': 'No'
        }

        const permisos = rol.permissions.toArray().join('\`, \`');

        const rolEmbed = new Discord.MessageEmbed()
        .setDescription(`**Información del rol - ${msgEmote}**`)
        .addField("Nombre:", `- ${rol.name}`)
        .addField("ID:", `- ${rol.id}`)
        .addField("Usuarios con el rol:", `- ${rol.members.size}`)
        .addField("Posición:", `- ${rol.rawPosition}`)
        .addField("HexColor:", `- ${rol.hexColor}`)
        .addField("Mencionable:", `- ${mencionable[rol.mentionable]}` )
        .addField("Separado:", `- ${separado[rol.hoist]}`)
        .addField("Gestionado por el sistema:", `- ${sistema[rol.managed]}`)
        .addField("Permisos:", `- \`${permisos}\``)
        .setColor(rol.hexColor)

        message.channel.send(rolEmbed)


    }
    if(message.content.startsWith(prefix + "roles")) {
        let icon = message.guild.iconURL({size : 2048, dyamic : true})
        let id = message.guild;
         const embedRoles = new Discord.MessageEmbed()
         .setColor("PURPLE")
         .setTitle(`Roles de ~${id.name} ~`)
         .setThumbnail(icon)
         .setDescription(`${id.roles.cache.map(r => r.name).join(", ")}`)
         .setFooter('Lista de roles de '+ message.guild.name);
    
        message.channel.send(embedRoles);
    
    }
    if(message.content.startsWith(prefix + "snipe")) {
        let snipe = snipes.get(message.channel.id)
        if(!snipe) return message.channel.send('No hay ningún mensaje borrado al que hacerle snipe unu')

        const embedSnipe = new Discord.MessageEmbed()
        .setAuthor(`Mensaje borrado por ${snipe.author.username}`, snipe.author.displayAvatarURL())
        .setColor("PURPLE")
        .setDescription(snipe.content)
        .setTimestamp(snipe.createdAt);
        message.channel.send(embedSnipe)

    }
    if(message.content.startsWith(prefix + "ping")) {
        message.channel.send(`La latencia del API de Discord es de **${Math.round(client.ws.ping)}ms.**. ${msgEmote}`);

    }
    if (message.content.startsWith(prefix + 'img')) {
        const query = message.content.slice(5);
        const image_url = await getRandomImage(query);
    
        if (image_url) {
          const imgEmbed = new Discord.MessageEmbed()
            .setTitle(`Imagen de${query}`)
            .setImage(image_url)
            .setColor("RANDOM");
    
          message.channel.send(imgEmbed);
        } else {
          message.channel.send(`No se encontraron imágenes acerca de${query}.`);
        }
}
async function getRandomImage(query) {
    const searchQuery = encodeURIComponent(query);
    const url = `https://www.google.com/search?q=${searchQuery}&tbm=isch&tbs=isz:l`;
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const html = await response.text();
        const $ = cheerio.load(html);
        const images = $('img[src^="http"]').map((index, element) => $(element).attr('src')).get();
        if (images.length > 0) {
          const randomIndex = Math.floor(Math.random() * images.length);
          return images[randomIndex];
        }
      }
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
    return null;
}
    // COMANDOS DE ENTRETENIMIENTO ♥ ♥ ♥ //
    // COMANDOS DE ENTRETENIMIENTO ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "say")) {
     const args = message.content.slice(5)
     if(!args) return message.channel.send(`Necesitas poner algo para que pueda decirlo. ${msgEmote}`)

     message.channel.send(args)

     message.delete()
    }
    if(message.content.startsWith(prefix + "roulette")) {
        const opciones = message.content.slice(11).split(',').map(option => option.trim());
        const randomopciones = Math.floor(Math.random() * opciones.length);
        const selectedopciones = opciones[randomopciones];

        message.channel.send(`La ruleta ha hablado... **¡${selectedopciones}!**`)
    }
    if(message.content.startsWith(prefix + "8ball")) {
        const args = message.content.slice(7)
        if(!args) return message.channel.send(`Necesitas preguntarme algo para que pueda responderte ${msgEmote}`)
        let respuesta = ["Sis", "Non", "Puede ser", "Es lo mas probable", "Las probabilidades son bajas", "No lo creo", "Definitivamente.", "Definitivamente no."  ]
        var random = respuesta[Math.floor(Math.random() * respuesta.length)]


        message.channel.send(random)
    }
    if(message.content.startsWith(prefix + "dado")) {
        let respuestadado = ["🎲 ¡Te ha salido un **1**!", "🎲 ¡Te ha salido un **2**!", "🎲 ¡Te ha salido un **3**!", "🎲 ¡Te ha salido un **4**!", "🎲 ¡Te ha salido un **5**!", "🎲 ¡Te ha salido un **6**!"]
        var randomdado = respuestadado[Math.floor(Math.random() * respuestadado.length)]
      
      message.channel.send(randomdado)
    }
    if(message.content.startsWith(prefix + "coinflip")) {
        let respuestacoin = [":coin: ¡Te ha salido **cara**! :coin: ", ":coin: ¡Te ha salido **cruz**! :coin: "]
        var randomcoin = respuestacoin[Math.floor(Math.random() * respuestacoin.length)]

      message.channel.send(randomcoin)
    }
    if (message.content.startsWith(prefix + "randomuser") || message.content.startsWith(prefix + "ru")) {
        const randomMember = message.guild.members.cache.random();

        const embedRandomUser = new Discord.MessageEmbed()
          .setTitle("__**" + randomMember.user.username + "**__")
          .setThumbnail(randomMember.user.avatarURL())
          .setDescription("Status: " + "*" + randomMember.presence.status + "*")
          .setColor("RANDOM");

        message.channel.send(embedRandomUser);
    }
    if (message.content.startsWith(prefix + "randomcap") || message.content.startsWith(prefix + "rc")) {
        
        function generateRandomCharacters(length) {
          let result = '';
          const alphabet = 'abcdefghijklmnopqrstuvwxyz';
          const numbers = '0123456789';
      
          for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            result += alphabet.charAt(randomIndex);
          }
      
          for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            result += numbers.charAt(randomIndex);
          }
      
          return result;
        }
      
        const prnt = 'https://prnt.sc/';
        const randomCharacters = generateRandomCharacters(6);
        const link = prnt + randomCharacters;

        const rcEmbed = new Discord.MessageEmbed()
        .setTitle(`Captura aleatoria ${msgEmote}`)
        .setImage()
        .setFooter(link)
      
        message.channel.send(link);

    }
    // COMANDOS DE IMAGENES ♥ ♥ ♥ //
    // COMANDOS DE IMAGENES ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "capybara")) {
        var capy = ["capybara ?!", "capybara !  !! !", "^__^", "coconut doggy", "o my gosh", "cappy blappy"]
        var capyrandom = capy[Math.floor(capy.length * Math.random())]
        const { MessageEmbed } = require("discord.js")

        fetch(`https://api.animality.xyz/img/capybara`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle(capyrandom)
            .setImage(body.link)
            .setColor("GREEN")
            message.channel.send(embed)
        })
    }
    if(message.content.startsWith(prefix + "neko")) {
        const { MessageEmbed } = require("discord.js")


        fetch(`http://api.nekos.fun:8080/api/neko`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle('Toma una neko ·w·')
            .setImage(body.image)
            .setColor("PURPLE")
            message.channel.send(embed)
        })


    }
    if(message.content.startsWith(prefix + "cat")) {
        const { MessageEmbed } = require("discord.js")
   
   
        fetch(`https://api.alexflipnote.dev/cats`)
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
    if(message.content.startsWith(prefix + "sadcat")) {
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
    if(message.content.startsWith(prefix + "dog")) {
        const { MessageEmbed } = require("discord.js")


     fetch(`https://api.alexflipnote.dev/dogs`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle('Doggy')
            .setImage(body.file)
            .setColor("PURPLE")
            message.channel.send(embed)
        })
    }
    // COMANDOS DE INTERACCIÓN ♥ ♥ ♥ //
    // COMANDOS DE INTERACCIÓN ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "pat")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a alguien para poder acariciarlo. ${msgEmote}`)
        var respuestapat = ["https://c.tenor.com/Y7B6npa9mXcAAAAC/rikka-head-pat-pat-on-head.gif", "https://c.tenor.com/E6fMkQRZBdIAAAAC/kanna-kamui-pat.gif", "https://c.tenor.com/8DaE6qzF0DwAAAAC/neet-anime.gif", "https://c.tenor.com/i7nXGbPLqTsAAAAC/anime-hug.gif", "https://c.tenor.com/kM1mVaXE8Y8AAAAC/kaede-azusagawa-kaede.gif", "https://c.tenor.com/TRxNL32jtEIAAAAC/anime-pat.gif", 
        "https://c.tenor.com/8o4fWGwBY1EAAAAd/aharensan-aharen.gif", "https://c.tenor.com/jEfC8cztigIAAAAC/anime-pat.gif", "https://c.tenor.com/lOawy4d-SHMAAAAd/anime-cuddle-gauge.gif", "https://c.tenor.com/VzJtkXVo06wAAAAC/yuru-yuri-anime.gif", "https://c.tenor.com/Jj-vHGZOgT4AAAAC/anime-anime-girl.gif", "https://c.tenor.com/jBuHEbqxarcAAAAC/k-on-anime.gif"]
        let randompat = respuestapat[Math.floor(respuestapat.length * Math.random())]

        const embedpat = new Discord.MessageEmbed() 
        .setTitle("")
        .setDescription('**' + user + '**' + ' acarició a **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randompat)

        message.channel.send(embedpat);
    }
    if(message.content.startsWith(prefix + "cuddle")) {                                                                                         
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a alguien para poder acurrucarte con el ${msgEmote}`)
        var respuestacuddle = ["https://c.tenor.com/doc8uMAT5ssAAAAC/anime-love.gif", "https://c.tenor.com/wwd7R-pi7DIAAAAC/anime-cuddle.gif", "https://c.tenor.com/s44ige0diLYAAAAC/sanriokill-anime.gif", "https://c.tenor.com/ItpTQW2UKPYAAAAC/cuddle-hug.gif", "https://c.tenor.com/2VVGNLi-EV4AAAAC/anime-cute.gif", "https://c.tenor.com/gowinK__PvAAAAAC/anime-cuddle.gif", "https://c.tenor.com/8BqG6yTLCLEAAAAC/anime.gif",
        "https://c.tenor.com/WWgamF4xjZcAAAAC/anime-cuddle.gif", "https://c.tenor.com/y9_xxO9iMwkAAAAC/hug.gif", "https://c.tenor.com/hGUWkkHB_DQAAAAC/cuddle-anime.gif", "https://c.tenor.com/b3Qvt--s_i0AAAAC/hugs.gif", "https://c.tenor.com/NaJIRcVnWloAAAAd/sao-sword-art-online.gif", "https://c.tenor.com/XLWytMsrNy8AAAAC/kaioura-anime-girl.gif", "https://c.tenor.com/Fld0jbqWpDsAAAAC/gochuumon-wa-usagi-desuka-is-the-order-a-rabbit.gif"]
        let randomcuddle = respuestacuddle[Math.floor(respuestacuddle.length * Math.random())]

        const embedcuddle = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' se acurrucó con **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randomcuddle)

        message.channel.send(embedcuddle);
    }
    if(message.content.startsWith(prefix + "hug")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a alguien para poder abrazarlo. ${msgEmote} `)
        var respuestahug = ["https://c.tenor.com/kCZjTqCKiggAAAAC/hug.gif", "https://c.tenor.com/fklZNDaU9NMAAAAC/hideri-hideri-kanzaki.gif", "https://c.tenor.com/gqM9rl1GKu8AAAAC/kitsune-upload-hug.gif", "https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif", "https://c.tenor.com/8Jk1ueYnyYUAAAAC/hug.gif", "https://c.tenor.com/gKlGEBBkliwAAAAC/anime-yuru-yuri.gif", "https://c.tenor.com/XKJwFX9B_DUAAAAC/hug.gif",
        "https://c.tenor.com/vpE5_F_oqmsAAAAC/run-hug-hug.gif", "https://c.tenor.com/-0nQoPY5sZ0AAAAC/anime-hug-hug.gif", "https://c.tenor.com/we1trpFB2F0AAAAC/neko-hug.gif", "https://c.tenor.com/4D5jSREXInMAAAAd/anime-couple-hug.gif", "https://c.tenor.com/QTbBCR3j-vYAAAAd/hugs-best-friends.gif", "https://c.tenor.com/yc_shX2Xl_QAAAAd/girl-anime.gif", "https://c.tenor.com/TJuvig1CFBQAAAAM/the-pet-girl-of-sakurasou-sakurasou-no-pet-na-kanojo.gif" ]
        let randomhug = respuestahug[Math.floor(respuestahug.length * Math.random())]

        const embedhug = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' abrazó a **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randomhug)

        message.channel.send(embedhug);
    }
    if(message.content.startsWith(prefix + "kiss")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a alguien para poder besarlo. ${msgEmote}`)
        var respuestabeso = ["https://c.tenor.com/fiafXWajQFoAAAAC/kiss-anime.gif", "https://c.tenor.com/riftr5iWqZQAAAAC/xdd.gif", "https://c.tenor.com/OjcDtiEDUvMAAAAC/friendly-kiss.gif", "https://c.tenor.com/Fyq9izHlreQAAAAC/my-little-monster-haru-yoshida.gif", "https://c.tenor.com/jN35LrknUpkAAAAC/test.gif", "https://c.tenor.com/9jB6M6aoW0AAAAAC/val-ally-kiss.gif", "https://c.tenor.com/wQyttVAvkF0AAAAd/forehead-kiss-anime.gif", "https://c.tenor.com/NO6j5K8YuRAAAAAC/leni.gif", "https://c.tenor.com/yoMKK29AMQsAAAAC/kiss-toradora.gif", 
        "https://c.tenor.com/dn_KuOESmUYAAAAC/engage-kiss-anime-kiss.gif", "https://c.tenor.com/vhuon7swiOYAAAAC/rakudai-kishi-kiss.gif", "https://c.tenor.com/YeitcPAdSCYAAAAd/kyo-x-tohru-kiss.gif", "https://c.tenor.com/g9HjxRZM2C8AAAAd/anime-love.gif", "https://c.tenor.com/nRdyrvS3qa4AAAAC/anime-kiss.gif"]
        var randombeso = respuestabeso[Math.floor(respuestabeso.length * Math.random())]

        const embedkiss = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' ha besado a **<@' + ment + '>** o.o')
        .setColor("PURPLE")
        .setImage(randombeso)

        message.channel.send(embedkiss);
    }
    if(message.content.startsWith(prefix + "dance")) {
        let user = message.author.username;
        var respuestadance = ["https://c.tenor.com/YNHT2hPxGawAAAAd/happy-birthday.gif", "https://c.tenor.com/LP6rGpITvlsAAAAd/chill.gif", "https://c.tenor.com/QwNUEvvKxY8AAAAd/happy-loli.gif", "https://c.tenor.com/U8WV2zeMLBEAAAAC/anime-dancing.gif", "https://c.tenor.com/1WtAgS78CB0AAAAd/duck-dance.gif", "https://c.tenor.com/8W8rOwe8XCEAAAAd/dance-anime.gif", "https://c.tenor.com/ysPVGNGfWBcAAAAC/anime-dance-happy.gif",
        "https://c.tenor.com/GYjYgE-UCEgAAAAd/shinobu-kocho-dance.gif", "https://c.tenor.com/V8gBHFz-5mgAAAAC/kanna-kamui-kanna-dance.gif", "https://c.tenor.com/leneA9CzXlUAAAAC/dandidave-anime.gif", "https://c.tenor.com/_UMScn4rrGcAAAAC/dandidave-wave.gif", "https://c.tenor.com/gQ5iadXLfnQAAAAC/daisuke-dance.gif", "https://c.tenor.com/3Mc4IqoPAxAAAAAd/anime-dance.gif", "https://c.tenor.com/0w22pJMgugkAAAAC/hatsune-miku-dancing.gif", "https://c.tenor.com/K7GNv-vxewEAAAAM/hatsune-miku-vocaloid.gif" ]
        let randomdance = respuestadance[Math.floor(respuestadance.length * Math.random())]

        const embeddance = new Discord.MessageEmbed() 
        .setTitle("")
        .setDescription('**' + user + '** está bailando')
        .setColor("PURPLE")
        .setImage(randomdance)

        message.channel.send(embeddance);
    }
    if(message.content.startsWith(prefix + "slap")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a la persona que quieras abofetear. ${msgEmote}`)
        var respuestaslap = ["https://c.tenor.com/XiYuU9h44-AAAAAC/anime-slap-mad.gif", "https://c.tenor.com/LUJRVpYgy-8AAAAC/kiniro-kiniro-mosaic.gif", "https://c.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif", "https://c.tenor.com/PeJyQRCSHHkAAAAC/saki-saki-mukai-naoya.gif", "https://c.tenor.com/rVXByOZKidMAAAAd/anime-slap.gif", "https://c.tenor.com/eU5H6GbVjrcAAAAM/slap-jjk.gif", "https://c.tenor.com/L0fsdBYmh_wAAAAC/kokoro-connect-slap-anime.gif",
        "https://c.tenor.com/pgq_YsVX7sEAAAAC/meliodas-seven-deadly-sins.gif", "https://c.tenor.com/UDo0WPttiRsAAAAM/bunny-girl-slap.gif", "https://c.tenor.com/E3OW-MYYum0AAAAC/no-angry.gif", "https://c.tenor.com/iDdGxlZZfGoAAAAC/powerful-head-slap.gif", "https://c.tenor.com/Sp7yE5UzqFMAAAAC/spank-slap.gif", "https://c.tenor.com/FrEq8y-Qf78AAAAC/anime-slapping.gif", "https://c.tenor.com/CvBTA0GyrogAAAAC/anime-slap.gif", "https://c.tenor.com/2-r7BEc-cb8AAAAC/slap-smack.gif",
        "https://c.tenor.com/hscOq_sMFdAAAAAM/kakashi-zabuza.gif", "https://media.tenor.com/TaGqZmYEWWQAAAAd/metal-gear-rising.gif", "https://c.tenor.com/yl9kMAB2pHYAAAAC/slap.gif", "https://c.tenor.com/743sV2IWMEAAAAAC/chuunibyou-demo-koi-ga-shitai-anime.gif", "https://c.tenor.com/OuYAPinRFYgAAAAC/anime-slap.gif", "https://c.tenor.com/469w9za-5a0AAAAC/anime.gif", "https://c.tenor.com/Lc7C5mLIVIQAAAAC/anime-slap.gif", "https://c.tenor.com/vzQLL0MsF0cAAAAC/darkelfcarla-windmill.gif"]
        var randomslap = respuestaslap[Math.floor(respuestaslap.length * Math.random())]

        const embedslap = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' le ha dado una bofetada a **<@' + ment + '>**')
        .setColor("PURPLE")
        .setImage(randomslap)

        message.channel.send(embedslap);
    }
    if(message.content.startsWith(prefix + "punch")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a la persona que quieras pegar. ${msgEmote}`)
        var respuestapunch = ["https://c.tenor.com/SwMgGqBirvcAAAAC/saki-saki-kanojo-mo-kanojo.gif", "https://c.tenor.com/BoYBoopIkBcAAAAC/anime-smash.gif", "https://c.tenor.com/UH8Jnl1W3CYAAAAC/anime-punch-anime.gif", "https://c.tenor.com/EdV_frZ4e_QAAAAC/anime-naruto.gif", "https://c.tenor.com/o8RbiF5-9dYAAAAM/killua-hxh.gif", "https://c.tenor.com/ObgxhbfdVCAAAAAd/luffy-anime.gif", "https://c.tenor.com/5AsLKQTjbJ4AAAAC/kasumi-love-live.gif", "https://c.tenor.com/YTVzMpGOKLwAAAAd/spy-x-family-anya-forger.gif", 
        "https://c.tenor.com/2VSFzXr7oTgAAAAC/kofune-ushio.gif", "https://c.tenor.com/6a42QlkVsCEAAAAM/anime-punch.gif", "https://c.tenor.com/5PyqOsngA00AAAAM/boku-no-hero-academia-my-hero-academia.gif", "https://c.tenor.com/xWqmJMePsqEAAAAM/weaboo-otaku.gif", "https://c.tenor.com/laW-dCBdPUgAAAAM/dragon-ball-super-goku.gif", "https://c.tenor.com/aEX1wE-WrEMAAAAC/anime-right-in-the-stomach.gif", "https://c.tenor.com/DKMb2QPU7aYAAAAC/rin243109-blue-exorcist.gif", "https://c.tenor.com/6Pzqw0wz28QAAAAC/shiki-granbell-shiki.gif", "https://c.tenor.com/1T5bgBYtMgUAAAAC/head-hit-anime.gif"]
        let randompunch = respuestapunch[Math.floor(respuestapunch.length * Math.random())]

        const embedpunch = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' le ha pegado a **<@' + ment + '>**')
        .setColor("PURPLE")
        .setImage(randompunch)

        message.channel.send(embedpunch);
    }
    if(message.content.startsWith(prefix + "kill")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a la persona que quieras matar ${msgEmote}`)
        var respuestakill = ["https://c.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif", "https://c.tenor.com/Ds187JeCgckAAAAC/animehit-fugirl.gif", "https://c.tenor.com/Ze50E1rW44UAAAAd/akudama-drive.gif", "https://c.tenor.com/t-0fYVPgg1YAAAAC/pink-hair-anime.gif", "https://c.tenor.com/AGTqt-wXyiEAAAAC/nichijou-minigun.gif", "https://c.tenor.com/Mn4W4D899WEAAAAC/ira-gamagoori-attack.gif", "https://c.tenor.com/bznBkYdhexcAAAAC/fire-arm-fire.gif", 
        "https://c.tenor.com/hkeM4Uie0bcAAAAd/anime-lick-anime-yandere.gif", "https://c.tenor.com/WxLl5mre8pYAAAAd/anime-kill.gif", "https://c.tenor.com/nTEMMozvRwIAAAAd/basil-basil-dies.gif", "https://c.tenor.com/wikodIpaz8oAAAAC/omori-basil.gif", "https://c.tenor.com/G9tCUL5OBcYAAAAC/stab-knife.gif", "https://c.tenor.com/FkxPkj7NOrQAAAAd/akame-akame-of-demon-sword-murasame.gif", "https://c.tenor.com/PFndSfQcmRUAAAAd/anime-kill.gif", "https://c.tenor.com/piK8t2UxKZMAAAAC/edward-elric-punch.gif", "https://c.tenor.com/ECYDNFQJHGgAAAAd/hk416-threat.gif", "https://c.tenor.com/6525cG5E7oQAAAAd/anime-kill-kill.gif",
        "https://c.tenor.com/yWEfaRb2Ly8AAAAd/jojo-meme.gif", "https://c.tenor.com/dq5TwO6YPpAAAAAd/giorno-giovanna-muda-muda-muda.gif"]
        let randomkill = respuestakill[Math.floor(respuestakill.length * Math.random())]

        const embedkill = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' ha matado a **<@' + ment + '>**')
        .setColor("PURPLE")
        .setImage(randomkill)

        message.channel.send(embedkill)
    }
    // COMANDOS DE EMOCIONES ♥ ♥ ♥ //
    // COMANDOS DE EMOCIONES ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "blush")) {
        let user = message.author.username;
        var respuestablush = ["https://media.tenor.com/FRunV08QBXwAAAAd/sumi-sakurasawa-rent-a-girlfriend.gif", "https://media.tenor.com/GiOGySHeERMAAAAC/anime-blush.gif", "https://media.tenor.com/CEkiOjpsylwAAAAd/kitagawa-kitagawa-marin.gif", "https://media.tenor.com/T51BLj_Cj8cAAAAC/blush.gif", "https://media.tenor.com/wJm0MKvI6fkAAAAd/shy-blush.gif", "https://media.tenor.com/1Dtt5RPYfu0AAAAC/anime-blush.gif", "https://media.tenor.com/daIZ-e7VvkwAAAAd/anime-blush.gif",
        "https://media.tenor.com/30a9CPebaZoAAAAC/koiseka-anime-blush.gif", "https://media.tenor.com/-AkkTCm1Y8IAAAAC/flushed.gif", "https://media.tenor.com/ESCuELwXI58AAAAC/umaru-channnn-blush.gif", "https://media.tenor.com/KDPRHWcjUY8AAAAC/yeison.gif", "https://media.tenor.com/EpHViZYIWVQAAAAC/miss-kuroitsu-anime-blush.gif", "https://media.tenor.com/bEes0xCurvMAAAAC/anime-blush-dizzy.gif", "https://media.tenor.com/g8azBMokn4gAAAAC/koiseka-anime-blush.gif", "https://media.tenor.com/9i3ivLGn68YAAAAM/anime-blush.gif", "https://media.tenor.com/bCULNdEPzU0AAAAC/blushing-anime-anime-girl.gif", 
        "https://media.tenor.com/7KaaBzVxAdAAAAAC/rpg-fudousan-anime-blush.gif", "https://media.tenor.com/wzG1wiC7d74AAAAC/anime-sonrojo.gif", "https://media.tenor.com/yKtYfA0mizYAAAAC/my-dress-up-darling-anime-blush.gif", "https://media.tenor.com/CSdDnG_7HN4AAAAC/anime-blush-sakuhubtwt.gif", "https://media.tenor.com/CSdDnG_7HN4AAAAC/anime-blush-sakuhubtwt.gif", "https://media.tenor.com/58lwQm_4AzoAAAAC/shake-no.gif", "https://media.tenor.com/DO_gjRXkeU4AAAAM/glasses-denkigainohonyasan.gif", "https://media.tenor.com/Ly58nyHo0o0AAAAC/anime-relife.gif", "https://media.tenor.com/F4eUZjxs_VgAAAAC/gabriel-dropout.gif"]
        let randomblush = respuestablush[Math.floor(respuestablush.length * Math.random())]

        const embedblush = new Discord.MessageEmbed()
        .setDescription(`**${user}** acaba de sonrojarse o(≧∀≦)o`)
        .setColor("PURPLE")
        .setImage(randomblush)

        message.channel.send(embedblush)
    }
    if(message.content.startsWith(prefix + "happy")) {
        let user = message.author.username;
        var respuestahappy = ["https://media.tenor.com/VrUxJZFdmIsAAAAC/anime-excited.gif", "https://media.tenor.com/myCsjxxbtXAAAAAC/anime-happy.gif", "https://media.tenor.com/z88st-CKXoUAAAAM/chika-yeah.gif", "https://media.tenor.com/g8rtlSwFcdEAAAAd/slow-loop-koharu-minagi.gif", "https://media.tenor.com/EbNeN8Sf8QwAAAAC/umaru-hyper.gif", "https://media.tenor.com/ruU09sGPcCwAAAAd/happy-anime.gif", "https://media.tenor.com/U1p83COiAPYAAAAC/anime-happy-anime-smile.gif", "https://media.tenor.com/PdmxWTNnUmMAAAAC/anime-pastel-anime.gif", "https://media.tenor.com/nBWlYPbKxzwAAAAC/anime-happy.gif",
        "https://media.tenor.com/wFtRdoHX-ssAAAAM/dance-happy.gif", "https://media.tenor.com/IaZLfsFCcXYAAAAC/happy-anime.gif", "https://media.tenor.com/gDmWTiOVQWgAAAAC/anime-girl-anime-blush.gif", "https://media.tenor.com/gRKru3THlwEAAAAC/dance-happy.gif", "https://media.tenor.com/2nvCQF2f_CkAAAAC/anime-excited.gif", "https://media.tenor.com/J5LExU-5d5IAAAAC/excited-anime.gif", "https://media.tenor.com/Rm4OcZRX-t4AAAAC/anime-taisho-otome-fairy-tale.gif", "https://media.tenor.com/Z4vXY2p1MfoAAAAC/anime-happy-anime-excited.gif", "https://media.tenor.com/G9sGj8ccKlwAAAAC/anime-tama.gif", "https://media.tenor.com/mSWD-MGgfjMAAAAC/anime-love.gif",
        "https://media.tenor.com/yASBwuAbiMwAAAAC/k-on-yui.gif", "https://media.tenor.com/C-4eLcs8WvwAAAAC/dandidave-anime.gif", "https://media.tenor.com/00ZUfBZQtYgAAAAd/animehappy-animejump.gif", "https://media.tenor.com/Qrsl__S64NAAAAAC/chiyo-happy.gif", "https://media.tenor.com/EWartg4MlxoAAAAM/anime-maid.gif", "https://media.tenor.com/WaoSXVPfPxQAAAAC/miku-dance.gif"]
        let randomhappy = respuestahappy[Math.floor(respuestahappy.length * Math.random())]

        const embedhappy = new Discord.MessageEmbed()
        .setDescription(`**${user}** esta feliz ^-^`)
        .setColor("PURPLE")
        .setImage(randomhappy)

        message.channel.send(embedhappy)
    }
    if(message.content.startsWith(prefix + "suprise")) {
        let user = message.author.username
        var respuestasuprise = ["https://media.tenor.com/VqgdK6STvZ0AAAAC/anime-fan27-idoly-pride.gif", "https://media.tenor.com/sHRwuETGrQAAAAAC/nichijou-hakase-shinonome.gif", "https://media.tenor.com/0gwoVD1Q6GQAAAAC/kaguya-shocked.gif", "https://media.tenor.com/ceZmZ6VDgeQAAAAC/hifumi-bubblyroz.gif", "https://media.tenor.com/mBG7KOJUyFwAAAAC/murenase-seton-gakuen-anime.gif", "https://media.tenor.com/xUU2lMEE79kAAAAC/idolypride-anime.gif", "https://media.tenor.com/hGCzNZNt5CYAAAAC/princess-connect-re-dive-kokkoro.gif", "https://media.tenor.com/4YbFUNwW9f8AAAAC/pokemon-surprised.gif", "https://media.tenor.com/OgwGtVKmXWAAAAAM/shocked-shy.gif",
        "https://media.tenor.com/gAvUv5tY1pkAAAAM/anime-shocked.gif", "https://media.tenor.com/lrKi_mKGrXcAAAAM/chivalry-chivalry-of-a-failed-knight.gif", "https://media.tenor.com/nRrlYt8w7v8AAAAd/anime-smile.gif", "https://media.tenor.com/h3Uz-hrhgJgAAAAC/shocked-face.gif", "https://media.tenor.com/Y-L5r7LP_t0AAAAC/hologra-hololive.gif", "https://media.tenor.com/TmenruYgq0IAAAAC/fright-surprised.gif", "https://media.tenor.com/CSxTrBGvOOwAAAAC/hitoribocchi-shocked.gif", "https://media.tenor.com/nZk9wHCTBe0AAAAM/spy-x-family-anya.gif", "https://media.tenor.com/qp7g9UD7UeAAAAAC/anime-wow.gif", "https://media.tenor.com/ui1h5F1eIcIAAAAC/umaru-shocked.gif",
        "https://media.tenor.com/A8Gv0K7mcvkAAAAC/shocked-scared-sailormoon-usagi-anime-oh-what.gif", "https://media.tenor.com/kfA-u3R5Ca8AAAAC/sailor-moon-shocked.gif", "https://media.tenor.com/OXyKtUKn_HIAAAAC/anime-karakei-jouzo-no-takagi-san.gif", "https://media.tenor.com/fZ4qQGQfSzgAAAAC/anime-kon-azusa.gif", "https://media.tenor.com/BkPzcaCsWAwAAAAC/omg-overwhelmed.gif", "https://media.tenor.com/PofuJvzbaIQAAAAC/loli-shy.gif", "https://media.tenor.com/XAMUJ6bzBJ8AAAAM/awkward-pout.gif"]
        let randomsuprise = respuestasuprise[Math.floor(respuestasuprise.length * Math.random())]

        const embedsuprise = new Discord.MessageEmbed()
        .setDescription(`**${user}** se acaba de sorprender o.o`)
        .setColor("PURPLE")
        .setImage(randomsuprise)

        message.channel.send(embedsuprise)
    }
    if(message.content.startsWith(prefix + "neutral")) {
        let user = message.author.username;
        var respuestaneutral = ["https://media.tenor.com/DlqkARzWq3wAAAAd/really-anime-seriously.gif", "https://media.tenor.com/-htQlAzVwKcAAAAM/anime-blinking.gif", "https://media.tenor.com/ontwohzKkvgAAAAC/lucia-omori.gif", "https://media.tenor.com/FFd634daPcoAAAAC/laid-back-camp-anime.gif", "https://media.tenor.com/O1LYOF4_6GIAAAAC/kel-omori-neutral.gif", "https://media.tenor.com/09ExK7gMpwIAAAAC/oh-fr-luffy.gif", "https://media.tenor.com/_0i19uunKJ8AAAAC/anime-oops.gif", "https://media.tenor.com/V_0ti1a3_GoAAAAC/loading-azurlane.gif", "https://media.tenor.com/Mv4YPxF3jiYAAAAM/wondering-really.gif", "https://media.tenor.com/qayXeWAKNIsAAAAC/omori-neutral-omori.gif", "https://media.tenor.com/hZJlNhWdhF0AAAAC/mafumafu-mafu.gif",
        "https://media.tenor.com/VVnBNQberP4AAAAM/black-bullet-rentaro-satomi.gif", "https://media.tenor.com/XWpLSR7jXbkAAAAC/neutral-neutral-hero-omori.gif", "https://media.tenor.com/EW2jyyfAVJgAAAAC/omori-mari.gif", "https://media.tenor.com/8-qZ7KZQ1zwAAAAC/aesthetic-anime.gif", "https://media.tenor.com/XNP23mZA8G8AAAAM/megumin-konosuba.gif", "https://media.tenor.com/K51g9qGNCegAAAAC/real-aubrey-emotions-omori-aubrey.gif", "https://media.tenor.com/DuTjduKPeIkAAAAd/neutral-face-floating.gif", "https://media.tenor.com/Ol-nEvmc8EoAAAAd/writing-write.gif", "https://media.tenor.com/bIOQRofK7jUAAAAC/pory-porymations.gif", "https://media.tenor.com/eWn9himEnrEAAAAC/komi-komisan.gif"]
        let randomneutral = respuestaneutral[Math.floor(respuestaneutral.length * Math.random())]

        const embedneutral = new Discord.MessageEmbed()
        .setDescription(`** ${user} ** no tiene nada que decir. ...(。_。)`)
        .setColor("PURPLE")
        .setImage(randomneutral)

        message.channel.send(embedneutral)
    }
    if(message.content.startsWith(prefix + "sleepy")) {
        let user = message.author.username;
        var respuestasleepy = ["https://media.tenor.com/MmjEo1QitoAAAAAC/little-anime.gif", "https://media.tenor.com/V5Y3vaFq7DcAAAAC/kanna-kawai.gif", "https://media.tenor.com/3Ti1nP8Mj6kAAAAM/yawn-nadeshiko.gif", "https://media.tenor.com/EMH0zrVV6LcAAAAM/sleepy-anime.gif", "https://media.tenor.com/wlI49Z28sawAAAAC/anime-sleepy.gif", "https://media.tenor.com/re9a71mA5xwAAAAC/nogamenolife-shiro.gif", "https://media.tenor.com/1UjVG4tHsPQAAAAC/lucky-star-yawn.gif", "https://media.tenor.com/hKli6TsxXYMAAAAC/tsukasa-anime.gif", "https://media.tenor.com/HouEItJq5tUAAAAM/sleepy.gif", "https://media.tenor.com/Izq6jHHDk20AAAAC/idolypride-anime.gif",
        "https://media.tenor.com/L-XEzWbwm7IAAAAC/sleepy-sleepy-head.gif", "https://media.tenor.com/XcHZuEE48ngAAAAC/sleepy-yui.gif", "https://media.tenor.com/LVk1PDpuBmgAAAAC/anime-%E5%B0%8F%E6%9E%97%E3%81%95%E3%82%93%E3%81%A1%E3%81%AE%E3%83%A1%E3%82%A4%E3%83%89%E3%83%A9%E3%82%B4%E3%83%B3.gif", "https://media.tenor.com/i50gylGKwksAAAAC/cat-kitten.gif", "https://media.tenor.com/w5GG4ONbOh0AAAAC/sleepy-tired.gif", "https://media.tenor.com/1n6B6fRfZbUAAAAd/anime-sleepy.gif", "https://media.tenor.com/2w2IMfn9HDIAAAAd/sleep-sleepy.gif", "https://media.tenor.com/9WyP2MJlWiYAAAAC/kanna-sleepy.gif", "https://media.tenor.com/EFCJtCvJ39EAAAAM/himouto-umaru-chan-sylphynford-tachibana.gif",
        "https://media.tenor.com/UygbJyHNMGUAAAAd/kiniro-mosaic-anime.gif", "https://media.tenor.com/BWx0XihzC9kAAAAd/anime-tired.gif", "https://media.tenor.com/ygF2TTmLCFwAAAAd/kanna-sleep-kanna.gif", "https://media.tenor.com/IsTHG9u7a40AAAAC/anime-brush-teeth.gif"]
        let randomsleepy = respuestasleepy[Math.floor(respuestasleepy.length * Math.random())]

        const embedsleepy = new Discord.MessageEmbed()
        .setDescription(`** ${user} ** esta muriendose de sueño... ≡(▔﹏▔)≡`)
        .setColor("PURPLE")
        .setImage(randomsleepy)

        message.channel.send(embedsleepy)
    }
    if(message.content.startsWith(prefix + "disgust")) {
        let user = message.author.username;
        var respuestadisgust = ["https://media.tenor.com/DQ0AVM4ODRoAAAAd/disgust.gif", "https://media.tenor.com/YniEhuPth4UAAAAC/kyoukai-no-kanata-nase.gif", "https://media.tenor.com/0JHFlpscz44AAAAC/anime-disgust.gif", "https://media.tenor.com/dpSu2TI7MrYAAAAM/yukihana-lamy-hololive.gif", "https://media.tenor.com/ew7hDhIqUFkAAAAC/anime-tanjiro.gif", "https://media.tenor.com/THvIJmmkiKkAAAAd/hatsune-miku.gif", "https://media.tenor.com/Lftq9JiwGYMAAAAC/cartoon-anime.gif", "https://media.tenor.com/rhHGRmDYD5sAAAAd/serious-anime.gif", "https://media.tenor.com/oSNsOmxp8iEAAAAd/beatrice-spit.gif", "https://media.tenor.com/RzwllAkt2DUAAAAC/shock-fate-zero.gif", "https://media.tenor.com/LfGl33Wdxv0AAAAC/anime-nge.gif",
        "https://media.tenor.com/UxTt74R2TZsAAAAM/sagiri-disgust.gif", "https://media.tenor.com/FNqZHylgNicAAAAC/mushoku-tensei-anime.gif", "https://media.tenor.com/3ku_QVMm70cAAAAC/bad-joke-tomioka.gif", "https://media.tenor.com/63FsgzWz4TQAAAAC/karyl-princess-connect.gif", "https://media.tenor.com/CbCFYyMGcroAAAAd/oden-annoyed-one-piece.gif", "https://media.tenor.com/xxuam91fOFAAAAAd/anime-rem.gif", "https://media.tenor.com/dt5lIbqrjtQAAAAC/anime-bad-taste.gif", "https://media.tenor.com/I29HZewneOoAAAAC/one-piece-anime.gif", "https://media.tenor.com/o4gIV8taulMAAAAd/one-piece-anime.gif", "https://media.tenor.com/hdGugwORapQAAAAM/anime-girl-anime.gif", "https://media.tenor.com/qWUcWFwaBJEAAAAC/anime-angry.gif", "https://media.tenor.com/t2Yu6k5yHrkAAAAC/jojo.gif",
        "https://media.tenor.com/0bIMD076bWwAAAAC/anime-nisekoi.gif", "https://media.tenor.com/bocDp2NBeoMAAAAC/mad-annoyed.gif", "https://media.tenor.com/ljy1LMHGMF8AAAAC/anime-awkward.gif", "https://media.tenor.com/3KXNrPm1R4UAAAAC/mob-psycho100-mob-psycho.gif", "https://media.tenor.com/MpWP9okaLtYAAAAC/vegeta-disgust.gif", "https://media.tenor.com/WeM44VA36McAAAAC/anime-irritated.gif", "https://media.tenor.com/XF9FkAViN1YAAAAC/anime-pissed.gif", "https://media.tenor.com/8MfRXHqywIgAAAAd/panko-komachi.gif", "https://media.tenor.com/VJXern5FiXYAAAAC/fate-rin.gif", "https://media.tenor.com/UT31MLLjlw0AAAAd/raison-de-etre-eve.gif", "https://tenor.com/view/metal-gear-rising-gif-24741953", "https://media.tenor.com/BCOmEMhcxsoAAAAC/gawr-gura-disgusted.gif"]
        let randomdisgust = respuestadisgust[Math.floor(respuestadisgust.length * Math.random())]

        const embeddisgust = new Discord.MessageEmbed()
        .setDescription(`** ${user} ** no podía estar mas disgustado.. (。﹏。*)s`)
        .setColor("PURPLE")
        .setImage(randomdisgust)

        message.channel.send(embeddisgust)
    }
    if(message.content.startsWith(prefix + "angry")) {
        let user = message.author.username;
        var respuestaangry = ["https://media.tenor.com/A8YunXqxo80AAAAd/anime-angry.gif", "https://media.tenor.com/MvKZZ7JCkUMAAAAC/anime-angry.gif", "https://media.tenor.com/MvKZZ7JCkUMAAAAC/anime-angry.gif", "https://media.tenor.com/lBlcEFqoDnEAAAAC/annoyed-anime.gif", "https://media.tenor.com/G_YeALOH-iAAAAAC/mao-amatsuka-mad.gif", "https://media.tenor.com/VvTZho_Jgg0AAAAd/chihiro-komiya-shounen-maid.gif", "https://media.tenor.com/cYRAeQqpaUMAAAAC/anime-angry-slow-loop.gif", "https://media.tenor.com/V27d_O9uXncAAAAC/anime-angry.gif", "https://media.tenor.com/rzDkOlEDun0AAAAC/hayase-nagatoro-nagatoro-angry.gif", 
        "https://media.tenor.com/4QHcmuULKwYAAAAd/anime-angry.gif", "https://media.tenor.com/PuKJo_l7J0YAAAAC/anime-angry.gif", "https://media.tenor.com/X3x3Y2mp2W8AAAAC/anime-angry.gif", "https://media.tenor.com/OEKhE7FXwsoAAAAC/anime-angry.gif", "https://media.tenor.com/5xVuXqAsc4wAAAAC/anime-otoboku.gif", "https://media.tenor.com/JL9HvHll2AkAAAAM/ohnaruto-muni-d4dj-first-mix.gif", "https://media.tenor.com/hkoyf1VeaZ4AAAAC/anime-angry.gif", "https://media.tenor.com/hG3EbO4GcggAAAAd/angry-funny-anime-funny-anime-expression.gif", "https://media.tenor.com/8hvhKVawxukAAAAC/anime-angry.gif", "https://media.tenor.com/M81x9BprIRoAAAAC/jujutsu-kaisen-itadori-yuji.gif", 
        "https://media.tenor.com/Jj7RpBC7U_AAAAAC/anime-girl.gif", "https://media.tenor.com/RbyYe_UqBa0AAAAC/anime-angry.gif", "https://media.tenor.com/A6qb9JrfUqgAAAAC/anime-mad.gif", "https://media.tenor.com/xF-qZ7VI3kQAAAAC/angry-anime.gif", "https://media.tenor.com/fPmvVumanvYAAAAC/anime-angry.gif", "https://media.tenor.com/4TVxspu_cPoAAAAC/angry-upset.gif", "https://media.tenor.com/9JjBiqaxzdAAAAAC/anime-angry.gif", "https://media.tenor.com/fdEsoTcPdxAAAAAM/angry-anime.gif", "https://media.tenor.com/M7Khm9KQhYgAAAAC/triggered-anime.gif", "https://media.tenor.com/zlR3u2nyQa0AAAAC/anime-choi-mochimazzi.gif", "https://media.tenor.com/x6A8PDqmXBMAAAAC/angry-anime.gif",
        "https://media.tenor.com/1oyFbLZFQacAAAAM/food-wars.gif", "https://media.tenor.com/Ka_512MVvtMAAAAC/angry-serious.gif", "https://media.tenor.com/V7dWl7ew6WgAAAAM/mad-upset.gif", "https://media.tenor.com/R_0gDRtBfYgAAAAC/angry-mad.gif", "https://media.tenor.com/zN2l_oa9dXMAAAAC/anime-angry.gif", "https://media.tenor.com/SyTog5hqeJ4AAAAM/ascendance-of-a-bookworm-honzuki-no-gekokujou.gif", "https://media.tenor.com/FOxMtwKRT9UAAAAM/mad-the-demon.gif", "https://media.tenor.com/bUrYo-oxMjEAAAAM/impey-anime.gif", "https://media.tenor.com/wCAz0pjt05wAAAAC/angry-wtf.gif", "https://media.tenor.com/ehNEdsdCqtYAAAAC/angry-handgun.gif"]
        let randomangry = respuestaangry[Math.floor(respuestaangry.length * Math.random())]

        const embedangry = new Discord.MessageEmbed()
        .setDescription(`** ${user} ** se acaba de enfadar. ಠ_ಠ`)
        .setColor("PURPLE")
        .setImage(randomangry)
    }
    if(message.content.startsWith(prefix + "confused")) {
        let user = message.author.username;
        var respuestaconfused = ["https://media.tenor.com/obB_7KixgO4AAAAC/speechless-no-comment.gif", "https://media.tenor.com/Gv1cMkqev0wAAAAC/anime-confused.gif", "https://media.tenor.com/K3LslQdLo04AAAAM/inugami-korone-hololive.gif", "https://media.tenor.com/wf2ohk7KIiAAAAAC/confused-head-tilt.gif", "https://media.tenor.com/WAlzvPeA3g8AAAAC/anime-utanoprincesama.gif", "https://media.tenor.com/96mR_W6LE1EAAAAC/anime-confusion-what.gif", "https://media.tenor.com/qljo2BEYlVMAAAAd/dio-brando-dio.gif", "https://media.tenor.com/SptyU7LTASwAAAAC/anime-yumiko.gif", "https://media.tenor.com/y34Mm1myriQAAAAM/shamiko-confused.gif", 
        "https://media.tenor.com/1RyM7ikzraIAAAAC/anime-what.gif", "https://media.tenor.com/hHYgobUpDSwAAAAC/what-anime.gif", "https://media.tenor.com/SRwhd6rGlOgAAAAC/anime-girl.gif", "https://media.tenor.com/gzjKEWGQvh0AAAAM/demon-slayer-tanjiro.gif", "https://media.tenor.com/3Vm0IYNFtKsAAAAC/re-life-anime.gif", "https://media.tenor.com/JZX16xr_yyQAAAAC/food-anime.gif", "https://media.tenor.com/LRgXK_PKFkYAAAAC/anime-syaro.gif", "https://media.tenor.com/iIpVPcee16kAAAAC/anime-cirno.gif", "https://media.tenor.com/bbjoFhJAIpIAAAAM/tokyo-mew-mew-anime.gif", "https://media.tenor.com/eNpgx6pd9xIAAAAC/confused-anime.gif", 
        "https://media.tenor.com/VypYy-84gY4AAAAd/confused-chibi.gif", "https://media.tenor.com/SjAoc_yt1TsAAAAd/love-live-nijigasaki-high-school.gif", "https://media.tenor.com/L5TJMj7kvbEAAAAd/confused-shocked.gif", "https://media.tenor.com/kHkyHf5MpewAAAAM/anime-smiles.gif", "https://media.tenor.com/5eO4er6KlmUAAAAC/question-mark-gif-anime-boy.gif", "https://media.tenor.com/v_9KyusYIesAAAAC/eyespin-confused.gif", "    https://media.tenor.com/FqEXZQD8HpoAAAAC/confused-anime.gif", "https://media.tenor.com/MSal6ZHRd5sAAAAM/ichigo-confused.gif", "https://media.tenor.com/7VQ3uurmLewAAAAC/anime-kaos.gif", "https://media.tenor.com/rJaEPtTU2UUAAAAM/denpa-onna-touwa.gif", 
        "https://media.tenor.com/j_FMGmTV-ToAAAAM/eh-shomin.gif", "https://media.tenor.com/X0cbSPtNONgAAAAC/what-wtf.gif", "https://media.tenor.com/8ASyg0AzXeMAAAAC/confused-dizzy.gif", "https://media.tenor.com/-bo8gmpinMwAAAAd/confusion-what.gif", "https://media.tenor.com/9sifZzURdmcAAAAd/what-gjb93.gif", "https://media.tenor.com/0gAu0gBYkCIAAAAM/rikkatakanashi-anime.gif"]
        let randomconfused = respuestaconfused[Math.floor(respuestaconfused.length * Math.random())]

        const embedconfused = new Discord.MessageEmbed()
        .setDescription(`** ${user} ** esta completamente confundido (+_+)?`)
        .setColor("PURPLE")
        .setImage(randomconfused)

        message.channel.send(embedconfused)
    }
    if(message.content.startsWith(prefix + "fear")) {
        let user = message.author.username;
        var respuestafear = ["https://media.tenor.com/RhyxCbENd6YAAAAC/umaru-chan-scared.gif", "https://media.tenor.com/pqT3ybJvFb4AAAAC/anime-fear.gif", "https://media.tenor.com/zaA5Pjj5uLEAAAAC/what-anime.gif", "https://media.tenor.com/W9hZx3Ag_EgAAAAC/anime-attack-on-titan.gif", "https://media.tenor.com/vY6n4P7oPL0AAAAC/anime-foodwars.gif", "https://media.tenor.com/Edm5vql1ln0AAAAd/anime-blink.gif", "https://media.tenor.com/Rh_FNuFbtQ4AAAAC/anime-princess-connect.gif", "https://media.tenor.com/K5CwEGXxbgYAAAAC/anime-scared.gif", "https://media.tenor.com/NAEfowG383oAAAAd/anime-anime-girl.gif", "https://media.tenor.com/JYeGC5oocP4AAAAC/cirno-touhou.gif",
        "https://media.tenor.com/gqEdTY5x0XoAAAAC/anime-pillow.gif", "https://media.tenor.com/JU3c0dnp1K8AAAAC/rebecca-bluegarden-and-happy-scared-happy.gif", "https://media.tenor.com/Q5fmN7qO6ZsAAAAd/renge-non-non-biyori.gif", "https://media.tenor.com/D9cWsb6p9asAAAAC/ranma-spooky.gif", "https://media.tenor.com/gquQa4lg2iEAAAAM/aoi-futaba-princess-connect.gif", "https://media.tenor.com/Xdngk-IiM88AAAAM/anime-ahhh.gif", "https://media.tenor.com/J-R0G7j7lxkAAAAd/yuru-camp-scared-anime.gif", "https://media.tenor.com/r1G0K33FM8IAAAAC/anime-scared.gif", "https://media.tenor.com/SNVdhLJRN9gAAAAC/wtf-scared.gif", "https://media.tenor.com/VZbjn5lvulMAAAAC/princess-connect-re-dive-anime.gif",
        "https://media.tenor.com/oOqwIwTvo94AAAAC/anime-sweating.gif", "https://media.tenor.com/C7OSv-EFghQAAAAC/sword-art-online-kirito.gif", "https://media.tenor.com/nAUe7K-G1l8AAAAd/azur-lane-anime.gif", "https://media.tenor.com/ElkBi5B7OxEAAAAd/hinako-note-scared.gif", "https://media.tenor.com/_127R-JDddAAAAAC/taihou-azur-lane.gif", "https://media.tenor.com/32kUeHdJbksAAAAd/anime-shaking.gif", "https://media.tenor.com/IY4QwmVxj9AAAAAC/scared.gif", "https://media.tenor.com/Jo5ApxvZa_QAAAAC/senko-the-helpful-fox-senko-san.gif", "https://media.tenor.com/RlPojBZOsd8AAAAM/d4dj-d4dj-petit-mix.gif", "https://media.tenor.com/0aSY5qsa0MgAAAAC/anime-no.gif",
        "https://media.tenor.com/WMOA6XUEhGQAAAAM/kaguya-sama-love-is-war.gif", "https://media.tenor.com/qKoW2fUSpjsAAAAd/the-maidens-are-falling-in-love-with-me-otome-wa-boku-ni-koishiteru.gif" ,"https://media.tenor.com/A_bYazEnkBEAAAAC/scared-anime.gif", "https://media.tenor.com/A_bYazEnkBEAAAAC/scared-anime.gif", "https://media.tenor.com/3K3A9wznVOkAAAAC/zenitsu-agatsuma-demon-slayer.gif", "https://media.tenor.com/_xg6kWCTbYEAAAAC/onitsuka-natsumi-love-live-superstar.gif", "https://media.tenor.com/vDoHU2kftnsAAAAd/anime-point.gif", "https://media.tenor.com/PBNaeRJ-QUEAAAAC/anime-relife.gif"]
        let randomfear = respuestafear[Math.floor(respuestafear.length * Math.random())]

        const embedfear = new Discord.MessageEmbed
        .setDescription(`**${user}** acaba de llevarse el susto de su vida w(ﾟДﾟ)w`)
        .setColor("PURPLE")
        .setImage(randomfear)

        message.channel.send(embedfear)
    }
    if(message.content.startsWith(prefix + "cry")) {
        let user = message.author.username;
        var respuestacry = ["https://media.tenor.com/VcdTcSy-sJMAAAAC/sad-cry.gif", "https://media.tenor.com/eh1Zchfmz4sAAAAC/anime-tears.gif", "https://media.tenor.com/8WAGBT7LgA0AAAAC/anime-cry-hinagiku.gif", "https://media.tenor.com/v_FOnNyYuGcAAAAC/cry-k-on.gif", "https://media.tenor.com/JiWSJK_p0IYAAAAM/bocchi-bocchitherock.gif", "https://media.tenor.com/t5Cj3hpyYfAAAAAC/anime-cry.gif", 
        "https://media.tenor.com/tK-bs8K6ZQIAAAAd/remi-horimiya.gif", "https://media.tenor.com/kMrB8yNbzrQAAAAC/jahy-sama-jahy.gif", "https://media.tenor.com/h2RyGfmdvXEAAAAC/mushoku-tensei-eris.gif", "https://media.tenor.com/r2DGstl2IWEAAAAC/raiden-shogun-ei.gif", "https://media.tenor.com/6qJBThILOTcAAAAC/shikimoris-not-just-cute-shikimori.gif", "https://media.tenor.com/_eEcwl8Mn50AAAAC/akebi-chan-no-sailor-anime-cry.gif", 
        "https://media.tenor.com/qrEyPG0mDVYAAAAC/aharen-san-anime-cry.gif", "https://media.tenor.com/OhuSWqAsQH4AAAAC/anime-girl-sad-sad.gif", "https://media.tenor.com/0SxceifWNeEAAAAC/shachiku-san-anime-cry.gif", "https://media.tenor.com/IHVd7sXB66YAAAAC/anime-cry-hinagiku.gif", "https://media.tenor.com/N2qSCBkdracAAAAC/neko-anime.gif", "https://media.tenor.com/0qj0aqZ0nucAAAAC/anya-spy-x-family-anime-anya-crying.gif", "https://media.tenor.com/CiYd21Aj0wsAAAAC/alluka-cry.gif", "https://media.tenor.com/pj3qEJIblVoAAAAC/cry-anime.gif", "https://media.tenor.com/RzoUQx2aFbMAAAAM/show-by-rock-cyan-hijirikawa.gif", 
        "https://media.tenor.com/Q0HUwg81A_0AAAAd/anime-cry.gif", "https://media.tenor.com/q0nNfTktQ7wAAAAC/crying-anime.gif", "https://media.tenor.com/zOiOQIcAHk8AAAAC/ilulu-ilulu-crying.gif", "https://media.tenor.com/UFDx5_Hq_EUAAAAC/keion-cry.gif", "https://media.tenor.com/glWRAhtVU5AAAAAC/cry.gif", "https://media.tenor.com/96Hp6CanFZ0AAAAd/anime-cry.gif", "https://media.tenor.com/_586RpXd1fUAAAAC/anime-crying.gif", "https://media.tenor.com/BX9nojvy0gYAAAAC/crying-drenched.gif", "https://media.tenor.com/K5-GfLeXrcIAAAAd/jahy-sama-jahy.gif", "https://media.tenor.com/bAWKEYF4IAUAAAAC/anime-sailor-moon.gif", 
        "https://media.tenor.com/5BjwVWDXPCYAAAAC/luffy-cry.gif", "https://media.tenor.com/Lhv3hUPh5DUAAAAC/chika-anime.gif", "https://media.tenor.com/zDOUtOWpLmcAAAAC/neko-anime.gif", "https://media.tenor.com/6VuHq13q8FkAAAAC/sobbu-sobbing.gif", "https://media.tenor.com/6VuHq13q8FkAAAAC/sobbu-sobbing.gif", "https://media.tenor.com/eykEa3uLHiYAAAAC/cry-sad.gif", "https://media.tenor.com/bKbenMKAFfMAAAAC/anime-cry.gif", "https://media.tenor.com/9hMsz2XSoDYAAAAC/anime-anime-girl.gif", "https://media.tenor.com/rfhztq1on6gAAAAC/anime-lucky-star.gif"]
        let randomcry = respuestacry[Math.floor(respuestacry.length * Math.random())]

        const embedcry = new Discord.MessageEmbed()
        .setDescription(`** ${user} ** se ha echado a llorar ::>_<::`)
        .setColor("PURPLE")
        .setImage(randomcry)

        message.channel.send(embedcry)
    }
});
client.login(config.token);