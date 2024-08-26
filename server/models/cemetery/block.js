const mongoose = require('mongoose');

const BlockSchema = mongoose.Schema({
    rows: {
        type: Number,
        required: true
    },
    columns: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('BlockSchema', BlockSchema);

module.exports = BlockSchema
