const prisma = require('./client');

exports.userGet = async(id) => {
    return prisma.user.findUnique({
        where: {userId: id}
    });
}

exports.userGetByName = async(username) => {
    return prisma.user.findUnique({
        where: {userName: username}
    });
}

exports.userCreate = async(data) => {
    return prisma.user.create({
        data: {
            userName: data.username,
            email: data.email,
            password: data.password
        }
    });
}

exports.userUpdate = async(data) => {
    return prisma.user.update({
        data: {
            userName: data.username,
            email: data.email,
            about: data.about
        },
        where: {userId: data.userId},
    });
}