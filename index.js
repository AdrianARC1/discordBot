const dotenv=require("dotenv")
// require('dotenv').config()
dotenv.config()

const { DISCORD_TOKEN, CLIENT_ID } =require('./config')

const {Client, GatewayIntentBits } = require("discord.js");
const colors=require("colors")

const ydtl=require("ytdl-core");
const { filterFormats } = require("ytdl-core");

// const client2=new Client({intents: 253})

var canciones = {}


const client=new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates
    ]
})

client.once('ready', ()=>{
    console.log(`Bot ${client.user.tag} encendido`.bgBlue)
    // console.log(`Bot ${client.user} encendido`.bgBlue)
    // console.log(`Bot ${client.user.username} encendido`.bgBlue)

    // console.log(client.user.presence.status)
    client.user.setStatus('online')
    // console.log(client.user.presence.status)
    // const testChannel=client.channels.cache
    // console.log(testChannel.find(channel=>channel.name=='text'))
    // console.log(testChannel)
    client.application.commands.set([
        {
            name: "ping",
            description: "Pong!",
            options:[]
        }
    ])
})

client.on("messageCreate", async (msg) => {
    // console.log(msg.author.username)
    console.log(msg.content)
    var valores  = /^[0-9]+$/;

    if(msg.author.bot) return

    if (msg.content === 'ping'){
        await msg.reply('Pong!')
        await msg.react('🎟')
    }

    if (msg.content === 'hola'){
        await msg.channel.send('Hola bienvenido')
        await msg.channel.send(`Hola bienvenido ${msg.author}`)
    }

    if (msg.content.includes('!test')){
        await msg.channel.send(`Así me gusta, testeando cosas :D ${msg.author}`)
    }

    if (msg.content.includes('caca')){
        await msg.channel.send(`Esa palabra no está permitida ${msg.author}`)
    }

    if (msg.content === '!social'){
        await msg.channel.send('https://google.com')
    }

    if (msg.content === '!ayuda'){
        var message = "Si quieres ayuda tienes el canal de " + msg.guild.channels.cache.get('1061757913275834378').toString()
        msg.reply(message)
    }

    if (msg.content === '!hola'){
        msg.reply("Hola que tal!!!!!!!!!!!!!!!!!")
    }

    let argumentos=msg.content.split(' ')
    if (argumentos[0] === '!decir'){
        msg.reply(argumentos.slice(1).join(' '))
    }
    var mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var contar = 0
    for (var i = 0; i < mayusculas.length; i++) {
        for (var x = 0; x < msg.content.length; x++) {
            if(msg.content[x]==mayusculas[i]){
                contar+=1
            }}}
            
    let oportunidades=0
    if (msg.content!=msg.content.match(valores) && contar>5){
        msg.author.send("No pongas todo en mayusculas o te irás baneado.")
        oportunidades++
        console.log(oportunidades)
        // msg.guild.members.addRole.
        // msg.guild.timeout(5 * 60 * 1000, 'Prueba')


        // msg.delete()
    if (oportunidades==2)
            msg.reply("Has infringido las normas dos veces, a la tercera te vas compare")
        
    
    }
})

client.on('interactionCreate', async inter => {
    if(inter.isCommand() && inter.commandName==='ping'){
        await inter.reply("Pong!")
    }
});
client.on('messageCreate', async msg => {
    if (msg.content==='pretty'){
        msg.delete()
        await msg.channel.send('No eres bonito')
    }
})


client.on('messageCreate', async msg => {
    let argumentos=msg.content.split(' ')
    if(argumentos[0]=='!play'){
        const {joinVoiceChannel} = require('@discordjs/voice')
        const voice = require('@discordjs/voice')

        function play(connection, msg){
            var cancion = canciones[msg.guild.id]
            
            cancion.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}))


            cancion.queue.shift()

            cancion.dispatcher.on("end", function(){
                if(cancion.queue[0]){
                    play(connection, msg)
                }else{
                    connection.disconnect()
                }
            })
        
        }


        if(!argumentos[1]){
            msg.channel.send("Tienes que darme un link para poner la musica campeón")
            return
        }
        if(!msg.member.voice.channel){
            msg.channel.send("Tienes que estar en un chat de voz para poner la musica campeón")
            return
        }

        if(!canciones[msg.guild.id]) canciones[msg.guild.id] = {
            queue: []
        }
        var cancion=canciones[msg.guild.id]

        cancion.queue.push(argumentos[1])
        console.log(cancion)

        if(!msg.guild.voiceStates) msg.member.voice.channel.join().then(function(connection){
            play(connection,msg)
        })
    }



})

// client.on('messageCreate', msg => {
//     const comando=argumentos.shift().toLowerCase()
//     if(comando==='reactionrole'){
            
//         }
//     }
// )

// client.login(process.env.DISCORD_TOKEN)
client.login(DISCORD_TOKEN)