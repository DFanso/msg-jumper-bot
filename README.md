# msg-jumper-bot
 ##a bot to forward discord channels message to other server channels



---

# Bot v1

This is a Discord bot implemented in Node.js using the `discord.js` library. The bot reads messages from specific channels in two servers and forwards them to the corresponding channels in the other server.

## Features

- Forwards messages between designated channels in Server 1 and Server 2.
- Requires specific intent permissions to function correctly.

## Prerequisites

- Node.js (recommended version)
- Discord.js library

## Setup

1. Clone the repository or download the code.
2. Install the necessary dependencies by running: `npm install`
3. Open `bot-v1.js` and replace `'YOUR_TOKEN_HERE'` with your bot's token.
4. Replace the server and channel IDs with the appropriate IDs for your servers and channels.

## Usage

1. Run the bot by executing: `node bot-v1.js`
2. The bot will log in as the specified bot user.
3. It will monitor messages in the designated channels and forward them between the two servers.

## Bot v2

This is an enhanced version of the Discord bot implemented in Node.js using the `discord.js` library. Similar to v1, this bot reads messages from specific channels in two servers and forwards them to the corresponding channels in the other server. In v2, the forwarding process is optimized and extended to multiple channel pairs.

## Features

- Improved message forwarding mechanism.
- Supports multiple channel pairs.
- Requires specific intent permissions to function correctly.

## Prerequisites

- Node.js (recommended version)
- Discord.js library

## Setup

1. Clone the repository or download the code.
2. Install the necessary dependencies by running: `npm install`
3. Open `bot-v2.js` and replace `'YOUR_TOKEN_HERE'` with your bot's token.
4. Update the `channelPairs` array with the desired channel pairs by specifying server and channel IDs.

## Usage

1. Run the bot by executing: `node bot-v2.js`
2. The bot will log in as the specified bot user.
3. It will monitor messages in the designated channels and forward them between the corresponding channels in the two servers.

---

Feel free to enhance the README with more details, such as deployment options, troubleshooting tips, and any other relevant information.
