const express = require('express')
const multer = require('multer')
const router = express.Router();




const API = require('../controllers/personController')
router.get('/', API.getAllPersons)
router.get('/:id', API.fetchPersonId)
router.post('/', API.createPerson)
router.delete('/:id', API.deletePerson)
router.patch('/:id', API.updatePerson)


module.exports = router