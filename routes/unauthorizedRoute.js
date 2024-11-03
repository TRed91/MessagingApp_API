const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(400).json({ ok: false, data: null, message: 'unauthorized' });
});

module.exports = router;