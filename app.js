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

