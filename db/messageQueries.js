const prisma = require('./client');

exports.createMassage = (authorId, receiverId, text) => {
    return prisma.message.create({
        data: {
            authorId: authorId,
            receiverId: receiverId,
            messageText: text
        },
    });
}

exports.getRecentMessagesByUserId = (userId) => {
    return prisma.message.findMany({
        where: {receiverId: userId},
        include: { author: true },
        orderBy: {timestamp: 'desc'},
        take: 4,
    });
}

exports.getMessagesByAuthorAndReceiver = (authorId, receiverId) => {
    return prisma.message.findMany({
        where: {
            OR: [
                {authorId: authorId, receiverId: receiverId},
                {authorId: receiverId, receiverId: authorId},
            ],
        },
        include: { author: true },
        orderBy: {
            timestamp: 'desc',
        },
    });
}

exports.getMessagesByGroup = (groupId) => {
    return prisma.message.findMany({
        where: {groupId: groupId},
        orderBy: {timestamp: 'desc'}
    });
}