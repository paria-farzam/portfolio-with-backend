process.env.NODE_ENV='test';
const mongoose = require('mongoose');
const config = require('config');
const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

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

    //get method
    it('GET /portfolio/about', (done) => {
        chai
        .request(server)
        .get("/portfolio/about")
        .end((err, res)=>{
            should.not.exist(err);
            res.should.be.a('object');
            res.about.should.have.property('career');
            res.about.should.have.property('name');
            res.about.should.have.property('desc');
            done();
        })
    })
    
    //post method
    it('POST /portfolio/about', (done) => {
        chai
        .request(server)
        .post('/portfolio/about')
        .send({career : 'career', name : 'name', desc : 'desc'})
        .end((err, res)=>{
            should.not.exist(err);
            res.body.should.have.property('msg');
            res.body.msg.should.be.equal("about added successfully");
            done();
        })
    })

    after(()=>mongoose.connection.close())
})