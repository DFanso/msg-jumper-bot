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

const token = 'Bot Token';
const server1Id = 'Server 1 ID'; 
const server2Id = 'Server 2 ID'; 
const channel1Id = 'Channel 1 ID'; 
const channel2Id = 'Channel 2 ID'; 

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
