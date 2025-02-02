const { sendMessage, getMessages } = require('../repos/customerservice.repo');


module.exports.sendMessage = async (message) => {
    return sendMessage(message);
}

module.exports.getMessages = async () => {
    return getMessages();
}
