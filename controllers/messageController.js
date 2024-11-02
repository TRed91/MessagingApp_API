const messageDb = require('../db/messageQueries');
const userDb = require('../db/userQueries');

exports.createMessage = async(req, res) => {
    try {
        const receiver = await userDb.userGetByName(req.body.receiver);
        if (!receiver) {
            return res.status(400).json({ ok: false, data: 'Receiver not found.' })
        }
        const result = await messageDb.createMassage(req.params.userId, receiver.userId, req.body.message);
        return res.json({ ok: true, data: result });
    } catch (err) {
        console.error('Error creating message: ', err.message);
        return res.status(500).json({ ok: false, data: err.message });
    }
}

exports.getRecentMessages = async(req, res) => {
    try {
        const messages = await messageDb.getRecentMessagesByUserId(req.params.userId);
        return res.json({ ok: true, data: messages });
    } catch (err) {
        console.error('Error getting recent messages: ', err.message);
        return res.status(500).json({ ok: false, data: err.message })
    }
}

exports.getPrivateChats = async(req, res) => {
    try {
        const { authorId, receiverName } = req.params;
        const receiver = await userDb.userGetByName(receiverName);
        const messages = await messageDb.getMessagesByAuthorAndReceiver(authorId, receiver.userId);
        return res.json({ ok: true, data: messages });
    } catch (err) {
        console.error('Error getting private chats: ', err.message);
        return res.status(500).json({ ok: false, data: err.message })
    }
}

exports.getGroupMessages = async(req, res) => {
    try {
        const messages = await messageDb.getMessagesByGroup(req.params.groupId)
        return res.json({ ok: true, data: messages });
    } catch (err) {
        console.error('Error getting group messages: ', err.message);
        return res.status(500).json({ ok: true, data: err.message });
    }
}