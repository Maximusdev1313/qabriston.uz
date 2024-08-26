const Cemetery = require('../models/cemetery/cemetery')
const Blocks = require('../models/cemetery/block')

var fs = require('fs');
const mongoose = require('mongoose')
const crypto = require('crypto');
const asyncHandler = require("express-async-handler");



module.exports = class Order {
    static createCemetery = asyncHandler(async (req, res) => {
        const CemeteryData = req.body;

        try {


            const newCemetery = await Cemetery.create(CemeteryData);
            res.status(201).json(newCemetery);
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.error(error.message);
        }
    });
    static addBlocks = asyncHandler(async (req, res) => {
        const cemetery_id = req.body.parent_id
        const blocks = req.body


        try {

            const newCemetery = await Cemetery.findByIdAndUpdate(
                cemetery_id,
                { $push: { blocks: blocks } },
                { new: true }
            );
            console.log(newCemetery);
            res.status(201).json({ newCemetery })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })


    static getAllCemeterys = async (req, res) => {
        try {
            const cemetery = await Cemetery.find()
            res.status(200).json(cemetery)
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }

    static fetchCemeteryId = asyncHandler(async (req, res) => {
        const id = req.params.id
        // hashing incoming Cemetery id
        const hashed_id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(id).digest('hex').substring(0, 24))
        // console.log(hashed_id);

        try {


            const cemetery = await Cemetery.findById(hashed_id)
            res.status(200).json(cemetery)
        } catch (error) {
            res.status(404).json({ message: error.message })
            console.log(error.message);
        }
    })
    static async updateCemetery(req, res) {
        const id = req.params.id;
        const hashed_id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(id).digest('hex').substring(0, 24));

        let newCemetery = req.body;
        try {
            await Cemetery.findByIdAndUpdate(hashed_id, newCemetery);

            res.status(200).json({ message: 'updated successfully lin' });
        } catch (error) {
            res.status(404).json({ message: error.message });
            console.log(error);
        }
    }

    static async deleteCemetery(req, res) {
        const id = req.params.id;
        try {
            const result = await Cemetery.findByIdAndDelete(id)

            res.status(200).json({ message: 'deleted successfully', result })
        } catch (err) {
            res.status(404).json({ message: err })
        }
    }

}