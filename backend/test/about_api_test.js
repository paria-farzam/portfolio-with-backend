process.env.NODE_ENV='test';
const mongoose = require('mongoose');
const config = require('config');
const about = require('../models/about');
const should = require('chai').should();

describe('about api test', () => {
    before(()=>{
        mongoose.Promise = global.Promise;
        mongoose.connect(config.DBHOST, {useNewUrlParser : true})
    })

    it('check the connection', (done) => {
        mongoose.connection
        .once('open', () => done())
        .on('error', (err) => console.log(err));
        done();
    })


    after(()=>mongoose.connection.close())
})