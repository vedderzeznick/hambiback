const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const canalSchema = new Schema({
    userID: {
        type: String,
        trim: true
    },
    canal: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Canal', canalSchema)