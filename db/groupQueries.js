const prisma = require('./client');

exports.createGroup = (groupName, userId) => {
    return prisma.group.create({
        data: {
            groupName: groupName,
            users: {
                connect: {
                    userId: userId,
                },
            },
        },
    });
}

exports.updateGroupName = (groupId, groupName) => {
    return prisma.group.update({
        where: {groupId: groupId},
        data: {
            groupName: groupName,
        },
    });
}

exports.addUser = (groupId, userId) => {
    return prisma.group.update({
        where: {groupId: groupId},
        data: {
            users: {
                connect: {
                    userId: userId,
                },
            },
        },
    });
}

exports.removeUser = (groupId, userId) => {
    return prisma.group.update({
        where: {groupId: groupId},
        data: {
            users: {
                disconnect: {
                    userId: userId,
                },
            },
        },
    });
}

exports.deleteGroup = (groupId) => {
    return prisma.group.delete({
        where: {groupId: groupId},
    });
}