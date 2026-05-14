require('dotenv').config();

const express = require('express');
const axios = require('axios');
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "business-bot"
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});

client.on('qr', (qr) => {

    console.log('============================');
    console.log('SCAN THIS QR WITH WHATSAPP');
    console.log('============================');

    qrcode.generate(qr, { small: true });

});

client.on('ready', () => {

    console.log('WhatsApp AI Bot Ready');

});

client.on('authenticated', () => {

    console.log('Authenticated Successfully');

});

client.on('disconnected', () => {

    console.log('Disconnected');
    console.log('Reconnecting...');

    client.initialize();

});

setInterval(() => {

    if (!client.info) {

        console.log('Auto reconnect running...');
        client.initialize();

    }

}, 60000);

client.on('message', async (message) => {

    try {

        const prompt = `
You are Gujarati business AI assistant.

Rules:
- Reply in Gujarati if user speaks Gujarati
- Reply in Hindi if user speaks Hindi
- Reply in English if user speaks English
- Keep replies short
- Be polite and professional

Customer Message:
${message.body}
`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            }
        );

        const reply =
            response.data.candidates[0].content.parts[0].text;

        await message.reply(reply);

    } catch (err) {

        console.log(err);

        await message.reply('Server busy. Please try again later.');

    }

});

client.initialize();

app.get('/', (req, res) => {

    res.send('WhatsApp AI Bot Running');

});

app.listen(process.env.PORT || 3000, () => {

    console.log('Server Running');

});
