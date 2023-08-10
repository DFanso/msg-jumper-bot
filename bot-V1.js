const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

const token = 'MTEzODc2MDMwNzc3NTM3NzQ1OQ.GZhY8S.-t8Rns6EwZYXxnVAim-07aWLlkH2kOuhBZZqO4';
const server1Id = '1126776340528517120'; //sales teams 
const server2Id = '1123181731906850866'; //models
const channel1Id = '1126780648565256242'; // sales teams  (becky)
const channel2Id = '1123229303677669456'; // models  (becky)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  console.log(`Received message: "${message.content}"`);

  if (message.author.bot) {
    console.log(`Message is from a bot. Ignoring.`);
    return;
  }

  if (message.guild) {
    if (message.guild.id === server1Id) {
      console.log(`Forwarding message from Server 1`);
      const server2 = client.guilds.cache.get(server2Id);
      if (server2) {
        console.log(`Found Server 2`);
        const channel = server2.channels.cache.get(channel2Id);
        if (channel && channel.type === ChannelType.GuildText) {
          console.log(`Found text channel in Server 2`);
          await channel.send(`${message.content}`);
          console.log(`Message forwarded to Server 2`);
        } else {
          console.log(`Channel not found in Server 2 or not a text channel.`);
        }
      } else {
        console.log(`Server 2 not found.`);
      }
    } else if (message.guild.id === server2Id) {
      console.log(`Forwarding message from Server 2`);
      const server1 = client.guilds.cache.get(server1Id);
      if (server1) {
        console.log(`Found Server 1`);
        const channel = server1.channels.cache.get(channel1Id);
        if (channel && channel.type === ChannelType.GuildText) {
          console.log(`Found text channel in Server 1`);
          await channel.send(`${message.content}`);
          console.log(`Message forwarded to Server 1`);
        } else {
          console.log(`Channel not found in Server 1 or not a text channel.`);
        }
      } else {
        console.log(`Server 1 not found.`);
      }
    }
  }
});

client.login(token);
