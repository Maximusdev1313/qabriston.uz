const Person = require('../models/person')


var fs = require('fs');
const mongoose = require('mongoose')
const crypto = require('crypto');
const asyncHandler = require("express-async-handler");



module.exports = class Order {
    static getAllPersons = async (req, res) => {
        try {
            const person = await Person.find()
            res.status(200).json(person)
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }
    static fetchPersonId = asyncHandler(async (req, res) => {
        const id = req.params.id
        // hashing incoming Person id
        const hashed_id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(id).digest('hex').substring(0, 24))
        // console.log(hashed_id);

        try {


            const person = await Person.findById(hashed_id)
            res.status(200).json(person)
        } catch (error) {
            res.status(404).json({ message: error.message })
            console.log(error.message);
        }
    })
    static async updatePerson(req, res) {
        const id = req.params.id;
        const hashed_id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(id).digest('hex').substring(0, 24));

        let newPerson = req.body;
        try {
            await Person.findByIdAndUpdate(hashed_id, newPerson);
            // Trigger a 'Person-updated' event with the updated Person data
            pusher.trigger('my-channel', 'my-event', { newPerson, id });
            res.status(200).json({ message: 'updated successfully lin' });
        } catch (error) {
            res.status(404).json({ message: error.message });
            console.log(error);
        }
    }

    static async deletePerson(req, res) {
        const id = req.params.id;
        try {
            const result = await Person.findByIdAndDelete(id)

            res.status(200).json({ message: 'deleted successfully', result })
        } catch (err) {
            res.status(404).json({ message: err })
        }
    }
    static createPerson = asyncHandler(async (req, res) => {
        const PersonData = req.body;

        try {
            console.log(req.body);
            console.log(Person);

            // set the value of the _id field to the value of the PersonId field
            // PersonData._id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(PersonData.PersonId).digest('hex').substring(0, 24))
            console.log(PersonData._id);


            await Person.create(PersonData);
            res.status(201).json({ PersonData });
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(error.message)
        }
    });

}