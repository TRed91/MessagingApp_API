const prisma = require('./client');

exports.createGroup = async(groupName, userId) => {
    return await prisma.group.create({
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

exports.updateGroupName = async(groupId, groupName) => {
    return await prisma.group.update({
        where: { groupId: groupId },
        data: { 
            groupName: groupName,
        },
    });
}

exports.addUser = async(groupId, userId) => {
    return await prisma.group.update({
        where: { groupId: groupId },
        data: { 
            users: {
                connect: {
                    userId: userId,
                },
            },
        },
    });
}

exports.removeUser = async(groupId, userId) => {
    return await prisma.group.update({
        where: { groupId: groupId },
        data: { 
            users: {
                disconnect: {
                    userId: userId,
                },
            },
        },
    });
}

exports.deleteGroup = async(groupId) => {
    return await prisma.group.delete({
        where: { groupId: groupId },
    });
}