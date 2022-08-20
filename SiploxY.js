const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json"); 


const snipes = new Discord.Collection()   // Variable para comando "snipe"


let prefix = config.prefix;

client.on("ready", () => {
    console.log(`Toy listo ·w·`);
});

client.on("message", (message) => {
    if(message.content.startsWith(prefix + "setestado")) {
        if(message.author.id==='666280222324162560'){
            var estado = message.content.split(' ').slice(1).join(' ');
            if(!estado){
                message.reply('Dime que quieres que me ponga de estado ·w·')
            }else{
                client.user.setActivity({name:estado, type:2})
                message.channel.send("He cambiado mi estado a ~**Listening to " + estado + ". **~")
            }    
        }
    }


});

client.on('messageDelete', message => {
   snipes.set(message.channel.id, message)
   
})

client.on("message", async (message) => {
    if (message.author.bot) return;
	const args = message.content.trim().split(/ +/g);
    if(message.content.startsWith(prefix + 'help')) {
        
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .addField('Ping', 'Comprobará la latencia de la API de Discord', true)
            .addField('Roles', 'Mostrará todos los roles de el servidor en el que estes', true)
            .addField('Rolinfo', 'Mostrará toda la información de el rol que menciones.', true)
            .addField('Servericon', 'Mostrará el icono del servidor en el que estes.', true)
            .addField('Avatar', 'Enviará el avatar de la persona a la que hayas mencionado', true)
            .addField('Say', 'Dirá lo que que tu escribas y borrará tu mensaje', true)
            .addField('Snipe', 'Enseñará el contenido del ultimo mensaje que ha sido borrado en un guild')
            // ^ Utilidad
            .addField('8ball', 'Adivinará el futuro de la pregunta que hagas', true)
            .addField('Dado', 'Tirara un dado, te dará un numero del 1 al 6', true)
            .addField('Coinflip', 'Lanzará una monera y saldrá cara o cruz', true)
            .addField('Randomuser', 'Dirá el nombre de un usuario aleatorio del server', true)
            // ^ Entretenimiento
            .addField('Neko', 'Enviará imagenes aleatorias de nekos ·w·', true)
            .addField('Capybara', 'Enviará imagenes aleatorias de Capybaras', true)
            .addField('SadCat', 'Enviará imagenes aleatorias de gatos tristes', true)
            .addField('Cat', 'Enviará imagenes aleatorias de gatos ￣ω￣', true)
            .addField('Dog', 'Enviará imagenes aleatorias de perros', true)
            // ^ Imagenes
            .addField('Kiss', 'Besarás a la persona que menciones **o.o**')
            .addField('Cuddle', 'Te acurrucarás con las personas que menciones')
            .addField('Hug', 'Abrazás a  la  persona que menciones')
            .addField('Pat', 'Acariciarás a la persona que menciones')
            .addField('Dance', 'Hará que bailes')
            .addField('Kill', 'Matarás a la persona que menciones')
            // ^ Interacción
            .setColor("PURPLE")
        
        message.author.send(embed);
        message.channel.send("Te he mandado un mensaje con todos los comandos a tu md ·w·")                                                            // COMANDOS DE UTLIDAD ♥ ♥ ♥ //
    }                                                                                                                                                  // COMANDOS DE UTLIDAD ♥ ♥ ♥ //                                                                                                                                         
    if(message.content.startsWith(prefix + "ping")) {                                                                                         
        message.channel.send(`La latencia del API de Discord es de **${Math.round(client.ws.ping)}ms.** ·w·`);

    }
    if(message.content.startsWith(prefix + "roles")) {
        let icon = message.guild.iconURL({size : 2048, dyamic : true})
        let id = message.guild;
         const embedRoles = new Discord.MessageEmbed()
         .setColor("PURPLE")
         .setThumbnail(icon)
         .setDescription(`${id.roles.cache.map(r => r.name).join(" - ")}`)
         .setFooter('Lista de roles de '+ message.guild.name);
    
        message.channel.send(embedRoles);   
    
    }
    if(message.content.startsWith(prefix + "rolinfo")) {
        const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if(!rol) return message.channel.send("Tienes que mencionar un rol para que pueda enseñarte su información ·w·")

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
        .setDescription("**Información del rol ·w·**")
        .addField("Nombre:", ` ${rol.name}`)
        .addField("ID:", ` ${rol.id}`)
        .addField("Usuarios con el rol:", ` ${rol.members.size}`)
        .addField("Posición:", ` ${rol.rawPosition}`)
        .addField("HexColor:", ` ${rol.hexColor}`)
        .addField("Mencionable:", `${mencionable[rol.mentionable]}` )
        .addField("Separado:", ` ${separado[rol.hoist]}`)
        .addField("Gestionado por el sistema:", ` ${sistema[rol.managed]}`)
        .addField("Permisos:", ` \`${permisos}\``)
        .setColor(rol.hexColor)

        message.channel.send(rolEmbed)


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
    if(message.content.startsWith(prefix + "avatar")) {
     let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     let avatar = user.user.displayAvatarURL({ dynamic: true, size: 2048}) 

     const embedAvatar = new Discord.MessageEmbed()

     .setDescription("**Avatar de** <@" + user + "> **:** " )
     .setColor("RANDOM")
     .setImage(avatar)

     message.channel.send(embedAvatar)     
    }
    if(message.content.startsWith(prefix + "say")) {
        const args = message.content.slice(5)
        if(!args) return message.channel.send("Necesitas poner algo para que pueda decirlo ·w·") 
    
        message.channel.send(args)
    
        message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username} - ` + args))
        .catch(console.error);                                                                                                              
    }                                                                                                                                   
    if(message.content.startsWith(prefix + "snipe")) {    
        let snipe = snipes.get(message.channel.id)
        if(!snipe) return message.channel.send('No hay ningún mensaje borrado al que hacerle snipe unu')           
        
        const embedSnipe = new Discord.MessageEmbed()
        .setAuthor(`Mensaje borrado por ${snipe.author.tag}`, snipe.author.displayAvatarURL())
        .setColor("PURPLE")
        .setDescription(snipe.content)
        message.channel.send(embedSnipe)

    }                                                                                                                                   // COMANDOS DE ENTRETENIMIENTO ♥ ♥ ♥ //                                                          
    if(message.content.startsWith(prefix + "8ball")) {                                                                                  // COMANDOS DE ENTRETENIMIENTO ♥ ♥ ♥ //             
        const args = message.content.slice(7)
        if(!args) return message.channel.send("Necesitas preguntarme algo para que pueda responderte ·w·")
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
    if(message.content.startsWith(prefix + "randomuser")) {
        const embed = new Discord.MessageEmbed() 
        .setDescription(message.guild.members.cache.random().displayName) 
        .setColor("RANDOM")
        message.channel.send(embed)
    }                                                                                                                                 
    if(message.content.startsWith(prefix + "neko")) {                                                                                              // COMANDOS DE IMAGENES ♥ ♥ ♥ // 
        const fetch = require ('node-fetch')                                                                                                       // COMANDOS DE IMAGENES ♥ ♥ ♥ //                                                            
        const { MessageEmbed } = require("discord.js")


        fetch(`https://neko-love.xyz/api/v1/neko`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle('Toma una neko ·w·')
            .setImage(body.url)
            .setColor("PURPLE")
            message.channel.send(embed)
        })


    }
    if(message.content.startsWith(prefix + "capybara")) {
        var capy = ["capybara ?!", "capybara !  !! !", "^__^", "coconut doggy", "o my gosh", "cappy blappy"]
        var capyrandom = capy[Math.floor(capy.length * Math.random())]
        const fetch = require ('node-fetch')
        const { MessageEmbed } = require("discord.js")

        fetch(`https://api.capybara-api.xyz/v1/image/random`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle(capyrandom)
            .setImage(body.storage_url)
            .setColor("GREEN")
            message.channel.send(embed)
        })
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
    if(message.content.startsWith(prefix + "cat")) {
     const fetch = require('node-fetch')
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
    if(message.content.startsWith(prefix + "dog")) {
        const fetch = require('node-fetch')
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
        })                                                                                                                                       // COMANDOS DE INTERACCIÓN ♥ ♥ ♥ //
    }                                                                                                                                            // COMANDOS DE INTERACCIÓN ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "kiss")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send("Menciona a alguien para poder besarlo ·w·")
        var respuestabeso = ["https://c.tenor.com/fiafXWajQFoAAAAC/kiss-anime.gif", "https://c.tenor.com/riftr5iWqZQAAAAC/xdd.gif", "https://c.tenor.com/OjcDtiEDUvMAAAAC/friendly-kiss.gif", "https://c.tenor.com/Fyq9izHlreQAAAAC/my-little-monster-haru-yoshida.gif", "https://c.tenor.com/jN35LrknUpkAAAAC/test.gif", "https://c.tenor.com/9jB6M6aoW0AAAAAC/val-ally-kiss.gif", "https://c.tenor.com/wQyttVAvkF0AAAAd/forehead-kiss-anime.gif", "https://c.tenor.com/NO6j5K8YuRAAAAAC/leni.gif", "https://c.tenor.com/yoMKK29AMQsAAAAC/kiss-toradora.gif", 
     "https://c.tenor.com/dn_KuOESmUYAAAAC/engage-kiss-anime-kiss.gif", "https://c.tenor.com/vhuon7swiOYAAAAC/rakudai-kishi-kiss.gif", "https://c.tenor.com/YeitcPAdSCYAAAAd/kyo-x-tohru-kiss.gif", "https://c.tenor.com/g9HjxRZM2C8AAAAd/anime-love.gif", "https://c.tenor.com/nRdyrvS3qa4AAAAC/anime-kiss.gif"]
        var randombeso = respuestabeso[Math.floor(respuestabeso.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' ha besado a **<@' + ment + '>** o.o')
        .setColor("PURPLE")
        .setImage(randombeso)

        message.channel.send({ embed: embedDatos});
    }                                                                                                                                                                                           
    if(message.content.startsWith(prefix + "cuddle")) {                                                                                         
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send("Menciona a alguien para poder acurrucarte con el ·w·")
        var respuestacuddle = ["https://c.tenor.com/doc8uMAT5ssAAAAC/anime-love.gif", "https://c.tenor.com/wwd7R-pi7DIAAAAC/anime-cuddle.gif", "https://c.tenor.com/s44ige0diLYAAAAC/sanriokill-anime.gif", "https://c.tenor.com/ItpTQW2UKPYAAAAC/cuddle-hug.gif", "https://c.tenor.com/2VVGNLi-EV4AAAAC/anime-cute.gif", "https://c.tenor.com/gowinK__PvAAAAAC/anime-cuddle.gif", "https://c.tenor.com/8BqG6yTLCLEAAAAC/anime.gif",
     "https://c.tenor.com/WWgamF4xjZcAAAAC/anime-cuddle.gif", "https://c.tenor.com/y9_xxO9iMwkAAAAC/hug.gif", "https://c.tenor.com/hGUWkkHB_DQAAAAC/cuddle-anime.gif", "https://c.tenor.com/b3Qvt--s_i0AAAAC/hugs.gif", "https://c.tenor.com/NaJIRcVnWloAAAAd/sao-sword-art-online.gif", "https://c.tenor.com/XLWytMsrNy8AAAAC/kaioura-anime-girl.gif", "https://c.tenor.com/Fld0jbqWpDsAAAAC/gochuumon-wa-usagi-desuka-is-the-order-a-rabbit.gif"]
        let randomcuddle = respuestacuddle[Math.floor(respuestacuddle.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' se acurrucó con **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randomcuddle)

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "hug")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send("Menciona a alguien para poder abrazarlo ·w·")
        var respuestahug = ["https://c.tenor.com/kCZjTqCKiggAAAAC/hug.gif", "https://c.tenor.com/fklZNDaU9NMAAAAC/hideri-hideri-kanzaki.gif", "https://c.tenor.com/gqM9rl1GKu8AAAAC/kitsune-upload-hug.gif", "https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif", "https://c.tenor.com/8Jk1ueYnyYUAAAAC/hug.gif", "https://c.tenor.com/gKlGEBBkliwAAAAC/anime-yuru-yuri.gif", "https://c.tenor.com/XKJwFX9B_DUAAAAC/hug.gif",
     "https://c.tenor.com/vpE5_F_oqmsAAAAC/run-hug-hug.gif", "https://c.tenor.com/-0nQoPY5sZ0AAAAC/anime-hug-hug.gif", "https://c.tenor.com/we1trpFB2F0AAAAC/neko-hug.gif", "https://c.tenor.com/4D5jSREXInMAAAAd/anime-couple-hug.gif", "https://c.tenor.com/QTbBCR3j-vYAAAAd/hugs-best-friends.gif", "https://c.tenor.com/yc_shX2Xl_QAAAAd/girl-anime.gif", "https://c.tenor.com/TJuvig1CFBQAAAAM/the-pet-girl-of-sakurasou-sakurasou-no-pet-na-kanojo.gif" ]
        let randomhug = respuestahug[Math.floor(respuestahug.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed() 
        .setTitle("")
        .setDescription('**' + user + '**' + ' abrazó a **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randomhug)

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "pat")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send("Menciona a alguien para poder acariciarlo ·w·")
        var respuestapat = ["https://c.tenor.com/Y7B6npa9mXcAAAAC/rikka-head-pat-pat-on-head.gif", "https://c.tenor.com/E6fMkQRZBdIAAAAC/kanna-kamui-pat.gif", "https://c.tenor.com/8DaE6qzF0DwAAAAC/neet-anime.gif", "https://c.tenor.com/i7nXGbPLqTsAAAAC/anime-hug.gif", "https://c.tenor.com/kM1mVaXE8Y8AAAAC/kaede-azusagawa-kaede.gif", "https://c.tenor.com/TRxNL32jtEIAAAAC/anime-pat.gif", 
     "https://c.tenor.com/8o4fWGwBY1EAAAAd/aharensan-aharen.gif", "https://c.tenor.com/jEfC8cztigIAAAAC/anime-pat.gif", "https://c.tenor.com/lOawy4d-SHMAAAAd/anime-cuddle-gauge.gif", "https://c.tenor.com/VzJtkXVo06wAAAAC/yuru-yuri-anime.gif", "https://c.tenor.com/Jj-vHGZOgT4AAAAC/anime-anime-girl.gif", "https://c.tenor.com/jBuHEbqxarcAAAAC/k-on-anime.gif"]
        let randompat = respuestapat[Math.floor(respuestapat.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed() 
        .setTitle("")
        .setDescription('**' + user + '**' + ' acarició a **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randompat)

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "dance")) {
        let user = message.author.username;
        var respuestadance = ["https://c.tenor.com/YNHT2hPxGawAAAAd/happy-birthday.gif", "https://c.tenor.com/LP6rGpITvlsAAAAd/chill.gif", "https://c.tenor.com/QwNUEvvKxY8AAAAd/happy-loli.gif", "https://c.tenor.com/U8WV2zeMLBEAAAAC/anime-dancing.gif", "https://c.tenor.com/1WtAgS78CB0AAAAd/duck-dance.gif", "https://c.tenor.com/8W8rOwe8XCEAAAAd/dance-anime.gif", "https://c.tenor.com/ysPVGNGfWBcAAAAC/anime-dance-happy.gif",
     "https://c.tenor.com/GYjYgE-UCEgAAAAd/shinobu-kocho-dance.gif", "https://c.tenor.com/V8gBHFz-5mgAAAAC/kanna-kamui-kanna-dance.gif", "https://c.tenor.com/leneA9CzXlUAAAAC/dandidave-anime.gif", "https://c.tenor.com/_UMScn4rrGcAAAAC/dandidave-wave.gif", "https://c.tenor.com/gQ5iadXLfnQAAAAC/daisuke-dance.gif", "https://c.tenor.com/3Mc4IqoPAxAAAAAd/anime-dance.gif", "https://c.tenor.com/0w22pJMgugkAAAAC/hatsune-miku-dancing.gif", "https://c.tenor.com/K7GNv-vxewEAAAAM/hatsune-miku-vocaloid.gif" ]
        let randomdance = respuestadance[Math.floor(respuestadance.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed() 
        .setTitle("")
        .setDescription('**' + user + '** está bailando')
        .setColor("PURPLE")
        .setImage(randomdance)

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "kill")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send("Menciona a la persona que quieras matar ·w·")
        var respuestakill = ["https://c.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif", "https://c.tenor.com/Ds187JeCgckAAAAC/animehit-fugirl.gif", "https://c.tenor.com/Ze50E1rW44UAAAAd/akudama-drive.gif", "https://c.tenor.com/t-0fYVPgg1YAAAAC/pink-hair-anime.gif", "https://c.tenor.com/AGTqt-wXyiEAAAAC/nichijou-minigun.gif", "https://c.tenor.com/Mn4W4D899WEAAAAC/ira-gamagoori-attack.gif", "https://c.tenor.com/bznBkYdhexcAAAAC/fire-arm-fire.gif", 
     "https://c.tenor.com/hkeM4Uie0bcAAAAd/anime-lick-anime-yandere.gif", "https://c.tenor.com/WxLl5mre8pYAAAAd/anime-kill.gif", "https://c.tenor.com/nTEMMozvRwIAAAAd/basil-basil-dies.gif", "https://c.tenor.com/wikodIpaz8oAAAAC/omori-basil.gif", "https://c.tenor.com/G9tCUL5OBcYAAAAC/stab-knife.gif", "https://c.tenor.com/FkxPkj7NOrQAAAAd/akame-akame-of-demon-sword-murasame.gif", "https://c.tenor.com/PFndSfQcmRUAAAAd/anime-kill.gif", "https://c.tenor.com/piK8t2UxKZMAAAAC/edward-elric-punch.gif", "https://c.tenor.com/ECYDNFQJHGgAAAAd/hk416-threat.gif", "https://c.tenor.com/6525cG5E7oQAAAAd/anime-kill-kill.gif",
     "https://c.tenor.com/yWEfaRb2Ly8AAAAd/jojo-meme.gif", "https://c.tenor.com/dq5TwO6YPpAAAAAd/giorno-giovanna-muda-muda-muda.gif"]
        let randomkill = respuestakill[Math.floor(respuestakill.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' ha matado a **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randomkill)

        message.channel.send({ embed: embedDatos });

    }

    
});  
client.login(config.token);