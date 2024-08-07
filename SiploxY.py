import discord
import os
import sys

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
    
    if message.content.startswith(f"{prefix}r"):

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

        embed.add_field(name="▸ 🔧 Utilidad", value="> ``serverinfo (si)`` | ``servericon (sc)`` | ``avatar (a)`` | ``banner (b)`` | ``ping (p)``")
        
        await message.channel.send(embed=embed)

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
            colour = discord.Color.from_rgb(255, 255, 255)
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
            colour = discord.Color.from_rgb(255, 255, 255)
        )
        embed.add_field(name="__Enlaces a otros formatos__", value=links_text, inline=False)
        embed.set_image(url=icon_url_png)

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
            colour = discord.Color.from_rgb(255, 255, 255)
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
                colour = discord.Color.from_rgb(255, 255, 255)
            )
            embed.add_field(name="__Enlaces a otros formatos__", value=links_text, inline=False)
            embed.set_image(url=banner_url_png)

            await message.channel.send(embed=embed)
        else:
            await message.channel.send(f"{user} no tiene un banner.")

        if message.content.startswith(f"{prefix}ping") or message.content.startswith(f"{prefix}p"):
            await message.channel.send(f"La latencia de {client.user} es de **{round(client.latency * 1000)}ms**.")

# Reemplazar "TOKEN" por una token de cliente. (https://discord.com/developers/applications)
client.run("TOKEN")
