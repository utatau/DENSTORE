const Produk = require('../models/Produk');

const handleListCommand = async (message, client) => {
    try {
        const products = await Produk.findAll({
            attributes: ['key'],
            order: [['key', 'ASC']],
            raw: true
        });

        if (products.length === 0) {
            return message.reply('Tidak ada produk yang tersedia saat ini.');
        }

        let reply = '📋 *DAFTAR PRODUK DENSTORE* 📋\n\n';
        products.forEach((product, index) => {
            reply += `${index + 1}. ${product.key}\n`;
        });
        reply += '\nKetik nama produk untuk melihat detailnya.';
        message.reply(reply);
    } catch (error) {
        console.error('error handling list command:', error);
        message.reply('Terjadi kesalahan saat mengambil daftar produk.');
    }
};

const handleProductQuery = async (message, client) => {
    try {
        const productKey = message.body.toLowerCase().trim();
        const product = await Produk.findOne({
            where: { key: productKey }
        });
        if (!product) {
            return;
        }
        message.reply(product.response);
    } catch (error) {
        console.error('error:', error);
    }
};

const handleAddProduct = async (message, client) => {
    const isAdmin = await checkIfAdmin(message.from);
    if (!isAdmin) {
        return message.reply('Maaf, hanya admin yang dapat menambah produk.');
    }

    const commandBody = message.body;
    const separatorIndex = commandBody.indexOf('|');

    if (separatorIndex === -1) {
        return message.reply('clue nya | ');
    }

    const key = commandBody.substring(10, separatorIndex).trim().toLowerCase();
    const response = commandBody.substring(separatorIndex + 1).trim();

    if (!key || !response) {
        return message.reply('key dan response jgn kosong');
    }

    try {
        const [product, created] = await Produk.findOrCreate({
            where: { key: key },
            defaults: { key, response }
        });

        if (!created) {
            product.response = response;
            await product.save();
            return message.reply(`produk berhasil update!\n\nKey: ${key}`);
        }

        message.reply(`produk berhasil ditambahkan!\n\nKey: ${key}`);
    } catch (error) {
        console.error('error add produk:', error);
        message.reply('Terjadi kesalahan saat menambahkan produk.');
    }
};

const checkIfAdmin = async (sender) => {
    try {
        const userNumber = sender.split('@')[0];
        const adminNumbers = process.env.ADMIN_NUMBERS.split(',');
        return adminNumbers.includes(userNumber);
    } catch (error) {
        console.error('error checking admin status:', error);
        return false;
    }
};

const handleOpen = async (message, client) => {
    try {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            return message.reply('Perintah ini hanya bisa digunakan di grup.');
        }
        const participant = chat.participants.find(p => p.id._serialized === client.info.wid._serialized);
        if (!participant || !participant.isAdmin) {
            return message.reply('Bot harus jadi admin untuk membuka grup.');
        }

        await chat.setMessagesAdminsOnly(false);
        message.reply(`Grup buka coi\n\nSelamat berbelanja di *DENSTORE*\n\nGrup di buka pada ${Date}`);
    } catch (error) {
        console.error('error handleOpen:', error);
        message.reply('error pas buka grup');
    }
};

const handleClose = async (message, client) => {
    try {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            return message.reply('Perintah ini hanya bisa digunakan di grup.');
        }
        const participant = chat.participants.find(p => p.id._serialized === client.info.wid._serialized);
        if (!participant || !participant.isAdmin) {
            return message.reply('Bot harus jadi admin untuk menutup grup.');
        }

        await chat.setMessagesAdminsOnly(true);
        message.reply(`Grup tutup \n\nTerimakasih sudah berbelanja di *DENSTORE*\n\nGrup tutup pada ${Date}`);
    } catch (error) {
        console.error('Error handleClose:', error);
        message.reply('Terjadi kesalahan saat menutup grup.');
    }
};

const handlePending = async (message, client) => {
    try {
        const chat = await message.getChat();
        const contact = await message.getContact();
        const participant = chat.participants.find(p => p.id._serialized === contact.id._serialized);

        if (!participant || !participant.isAdmin) {
            return message.reply('Hanya admin yang bisa menggunakan perintah ini.');
        }

        await message.reply('Pesanan di pending...');
    } catch (error) {
        console.error('Error handlePending:', error);
        message.reply('Terjadi kesalahan.');
    }
};

const handleDone = async (message, client) => {
    try {
        const chat = await message.getChat();
        const contact = await message.getContact();
        const participant = chat.participants.find(p => p.id._serialized === contact.id._serialized);

        if (!participant || !participant.isAdmin) {
            return message.reply('Hanya admin yang bisa menggunakan perintah ini.');
        }

        await message.reply('Pesanan selesai!');
    } catch (error) {
        console.error('Error handleDone:', error);
        message.reply('Terjadi kesalahan.');
    }
};

module.exports = {
    handleListCommand,
    handleProductQuery,
    handleAddProduct,
    checkIfAdmin,
    handleOpen,
    handleClose,
    handlePending,
    handleDone
};