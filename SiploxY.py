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

        embed.add_field(name="Utilidad", value="> ``avatar``")
        
        await message.channel.send(embed=embed)

    ## Utilidad

    if message.content.startswith(f"{prefix}avatar"):
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
        embed.set_image(url=avatar_url_png)

        embed.add_field(name="Enlaces a otros formatos", value=links_text, inline=False)

        await message.channel.send(embed=embed)
        
# Introducir tu token: https://discord.com/developers/applications

client.run(TOKEN)
