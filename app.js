const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { connectDB } = require('./config/database');
const { handleMessage } = require('./handlers/messageHandler');
const startApp = async () => {
    try {
        await connectDB();
        console.log('database konek, memulai bot whatsapp');
        const bot = new Client({
            authStrategy: new LocalAuth({
                clientId: process.env.SESSION_NAME || "default-client"
            }),
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });
        bot.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
            console.log('scan qr buat login whatsapp');
        });
        bot.on('ready', () => {
            console.log('bot wa ready');
        });
        bot.on('message', async (message) => {
            if (message.from === 'status@broadcast') return;
            try {
                await handleMessage(message, bot);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });
        bot.initialize();
        process.on('SIGINT', async () => {
            console.log('mematikan bot...');
            await bot.destroy();
            process.exit(0);
        });
        // bot.on('message', async (message) => {
        //     console.log(message.from);
        //     console.log('isi pesan: ', message.body);
        // })

    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
};
startApp();