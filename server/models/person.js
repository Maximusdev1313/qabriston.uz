const mongoose = require('mongoose')
const PersonSchema = mongoose.Schema({
    name: String, // o'tgan inson nomi
    surname: {
        type: String, // o'tgan inson familiyasi
        required: true // bu maydon bo'sh bo'lishi mumkin emas
    },
    middle_name: {
        type: String,
        required: false
    }, // otasini ismi(agar bo'lsa)
    age: {
        type: Number, // o'tgan inson yosh
        required: true
    },
    gender: {
        type: String, // o'tgan inson jinsi
        enum: ['male', 'female'], // jinslar ro'yxati
        required: true
    },
    row: Number,
    column: Number,
    number: Number, // joy raqami
    cemetery_name: String, // qabriston nomi(registratsiya qilingandan keyin avtomatik qilinadi)
    location: {
        type: String,
        default: ''
    }, // kere bop qolar
    comment: {
        type: String,
        default: ''
    }, // yaxshi narsalar
    date_of_birth: {
        type: String,
        required: true
    }, // tug'ilgan yil kun sana
    date_of_death: {
        type: String,
        required: true
    }, // o'lgan yil kun sana
    created: {
        type: Date,
        default: Date.now()
    }, // bu o'zi qoladi
    registered_by: {
        type: String,
        default: ''
    }, // kim tomonidan ro'yxatga olindi(registratsiya qilingandan keyin avtomatik qilinadi)
})
module.exports = mongoose.model('Person', PersonSchema)

