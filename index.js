const express = require('express');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const puppeteer = require('puppeteer');
const { LocalAuth, Client } = require('whatsapp-web.js');

const app = express();
const port = process.env.PORT || 3000;

const getOllamaChatCompletion = async (userChatQuestion) => {
    try {
        
        const prompt = `${userChatQuestion.trim()}. Jawab dengan kocak ya.`;
        const response = await axios.post('http://localhost:11434/api/chat', {
            model: 'deepseek-r1:latest',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            stream: false
        });

        const raw = response.data?.message?.content || '';
        const cleaned = raw.replace(/<think>[\s\S]*?<\/think>\s*/g, '').trim();

        const finalAnswer = cleaned || "Hmm... kayaknya saya butuh kopi buat jawab ini. ☕";

        return finalAnswer;

    } catch (error) {
        console.error('[OLLAMA ERROR]', error.message || error);
        return "😵‍💫 Waduh, server Taktak lagi pingsan! Coba lagi nanti ya, bambang.";
    }
};


const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'taktakbot-wa' }),
    puppeteer: {
        executablePath: puppeteer.executablePath(),
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Global error handler
process.on('unhandledRejection', (reason) => {
    console.error('[UNHANDLED REJECTION]', reason);
});

client.on('qr', qr => {
    console.log('[QR EVENT] Received QR');
    qrcode.generate(qr, { small: true });
});


client.on('authenticated', () => {
    console.log('[AUTH EVENT] QR scanned! (authenticated)');
});


client.on('ready', async () => {
    console.log('[READY EVENT] Bot is ready');
});


client.on('auth_failure', msg => {
    console.error('[AUTH FAILURE] Reason:', msg);
});


client.on('disconnected', reason => {
    console.log('[DISCONNECTED] Reason:', reason);
});

client.on('message', async msg => {
    if (!msg || !msg.body) return;

    console.log(`[MESSAGE] From: ${msg.from} | Body: ${msg.body}`);

    const messageText = msg.body.trim();

    if (messageText.toLowerCase().startsWith('taktak:')) {
        const userQuestion = messageText.substring(7).trim();

        await msg.reply("🤖 Taktak AI lagi mikir keras nih...");
        await msg.reply("🤖 Sabar ya kocakk ...");

        const answer = await getOllamaChatCompletion(userQuestion);

        await msg.reply(answer);
    } else {
        await msg.reply(
            "🧠 Hallo, saya *Taktak AI* powered by *deepseek-r1*.\n\n" +
            "Ketik pertanyaanmu diawali dengan `taktak:` ya, misalnya:\n" +
            "`taktak: siapa presiden Indonesia?`\n\n" +
            "Kalau cuma ngetik doang tanpa taktak, saya jadi bingung kayak mantan pas diajak serius. 😵"
        );
    }
});


console.log('[INIT] Initializing WhatsApp client...');
client.initialize();


app.listen(port, () => {
    console.log('[SERVER] Server bot running on port ' + port);
});
