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
    
    ## Help

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
            user = message.autho

        avatar_url = user.display_avatar.url

        embed = discord.Embed(
            title=f"| Avatar de {user} |",
            description=f"[Enlace de la imagen]({avatar_url})",
            colour=discord.Color.from_rgb(255,255,255)
        )
        embed.set_image(url=avatar_url)

        await message.channel.send(embed=embed)
        
# Introducir tu token: https://discord.com/developers/applications

client.run(TOKEN)
