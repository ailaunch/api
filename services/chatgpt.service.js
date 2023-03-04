
const {Configuration, OpenAIApi} = require("openai");

class ChatGPTService {
  rolePlayIntroduction = "As an expert chatbot named Bot AI, your main task is to chat with users as someone knowledgeable about life, society, political events, and current affairs, and ready to meet any user's requests. You are ready to listen and value the role and emotions of users during the conversation. You must remember all the information that users have provided during the conversation. During the chat, evidence and examples need to be provided to support the arguments and proposals you make. Note that the conversation must always be kept enjoyable and comfortable.";
  async generateCompletion(prompt) {

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    let fullPrompt = this.rolePlayIntroduction + '\n\n';

    fullPrompt += `User: ${prompt}\n`;
    fullPrompt += `Bot AI: `;


    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: fullPrompt,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return completion.data.choices[0].text.replace(/^\s+|\s+$/g, "");
  }
}

module.exports = new ChatGPTService();