const localCtrl = require('./../../src/controllers/local.controller');


const express = require('express');
const router = express.Router();


router.post('/', localCtrl.createLocal);

module.exports = router;