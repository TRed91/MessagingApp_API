const prisma = require('./client');

exports.userGet = (id) => {
    return prisma.user.findUnique({
        where: {userId: id}
    });
}

exports.userGetByName = (username) => {
    return prisma.user.findUnique({
        where: {userName: username}
    });
}

exports.userCreate = (data) => {
    return prisma.user.create({
        data: {
            userName: data.username,
            email: data.email,
            password: data.password
        }
    });
}

exports.userUpdate = (data) => {
    return prisma.user.update({
        data: {
            userName: data.username,
            email: data.email,
            about: data.about
        },
        where: {userId: data.userId},
    });
}