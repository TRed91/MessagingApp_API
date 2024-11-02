const prisma = require('./client');

exports.userGet = async(id) => {
    return await prisma.user.findUnique({
        where: { userId: id }
    });
}

exports.userGetByName = async(username) => {
    return await prisma.user.findUnique({
        where: { userName: username }
    });
}

exports.userCreate = async(data) => {
    return await prisma.user.create({
        data: {
            userName: data.username,
            email: data.email,
            password: data.password
        }
    });
}

exports.userUpdate = async(data) => {
    return await prisma.user.update({
        data: {
            userName: data.username,
            email: data.email,
            about: data.about
        },
        where: { userId: data.userId },
    });
}