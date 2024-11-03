const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../db/userQueries');

const validation = [
    body('username').trim()
        .isLength({ min: 1 })
        .withMessage("Username is required"),
    body('email').trim()
        .isEmail()
        .withMessage("Email address invalid"),
    body('password').trim()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    body('cpw').trim()
        .custom((cpw, {req}) => cpw === req.body.password)
        .withMessage("Passwords must match")
]

const validationUpdate = [
    body('username').trim()
        .isLength({ min: 1 })
        .withMessage("Username is required"),
    body('email').trim()
        .isEmail()
        .withMessage("Email address invalid"),
]

exports.userGet = async(req, res) => {
    try {
        const user = await db.userGet(parseInt(req.params.userId));
        if (!user) {
            return res.status(400).json({ ok: false, data: null, message: 'User not found'});
        }
        return res.json({ ok: true, data: user })
    } catch (err) {
        console.error("Error finding user: ", err.message);
        return res.status(500).json({ ok: false, data: null, message: err.message});
    }

}

exports.userCreate = [
    validation,

    (req, res) => {
        const { username, email, password } = req.body;
        const errors = validationResult(req);
        const errorMessages = errors.array().map(e => e.msg);

        if (!errors.isEmpty()) {
            return res.status(400).json({ ok: false, data: null, message: errorMessages });
        }

        bcrypt.hash(password, 10, async(err, hashedPw) => {
            if (err) {
                console.error('Hashing error: ', err.message);
                return res.status(500).json({ ok: false, 
                                            data: null,
                                            message: "Error during encryption" });
            }
            try {
                const result = await db.userCreate({ username, email, password: hashedPw });
                console.log('user created: ', result);
                return res.json({ ok: true, data: result });
            } catch (err) {
                console.log(err)
                let errMsg = 'Connection Error';
                if (err.meta) {
                    errMsg = `Username ${username} already exists`
                }
                console.error('user create error: ', err.message);
                return res.status(500).json({ ok: false, data: null, message: errMsg });
            }
        });
    }
];

exports.userUpdate = [
    validationUpdate,

    async (req, res) => {
        const { username, email, about } = req.body;
        const userId = parseInt(req.params.userId);

        const errors = validationResult(req);
        const errorMessages = errors.array().map(e => e.msg);

        if (!errors.isEmpty()) {
            return res.status(400).json({ ok: false, data: null, messages: errorMessages });
        }
        try {
            const result = await db.userUpdate({ userId, username, email, about });
            console.log('user updated: ', result);
            return res.json({ ok: true, data: result });
        } catch (err) {
            console.error('user create error: ', err.message);
            return res.status(500).json({ ok: false, data: null, message: err.message });
        }
    }
];