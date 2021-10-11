const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    career : {type : String, required : true},
    name : {type : String, required : true},
    desc : {type : String, required : true}
})

module.exports = mongoose.model('About', aboutSchema);