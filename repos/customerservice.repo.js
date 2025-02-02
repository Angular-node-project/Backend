const Support = require('../models/support.model');

const sendMessage = async (message) => {
    try {
        return Support.create(message);
    } catch (error) {
        console.error("Error sending message:", error.message);
        return {
            success: false,
            message: error.message
        };
    }
}

const getMessages = async () => {
    try {
        return Support.find();
    } catch (error) {
        console.error("Error getting messages:", error.message);
        return {
            success: false,
            message: error.message
        };
    }
}

module.exports = { sendMessage,getMessages };

