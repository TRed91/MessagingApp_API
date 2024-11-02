const bcrypt = require('bcrypt');
const db = require('../db/userQueries');
const jwt = require('jsonwebtoken');

exports.loginPost = async(req, res) => {
    try {
        const user = await db.userGetByName(req.body.username);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Wrong Password' });
        }

        jwt.sign({ user: user }, 'dinkelberg', (err, token) => {
            if (err) {
                console.error('Error creating token', err.message);
                return res.status(500).json({ success: false, message: err.message });
            }
            return res.json({ success: true, message: user.userName, token: token });
        });

    }catch (err) {
        console.error('login error: ', err.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}