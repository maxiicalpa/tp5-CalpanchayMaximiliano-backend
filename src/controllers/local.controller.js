const local = require('./../models/local.model');
const localCtrl = {};

localCtrl.createLocal = async (req, res) => {
    try {
        await local.create(req.body);
        res.json({ status: '1', msg: 'Local agregado.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

module.exports = localCtrl;