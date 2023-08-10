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

const channelPairs = [
    //trello

    {
      server1Id: '1126776340528517120', // sales teams
      server2Id: '1123181731906850866', // models
      channel1Id: '1126780648565256242', // sales teams (becky)
      channel2Id: '1123229303677669456', // models (becky)
    },
    {
        server1Id: '1126776340528517120', // sales teams
        server2Id: '1123181731906850866', // models
        channel1Id: '1126780670929285130', // models (mya)
        channel2Id: '1127855413421940806', // sales teams (mya)
    },
    {
        server1Id: '1126776340528517120', // sales teams
        server2Id: '1123181731906850866', // models
        channel1Id: '1126780707365191712', // sale teams (scarlett)
        channel2Id: '1127926306407985233', // models (scarlett)
    },
    {
        server1Id: '1126776340528517120', // sales teams
        server2Id: '1123181731906850866', // models
        channel1Id: '1126780740353396736', // sale teams (mariana)
        channel2Id: '1127948690137563218', // models (mariana)
    },
    {
        server1Id: '1126776340528517120', // sales teams
        server2Id: '1123181731906850866', // models
        channel1Id: '1126780778395750531', // sale teams (catalina)
        channel2Id: '1127949039346909235', // models (catalina)
    },
    {
        server1Id: '1126776340528517120', // sales teams
        server2Id: '1123181731906850866', // models
        channel1Id: '1126780816299659316', // sale teams (bella)
        channel2Id: '1127949078244892735', // models (bella)
    },
    {
        server1Id: '1126776340528517120', // sales teams
        server2Id: '1123181731906850866', // models
        channel1Id: '1126780863171010600', // sale teams (honey-lulu)
        channel2Id: '1127949140706476064', // models (honey-lulu)
    },

    //top fans

    {
        server1Id: '1126776340528517120', // sales teams
        server2Id: '1123181731906850866', // models
        channel1Id: '1127475303393001552', // sales teams (becky)
        channel2Id: '1127489313232392243', // models (becky)
      },
      {
          server1Id: '1126776340528517120', // sales teams
          server2Id: '1123181731906850866', // models
          channel1Id: '1127475400176574535', // models (mya)
          channel2Id: '1127855315333939222', // sales teams (mya)
      },
      {
          server1Id: '1126776340528517120', // sales teams
          server2Id: '1123181731906850866', // models
          channel1Id: '1127475471387475989', // sale teams (scarlett)
          channel2Id: '1127926388503093288', // models (scarlett)
      },
      {
          server1Id: '1126776340528517120', // sales teams
          server2Id: '1123181731906850866', // models
          channel1Id: '1127475597875101748', // sale teams (mariana)
          channel2Id: '1127949599303282789', // models (mariana)
      },
      {
          server1Id: '1126776340528517120', // sales teams
          server2Id: '1123181731906850866', // models
          channel1Id: '1127475664463867975', // sale teams (catalina)
          channel2Id: '1127949638457110569', // models (catalina)
      },
      {
          server1Id: '1126776340528517120', // sales teams
          server2Id: '1123181731906850866', // models
          channel1Id: '1127475746366046318', // sale teams (bella)
          channel2Id: '1127949673844445194', // models (bella)
      },
      {
          server1Id: '1126776340528517120', // sales teams
          server2Id: '1123181731906850866', // models
          channel1Id: '1127475836015087696', // sale teams (honey-lulu)
          channel2Id: '1127949730840838194', // models (honey-lulu)
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
