import discord

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

prefix = "s!"

@client.event
async def on_ready():
    print(f"SiploxY está encendido ^_^ // {client.user}")

@client.event
async def on_message(message):

    # Anti-loop

    if message.author == client.user:
        return
    
    ## Lista de comandos

    if message.content.startswith(f"{prefix}help"):

        embed = discord.Embed(
            title="📑 | Comandos |",
            colour=discord.Color.from_rgb(255, 255, 255)
        )
        
        embed.add_field(name="▸ 🔧 Utilidad", value="> ``servericon (si)`` | ``avatar (a)``")
        
        await message.channel.send(embed=embed)

    ## Utilidad

    if message.content.startswith(f"{prefix}avatar") or message.content.startswith(f"{prefix}a"):

        if message.mentions:
            user = message.mentions[0]
        else:
            user = message.author

        avatar_url_png = user.display_avatar.with_format("png").url
        avatar_url_webp = user.display_avatar.with_format("webp").url
        avatar_url_jpg = user.display_avatar.with_format("jpg").url
        avatar_url_jpeg = user.display_avatar.with_format("jpeg").url

        links_text = f"> [PNG]({avatar_url_png}) | [WEBP]({avatar_url_webp}) | [JPG]({avatar_url_jpg}) | [JPEG]({avatar_url_jpeg})"

        embed = discord.Embed(
            title=f" :art:  | Avatar de {user} |",
            colour=discord.Color.from_rgb(255, 255, 255)
        )
        embed.add_field(name="Enlaces a otros formatos", value=links_text, inline=False)
        embed.set_image(url=avatar_url_png)

        await message.channel.send(embed=embed)

    if message.content.startswith(f"{prefix}servericon") or message.content.startswith(f"{prefix}si"):
        GuildName = message.guild.name

        icon_url_png = f"{message.guild.icon.url}.png"
        icon_url_webp = f"{message.guild.icon.url}.webp"
        icon_url_jpg = f"{message.guild.icon.url}.jpg"
        icon_url_jpeg = f"{message.guild.icon.url}.jpeg"

        links_text = f"> [PNG]({icon_url_png}) | [WEBP]({icon_url_webp}) | [JPG]({icon_url_jpg}) | [JPEG]({icon_url_jpeg})"

        embed = discord.Embed(
            title=f" :art:  | Icono de {GuildName} |",
            colour=discord.Color.from_rgb(255, 255, 255)
        )
        embed.add_field(name="Enlaces a otros formatos", value=links_text, inline=False)
        embed.set_image(url=f"{message.guild.icon.url}")

        await message.channel.send(embed=embed)

# Reemplazar "TOKEN" por una token de bot. (https://discord.com/developers/applications)
client.run("TOKEN")
