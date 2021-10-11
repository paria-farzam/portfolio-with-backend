const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    year : {type : String, required : true},
    title : {type : String, required : true},
    desc : {type : String, required : true}
});

module.exports = mongoose.model('Education', educationSchema);