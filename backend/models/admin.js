const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
    username : {type : String, required : true},
    password : {type : String, required : true},
    token : {type : String, default : null}
})

adminSchema.pre('save', async function(next){
    let hashedPass = await bcrypt.hash(this.password, 10);
    this.password = hashedPass;
    next();
})

module.exports = mongoose.model('Admin', adminSchema);