import discord # Libreria de discord.py
import config # Archivo con los datos del cliente (Token)
import os # Usado para reiniciar el cliente
import sys # Usado para reiniciar el cliente
import random # Libreria "random" de python para comandos que utilicen respuestas aleatorias.
import asyncio # Libreria asyncio de python para hacer que un comando tarde cierto tiempo en ser respondido.

intents = discord.Intents.default()
intents.members = True
intents.presences = True
intents.message_content = True

client = discord.Client(intents=intents)

prefix = "s!"

@client.event
async def on_ready():
    print(f"SiploxY está encendido ^_^ // {client.user}")

@client.event
async def on_message(message):

    ## Anti-loop

    if message.author == client.user:
        return
    
    ## Reset
    
    if message.content.startswith(f"{prefix}reset") or message.content.startswith(f"{prefix}re"):

        ## Debes cambiar la ID de usuario a la del developer de este bot. (Pueden ser varias IDs)
        if message.author.id == 666280222324162560 or message.author.id == 1116003595440111736:
            
            await message.channel.send(f"Reiniciando el cliente {client.user}...")
            os.execv(sys.executable, ['python'] + sys.argv)

        else:
            await message.channel.send("No tienes permisos para reiniciar el cliente.")

    ## Lista de comandos

    if message.content.startswith(f"{prefix}help"):

        embed = discord.Embed(
            title = "📑 | Comandos |",
            colour = discord.Color.from_rgb(255, 255, 255)
        )
        embed.add_field(name="▸ :gear: Moderación", value="> ``purge``")
        embed.add_field(name="▸ 🔧 Utilidad", value="> ``serverinfo (si)`` | ``servericon (sc)`` | ``userinfo (ui)`` | ``avatar (a)`` | ``banner (b)`` | ``ping``", inline=False)
        embed.add_field(name="▸ :balloon: Entretenimiento", value="> ``roulette`` | ``dice`` | ``coinflip (cf)`` | ``say (s)``")
        
        await message.channel.send(embed=embed)

    ## Moderación

    if message.content.startswith(f"{prefix}purge"):

        if message.author.guild_permissions.manage_messages:

            args = message.content.split()
            if len(args) == 2 and args[1].isdigit():
                AmountMessages = int(args[1])

                if AmountMessages < 1:
                    await message.channel.send("Debes especificar un número de mensajes a borrar.\nEj: s!purge 10")
                    return
                
                await message.channel.purge(limit=AmountMessages + 1)
                await message.channel.send(f"Se han eliminado **{AmountMessages}** mensajes de **{message.channel}**.")
            
            else:

                await message.channel.send("Debes indicar un número válido de mensajes que borrar.\nEj: s!purge 10")
                
        else:

            await message.channel.send("No tienes permisos para eliminar mensajes.")


    ## Utilidad

    if message.content.startswith(f"{prefix}serverinfo") or message.content.startswith(f"{prefix}si"):

        TotalMembers = message.guild.member_count
        Bots = sum(1 for member in message.guild.members if member.bot)
        Users = TotalMembers-Bots # Se restan la cantidad de bots a la cantidad de todos los miembros totales (Bots y usuarios), lo que resulta en la cantidad de usuarios.

        if message.guild.verification_level == 0:
            NivelVerificacion = "🌻 Ninguno"
        elif message.guild.verification_level == 1:
            NivelVerificacion = "📗 Bajo"
        elif message.guild.verification_level == 2:
            NivelVerificacion = ":orange_book: Medio"
        elif message.guild.verification_level == 3:
            NivelVerificacion = "📕 Alto"
        elif message.guild.verification_level == 4:
            NivelVerificacion = "🚨 Muy alto"
        else:
            NivelVerificacion = ":question: Desconocido"

        embed = discord.Embed(
            title = f" 🖨️ | Información de {message.guild.name} |",
            colour=discord.Color.from_rgb(255, 255, 255)
        )
        embed.set_thumbnail(url=message.guild.icon.with_format("png").url)
        embed.add_field(name="__Miembros__", value=f":bust_in_silhouette: Total: {TotalMembers}\n\n🧑🏻 Usuarios: {Users}\n:robot: Bots: {Bots}")
        embed.add_field(name="__Estado__", value=f" 💚 Conectados: {sum(1 for member in message.guild.members if member.status == discord.Status.online)}\n❤️ No molestar: {sum(1 for member in message.guild.members if member.status == discord.Status.dnd)}\n🧡 Ausentes: {sum(1 for member in message.guild.members if member.status == discord.Status.idle)}\n:grey_heart: Desconectados: {sum(1 for member in message.guild.members if member.status == discord.Status.offline)}")
        embed.add_field(name="__Canales__", value=f"📖 Total: {len(message.guild.channels)}\n⌨️ Texto: {len(message.guild.text_channels)}\n🔈 Voz: {len(message.guild.voice_channels)}\n:thread: Threads: {len(message.guild.threads)}")
        embed.add_field(name="__Nivel de verificación__", value=f"{NivelVerificacion}")
        embed.add_field(name="__ID del servidor__", value=f"{message.guild.id}")
        embed.set_footer(text=f"Owner del servidor: ~ {message.guild.owner} ~")
        await message.channel.send(embed=embed)

    if message.content.startswith(f"{prefix}servericon") or message.content.startswith(f"{prefix}sc"):

        icon_url_png = message.guild.icon.with_format("png").url
        icon_url_webp = message.guild.icon.with_format("webp").url
        icon_url_jpg = message.guild.icon.with_format("jpg").url
        icon_url_jpeg = message.guild.icon.with_format("jpeg").url

        links_text = f"[PNG]({icon_url_png}) | [WEBP]({icon_url_webp}) | [JPG]({icon_url_jpg}) | [JPEG]({icon_url_jpeg})"

        embed = discord.Embed(
            title = f" :art:  | Icono de **{message.guild.name}** |",
            colour=discord.Color.from_rgb(255, 255, 255)
        )
        embed.add_field(name="__Enlaces a otros formatos__", value=links_text, inline=False)
        embed.set_image(url=icon_url_png)

        await message.channel.send(embed=embed) 

    if message.content.startswith(f"{prefix}userinfo") or message.content.startswith(f"{prefix}ui"):

        partes = message.content.split(" ")

        if message.mentions:
            user = message.mentions[0]
        elif len(partes) > 1:
            await message.channel.send(f"Menciona a un usuario para ver su perfil.\nEj: {prefix}ui @usuario")
            return
        else:
            user = message.author

        embed = discord.Embed(
            title=f"🖨️ | Información de **{user} |**",
            colour=user.accent_color
        )
    
        embed.set_thumbnail(url=user.display_avatar.with_format("png").url)
        embed.add_field(name="__Fecha de creación__", value=f"{user.created_at.strftime("%d/%m/%Y a las %H:%M")}", inline=False)
        embed.add_field(name="__Fecha de unión__", value=f"{user.joined_at.strftime("%d/%m/%Y a las %H:%M")}", inline=False)
        embed.add_field(name="__ID de usuario__", value=f"{user.id}")

        await message.channel.send(embed=embed)

    if message.content.startswith(f"{prefix}avatar") or message.content.startswith(f"{prefix}a"):

        partes = message.content.split(" ")

        if message.mentions:
            user = message.mentions[0]
        elif len(partes)>1:
            await message.channel.send(f"Menciona a un usuario para ver su avatar. \nEj: s!a <@955869268359127050>")
            return
        else:
            user = message.author

        avatar_url_png = user.display_avatar.with_format("png").url
        avatar_url_webp = user.display_avatar.with_format("webp").url
        avatar_url_jpg = user.display_avatar.with_format("jpg").url
        avatar_url_jpeg = user.display_avatar.with_format("jpeg").url

        links_text = f"[PNG]({avatar_url_png}) | [WEBP]({avatar_url_webp}) | [JPG]({avatar_url_jpg}) | [JPEG]({avatar_url_jpeg})"

        embed = discord.Embed(
            title = f" :art:  | Avatar de **{user}** |",
            colour = user.accent_color
        )
        embed.add_field(name="__Enlaces a otros formatos__", value=links_text, inline=False)
        embed.set_image(url=avatar_url_png)

        await message.channel.send(embed=embed)

    if message.content.startswith(f"{prefix}banner") or message.content.startswith(f"{prefix}b"):

        partes = message.content.split(" ")

        if message.mentions:
            user_id = message.mentions[0].id
        elif len(partes)>1:
            await message.channel.send(f"Menciona a un usuario para ver su banner. \nEj: s!b <@955869268359127050>")
            return
        else:
            user_id = message.author.id

        user = await client.fetch_user(user_id)    

        if user.banner:

            banner_url_png = user.banner.with_format("png").url
            banner_url_webp = user.banner.with_format("webp").url
            banner_url_jpg = user.banner.with_format("jpg").url
            banner_url_jpeg = user.banner.with_format("jpeg").url

            links_text = f"[PNG]({banner_url_png}) | [WEBP]({banner_url_webp}) | [JPG]({banner_url_jpg}) | [JPEG]({banner_url_jpeg})"

            embed = discord.Embed(
                title = f" :art:  | Banner de **{user}** |",
                colour=discord.Color.from_rgb(255, 255, 255)
            )
            embed.add_field(name="__Enlaces a otros formatos__", value=links_text, inline=False)
            embed.set_image(url=banner_url_png)

            await message.channel.send(embed=embed)

        else:

            color_hex = f"{user.accent_color.value:06x}"
            AccentBanner = f"https://singlecolorimage.com/get/{color_hex}/1000x300"

            if user.accent_color:
                embed = discord.Embed(
                    title=f"🎨 | Color de acento de **{user}** |",
                    colour=user.accent_color
                )
                embed.set_image(url=AccentBanner)

                await message.channel.send(embed=embed)

            else:

                embed = discord.Embed(
                    title=f"🎨 | Información de **{user}** |",
                    description="Este usuario no tiene un banner ni un color de acento establecido.",
                    colour=discord.Color.from_rgb(255, 255, 255)
                )
                await message.channel.send(embed=embed)  

    if message.content.startswith(f"{prefix}ping"):
        await message.channel.send(f"La latencia de {client.user} es de **{round(client.latency * 1000)}ms**.")

    ## Entretenimiento
    
    if message.content.startswith(f"{prefix}roulette"):

        content = message.content[len(f"{prefix}say"):].strip()
        options = [option.strip() for option in content.split(',')]

        if len(options) < 2:
            await message.channel.send("Debes proporcionar al menos dos opciones, separadas por comas.")
            return
        
        choice = random.choice(options)

        roulette = ":question: | La ruleta dice"
        RouletteMessage = await message.channel.send(roulette)

        for i in range(3):
            await asyncio.sleep(0.5)
            roulette += '.'
            await RouletteMessage.edit(content=roulette)

        await asyncio.sleep(0.5)

        await RouletteMessage.edit(content=f":question: | ¡La ruleta dice... **{choice}**!")

    if message.content.startswith(f"{prefix}dice"):

        content = message.content.split()

        veces = 1

        if len(content) > 1:
            try:
                veces = int(content[1])
                
                if veces < 1 or veces > 20:
                    await message.channel.send("Debes tirar entre 1 a 20 dados.")
                    return
                
            except ValueError:
                await message.channel.send("Debes introducir un número de dados que tirar.")
                return
            
        if veces == 1:
            dice = "🎲 | El dado acaba de tirar un"
            DiceMessage = await message.channel.send(dice)
        
        else: 
            dice = "🎲 | Los dados acaban de tirar un"
            DiceMessage = await message.channel.send(dice)

        for i in range(3):
            await asyncio.sleep(0.5)
            dice += "."
            await DiceMessage.edit(content=dice)

        resultados = [] # Se crea una lista en la que se añadirán los valores del dado.

        for i in range(veces):
            await asyncio.sleep(0.5)
            resultado = str(random.randint(1,6))
            resultados.append(resultado)

            if i == 0:
                dice += f" **{resultado}**"
            elif i == veces-1:
                dice += f", **{resultado}**."
            else:
                dice += f", **{resultado}**"

            await DiceMessage.edit(content=dice)

        if veces>1:
            suma = sum(int(x) for x in resultados)
            dice += f"\n🎲 | La suma de los dados es: **{suma}**."
            await DiceMessage.edit(content=dice)

    if message.content.startswith(f"{prefix}coinflip") or message.content.startswith(f"{prefix}cf"):

        coin = ":coin: | Lanzando moneda"

        CoinMessage = await message.channel.send(coin)

        for i in range(3):
            await asyncio.sleep(0.5)
            coin += '.'
            await CoinMessage.edit(content=coin)

        await asyncio.sleep(0.5)

        await CoinMessage.edit(content=f":coin: | ¡Acaba de salir **{random.choice(["cara", "cruz"])}**!")

    if message.content.startswith(f"{prefix}say") or message.content.startswith(f"{prefix}s"):
    
        if message.content.startswith(f"{prefix}say"):
            content = message.content[len(f"{prefix}say"):].strip()
        else:
            content = message.content[len(f"{prefix}s"):].strip()

        if not content:
            await message.channel.send("Debes escribir algo para que lo repita.\nEj: s!say ¡Hola! ")

        print(f"El usuario \"{message.author}\" ha escrito: \"{content}\" en {message.guild}, {message.channel}. (s!say)")

        await message.delete()
        await message.channel.send(content)

# Configurar en el archivo config.py
client.run(config.token)
