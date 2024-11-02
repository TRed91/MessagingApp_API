const prisma = require('./client');

exports.createMassage = async(authorId, receiverId, text) => {
    return await prisma.message.create({
        data: {
            authorId: authorId,
            receiverId: receiverId,
            text: text
        },
    });
}

exports.getRecentMessagesByUserId = async(userId) => {
    return await prisma.message.findMany({
        where: { receiverId: userId },
        orderBy: { timestamp: true },
        take: 10,
    });
}

exports.getMessagesByAuthorAndReceiver = async(authorId, receiverId) => {
    return await prisma.message.findMany({
        where: {
            authorId: authorId,
            receiverId: receiverId
        },
        orderBy: {
            timestamp: true
        },
    });
}

exports.getMessagesByGroup = async(groupId) => {
    return await prisma.message.findMany({
        where: { groupId: groupId },
        orderBy: { timestamp: true }
    });
}