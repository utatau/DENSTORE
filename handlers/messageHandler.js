const { handleListCommand, handleProductQuery, handleAddProduct, handleClose, handleOpen } = require('./commandHandler');

const handleMessage = async (message, client) => {
    const messageBody = message.body.toLowerCase().trim();
    if (messageBody === 'list') {
        await handleListCommand(message, client);
    }
    else if (messageBody.startsWith('addproduk')) {
        await handleAddProduct(message, client);
    } else if (messageBody.startsWith('buka')) {
        await handleOpen(message, client);
    } else if (messageBody.startsWith('tutup')) {
        await handleClose(message, client);
    } else if (messageBody.startsWith('P')) {
        await handlePending(message, client);
    } else if (messageBody.startsWith('D')) {
        await handleDone(message, client);
    }
    else {
        await handleProductQuery(message, client);
    }
};

module.exports = { handleMessage };