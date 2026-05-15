# 🤖 Personal AI Agent

A professional WhatsApp assistant powered by Google's Gemini AI. Reply to messages automatically in multiple languages (Hindi, English, Hinglish, Gujarati).

## Features

✨ **WhatsApp Integration** - Connect via QR code using whatsapp-web.js  
🤖 **AI Responses** - Powered by Google Gemini 1.5 Flash  
🌐 **Multi-Language Support** - Hindi, English, Hinglish, Gujarati  
⚙️ **Customizable Personality** - Define agent role and behavior  
🎨 **Modern Dashboard** - Built with Next.js + Tailwind CSS  
🔧 **Easy Configuration** - Change settings from the web interface  

## Project Structure

```
whatsapp-ai-agent/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── status/               # Get connection status
│   │   ├── settings/             # Save settings
│   │   └── toggle-ai/            # Toggle AI on/off
│   ├── globals.css               # Global styles
│   └── page.jsx                  # Main dashboard
├── lib/
│   └── whatsapp.js               # WhatsApp + Gemini logic
├── .env                          # Environment variables
├── .env.example                  # Example env file
├── next.config.mjs               # Next.js config
├── tailwind.config.js            # Tailwind config
├── package.json                  # Dependencies
└── README.md                     # Documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kaushiksavaliyacode/whatsapp-ai-agent.git
   cd whatsapp-ai-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   - Add your Gemini API key to `.env`
   - Get it from: https://makersuite.google.com/app/apikey

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

5. **Connect WhatsApp**
   - Scan the QR code on the dashboard
   - Use WhatsApp → Linked Devices → Link a Device

## Usage

- **Dashboard** displays WhatsApp connection status
- **Customize Role** to define agent personality
- **Select Language** for AI responses
- **Toggle AI** on/off to enable/disable responses
- Messages are automatically replied to

## Technologies

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **whatsapp-web.js** - WhatsApp automation
- **Google Gemini AI** - Generative responses
- **QRCode** - QR generation

## Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## License

MIT License - Feel free to use this project

## Support

For issues or questions, create an issue on GitHub or contact the maintainer.
