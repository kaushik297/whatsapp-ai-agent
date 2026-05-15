import { Client, LocalAuth } from 'whatsapp-web.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import qrcode from 'qrcode';

let client = null;
let qrCodeData = null;
let isConnected = false;
let aiEnabled = true;

let currentRole = "You are a friendly, professional and helpful personal assistant.";
let currentLanguage = "Hinglish";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const languageInstructions = {
  Hindi: "Reply only in pure Hindi using Devanagari script.",
  English: "Reply only in English.",
  Hinglish: "Reply in natural Hinglish (Hindi + English mix).",
  Gujarati: "Reply only in Gujarati script."
};

export function getStatus() {
  return { connected: isConnected, qr: qrCodeData, aiEnabled };
}

export async function initializeWhatsApp() {
  if (client) return;

  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
  });

  client.on('qr', async (qr) => {
    qrCodeData = await qrcode.toDataURL(qr);
  });

  client.on('ready', () => {
    isConnected = true;
    qrCodeData = null;
    console.log("✅ WhatsApp Connected!");
  });

  client.on('message', async (message) => {
    if (!aiEnabled || message.fromMe) return;

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `${currentRole}\n\nLanguage Style: ${languageInstructions[currentLanguage]}\nKeep reply natural and short.`
      });

      const result = await model.generateContent(message.body);
      await message.reply(result.response.text());
    } catch (err) {
      console.error(err);
    }
  });

  client.initialize();
}

export function updateSettings(newRole, newLang) {
  currentRole = newRole;
  currentLanguage = newLang;
}

export function toggleAI() {
  aiEnabled = !aiEnabled;
  return aiEnabled;
}
