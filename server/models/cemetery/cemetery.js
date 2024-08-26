const mongoose = require('mongoose');
const BlockSchema = require('./block')

const CemeterySchema = mongoose.Schema({
    name: String,
    blocks: [BlockSchema],
    address: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    comment: {
        type: String,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cemetery', CemeterySchema);
