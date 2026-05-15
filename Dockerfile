FROM node:20-slim

# Chromium + dependencies (whatsapp-web.js ke liye zaroori)
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg \
    fonts-kacst fonts-freefont-ttf libxss1 \
    libnss3 libatk-bridge2.0-0 libdrm2 libxkbcommon0 \
    libxcomposite1 libxdamage1 libxrandr2 libgbm1 libasound2 \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV NODE_ENV=production

WORKDIR /app

# Package files copy karke install
COPY package*.json ./
RUN npm ci --only=production

# Baaki saara code copy
COPY . .

# Next.js build
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
