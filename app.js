const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv/config");
//Import router
const postsRoute = require("./routes/posts");
app.get("/", (req, res) => {
  res.json("API-AiLaunchpad");
});

app.use("/api", postsRoute);



//Connect to DB
try {
  mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("Connect to Mongoose");
  });
} catch (error) {
  console.log(error);
}
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('PORT:' + `http://localhost:${PORT}`);
});

const TelegramBot = require('node-telegram-bot-api');
const ChatGPTService = require('./services/chatgpt.service');

const telegramToken = process.env.TELEGRAM_KEY;


const bot = new TelegramBot(telegramToken, {polling: true});



// Define available commands with icons
const commands = [
  {
    text: "NFT",
    callback_data: "/aipad_bot nft",
    icon: "📲"
  },
  {
    text: "Support",
    callback_data: "/aipad_bot support",
    icon: "📞"
  },
  {
    text: "Airdrop",
    callback_data: "/aipad_bot airdrop",
    icon: "🪂"
  },
  {
    text: "Ask Bot",
    callback_data: "/aipad_bot ask_bot",
    icon: "💬"
  }
];

// Define states
const states = {
  DEFAULT: 'default',
  ASKING_QUESTION: 'asking_question'
};

// Initialize state
let currentState = states.DEFAULT;

// Listen for any kind of message
bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if the message starts with '/'
  if (text.startsWith('/')) {
    // Check if the message is "/start"
    if (text === '/aipad_bot') {
      // Set state to ASKING_QUESTION
      currentState = states.ASKING_QUESTION;

      // Create a message with buttons and input field
      const responseText = "Please select a command or enter your question:";
      const options = {
        reply_markup: {
          inline_keyboard: [
            commands.slice(0,3).map((command) => {
              return {
                text: `${command.icon} ${command.text}`,
                callback_data: command.callback_data
              };
            }),
            [
              {
                text: `${commands[3].icon} ${commands[3].text}`,
                callback_data: commands[3].callback_data
              }
            ]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }
      };

      // Send the response message
      bot.sendMessage(chatId, responseText, options);
    } else {
      // Handle other commands
      // ...
    }
  }
});

// Listen for callback queries
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // Send a reply to the callback query
  if (data === "/aipad_bot ask_bot") {

    const responseText = "Ask me a question:";
    const options = {
      reply_markup: {
        force_reply: true,
        input_field_placeholder: "Ask me a question:"
      }
    };
    bot.sendMessage(chatId, responseText, options);
    currentState = states.ASKING_QUESTION;
  } else if (data === "/aipad_bot nft") {
    let text = ` <b><i>⭐ Free Mint Coming Soon ⭐</i></b> \n \nThe Ai Launchpad's NFT system is divided into 4 tiers: Common, Rare , Epic, Lengendary. \n \nStaking Model and Key Tiers: The protocol uses a tier based system to determine the guaranteed allocation for each participant in a pool. \nStaking LP tokens or an NFT qualifies token holders within the AIPAD tiered system. Access and chance to participate in AI Launchpad's decentralized investment protocol is dependent on the assigned Tier level. \nAllocation Tiers are identified based on the tokens amounts held at the time of the snapshot. Providing multiple tiers catters to the investor’s individual risk profile all the while preventing bot manipulation and other market-making actors from front running the token generation event.`
    
    bot.sendMessage(chatId,text, {parse_mode: "HTML"});
    currentState = states.DEFAULT;
  } else if(data === "/aipad_bot airdrop") {
    let text = `⏰ Deadline: 11:00 AM UTC Mar 1st, 2023 to 10:00 UTC Mar 15th, 2023 - Schedule for distributing Airdrop tokens: 10:00 AM Mar 16th, 2023 !`

    bot.sendMessage(chatId,text);
    currentState = states.DEFAULT;
  }else{
    let text ='Please send a message to the admin for the fastest response.'
    bot.sendMessage(chatId, text);
    currentState = states.DEFAULT;
  }
});

// Listen for message from input field
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if the message is a question and in the ASKING_QUESTION state
  if (currentState === states.ASKING_QUESTION && !text.startsWith('/')) {
    console.log({text});
    ChatGPTService.generateCompletion(text).then(responseMsg => {
      bot.sendMessage(chatId, responseMsg);
    });
    currentState = states.DEFAULT;
    return

    bot.sendMessage(chatId, `You asked: ${text}`);
    currentState = states.DEFAULT;
  }
});

return

// bot.on('message', (msg) => {
  bot.onText(/^\/aipad_bot (.+)/, (msg, match) => {
  const chatId = msg.chat.id;   
  // const chatMsg = msg.text;  
  const chatMsg = match[1].toLocaleLowerCase()
  console.log({chatId});   
  console.log({chatMsg}); 
  if (chatMsg.toLowerCase().includes("launchpad")) {
    bot.sendMessage(chatId, "The Next-Generation platform for incubating AI projects.");
    return
  }  
  if (chatMsg.toLowerCase().includes("ido")) {
    bot.sendMessage(chatId, "Comming soon");
    return
  }  

  ChatGPTService.generateCompletion(chatMsg).then(responseMsg => {
    bot.sendMessage(chatId, responseMsg);
  });
});

