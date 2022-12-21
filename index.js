const {Client, GatewayIntentBits } = require("discord.js");
const colors=require("colors")
// const client2=new Client({intents: 253})

const client=new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent
    ]
})

client.once('ready', ()=>{
    console.log(`Bot ${client.user.tag} encendido`.bgBlue)
    console.log(`Bot ${client.user} encendido`.bgBlue)
    console.log(`Bot ${client.user.username} encendido`.bgBlue)

    console.log(client.user.presence.status)
    client.user.setStatus('idle')
    console.log(client.user.presence.status)
    const testChannel=client.channels.cache
    console.log(testChannel.find(channel=>channel.name=='text'))
    // console.log(testChannel)
})

client.login('MTA1NTA1NTI1OTEyMDE5MzU4Ng.GWdDvp.W5xpL9qzveQj3MsK-Plf4VKT39OEi8WRd0dOHM')