const express = require('express')
const multer = require('multer')
const router = express.Router();




const API = require('../controllers/cemeteryController')
router.get('/', API.getAllCemeterys)
router.get('/:id', API.fetchCemeteryId)
router.post('/', API.createCemetery)
router.delete('/:id', API.deleteCemetery)
router.patch('/:id', API.updateCemetery)
router.post('/block', API.addBlocks)



module.exports = router