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
const token = 'Bot token';

const channelPairs = [
    //add many servers and channels as you want
    {
      server1Id: 'Server 1 ID', 
      server2Id: 'Server 2 ID', 
      channel1Id: 'Channel 1 ID', 
      channel2Id: 'Channel 2 ID', 
    },
    {
      server1Id: 'Server 1 ID', 
      server2Id: 'Server 2 ID', 
      channel1Id: 'Channel 1 ID', 
      channel2Id: 'Channel 2 ID', 
    },
    {
      server1Id: 'Server 1 ID', 
      server2Id: 'Server 2 ID', 
      channel1Id: 'Channel 1 ID', 
      channel2Id: 'Channel 2 ID', 
    },
    {
      server1Id: 'Server 1 ID', 
      server2Id: 'Server 2 ID', 
      channel1Id: 'Channel 1 ID', 
      channel2Id: 'Channel 2 ID', 
    },
    
    
    
  ];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    console.log(`Received message: "${message.content}"`);
  
    if (message.author.bot) {
      console.log(`Message is from a bot. Ignoring.`);
      return;
    }
  
    // Check if the message content contains '(custom)'
    if (message.content.includes('(custom)')) {
      const foundPair = channelPairs.find(pair => {
        if (message.guild) {
          if (message.guild.id === pair.server1Id && message.channel.id === pair.channel1Id) {
            return true;
          } else if (message.guild.id === pair.server2Id && message.channel.id === pair.channel2Id) {
            return true;
          }
        }
        return false;
      });
  
      if (foundPair) {
        if (message.guild.id === foundPair.server1Id) {
          console.log(`Forwarding message from Server 1 to Server 2`);
          await forwardMessage(foundPair.server2Id, foundPair.channel2Id, message.content);
        } else if (message.guild.id === foundPair.server2Id) {
          console.log(`Forwarding message from Server 2 to Server 1`);
          await forwardMessage(foundPair.server1Id, foundPair.channel1Id, message.content);
        }
      }
    }
  });
  
  
  async function forwardMessage(serverId, channelId, content) {
    const server = client.guilds.cache.get(serverId);
    if (server) {
      const channel = server.channels.cache.get(channelId);
      if (channel && channel.type === ChannelType.GuildText) {
        await channel.send(content);
        console.log(`Message forwarded to Server ${serverId}`);
      } else {
        console.log(`Channel not found in Server ${serverId} or not a text channel.`);
      }
    } else {
      console.log(`Server ${serverId} not found.`);
    }
  }

client.login(token);
