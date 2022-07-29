import DiscordJS, { Channel, Client, Intents, Message } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

export const client = new DiscordJS.Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ] 
});

client.on('ready', () => {
    console.log("Online!")

    new WOKCommands (client ,{
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
    })
})


client.login(process.env.TOKEN)