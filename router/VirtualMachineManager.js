const express = require('express');
const router = express.Router();

const vmController = require('../controller/vm-controller.js');

//Mostrar todas as máquinas virtuais
router.get('/', vmController.getVM);

//Adicionar uma nova Máquina Virtual
router.post('/', vmController.postVM);

//Alterar uma Máquina Virtual
router.patch('/', vmController.patchVM);

//Deletar Máquina Virtual
router.delete('/', vmController.deleteVM);

module.exports = router;