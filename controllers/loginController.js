const bcrypt = require('bcrypt');
const db = require('../db/userQueries');
const jwt = require('jsonwebtoken');

exports.loginPost = async(req, res) => {
    try {
        const user = await db.userGetByName(req.body.username);
        if (!user) {
            return res.status(400).json({ ok: false, data: null, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ ok: false, data: null, message: 'Wrong Password' });
        }

        jwt.sign({ user: user }, process.env.PASSPORT_SECRET, (err, token) => {
            if (err) {
                console.error('Error creating token', err.message);
                return res.status(500).json({ ok: false, data: null, message: err.message });
            }
            return res.json({ ok: true, data: user.userName, token: token });
        });

    }catch (err) {
        console.error('login error: ', err.message);
        return res.status(500).json({ ok: false, data: null, message: 'Server Error' });
    }
}

exports.checkToken = async(req, res) => {
    try {
        const user = await db.userGet(req.user.userId);
        if (!user) {
            return res.status(400).json({ ok: false, data: null, message: 'User not found' });
        }
        return res.json({ ok: true, data: user });
    } catch (err) {
        console.error('checking token: ', err.message);
        return res.status(500).json({ ok: false, data: null, message: err.message });
    }
}