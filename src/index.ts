#!/usr/bin/env node
import { Message } from 'node-telegram-bot-api';

require('dotenv').config();

const parseMessage = (text: string) => {
  const totalMatch = text.match(/Тотал до .* включительно: (\d+)/);
  const purchaseMatch = text.match(/Закупка: (\d+)/);
  const cafesMatch = text.match(/Кафешки: (\d+)/);

  const total = totalMatch ? parseInt(totalMatch[1], 10) : null;
  const purchase = purchaseMatch ? parseInt(purchaseMatch[1], 10) : null;
  const cafes = cafesMatch ? parseInt(cafesMatch[1], 10) : null;

  return { total, purchase, cafes };
};



const main = async (token: string | undefined) => {
  if (!token) {
    throw new Error('Telegram bot token is required');
  }

  const TelegramBot = require('node-telegram-bot-api');
  const options = {
    polling: true
  };
  const bot = new TelegramBot(token, options);
  console.log('Bot started! Waiting for messages...');

  bot.onText(/.*/, (message: Message) => {
    console.log('Received', message);

    const result = parseMessage(message.text || "");
    console.log(result); // { total
  });

  bot.onText(/.*тусовки (.+)\?$/, (message: Message, match: RegExpExecArray | null) => {
    console.log("Received 'тусовки' message", message);
    const resp = `Тусовки ${match ? match[1] : ''} хороши, но лучшие тусовки — у нас в клубе!`;
    bot.sendMessage(message.chat.id, resp);
  });
};

main(
  process.env.TOKEN
).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
