process.env.NODE_ENV='test';
const mongoose = require('mongoose');
const config = require('config');
const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('education and experience api test', () => {
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

    describe('education api test', () => {
        it('GET portfolio/education', (done) => {
            chai.request(server)
            .get('/portfolio/education')
            .end((err, res) => {
                res.should.have.status(200)
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.should.have.property('education');
                res.body.education[0].should.have.property('year')
                res.body.education[0].should.have.property('title')
                res.body.education[0].should.have.property('desc')
                done();
            });
        })

        it('POST portfolio/education', (done) => {
            chai.request(server)
            .post('/portfolio/education')
            .send({year : '2021', title : 'it is the title', desc : 'this is the desc'})
            .end((err, res) => {
                res.should.have.status(200)
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql('education added successfully');
                done();
            })
        })

        it('DELETE portfolio/education', (done) => {
            // chai.request(server)
            // .delete('/portfolio/education/')
            done()
        })
    })

    describe('experience api test', () => {
        it('GET portfolio/experience', (done) => {
            chai.request(server)
            .get('/portfolio/experience')
            .end((err, res) => {
                res.should.have.status(200)
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.should.have.property('experience');
                res.body.experience[0].should.have.property('year')
                res.body.experience[0].should.have.property('title')
                res.body.experience[0].should.have.property('desc')
                done();
            })
        })

        it('POST portfolio/experience', (done) => {
            chai.request(server)
            .post('/portfolio/experience')
            .send({year : '2021', title : 'it is the title', desc : 'this is the desc'})
            .end((err, res) => {
                res.should.have.status(200)
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.equal('experience added successfully');
                done();
            })
        })

        it('DELETE portfolio/experience', (done) => {done()})
    })


    after(()=>mongoose.connection.close())
})