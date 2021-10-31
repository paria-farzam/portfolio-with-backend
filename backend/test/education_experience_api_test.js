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
        it('GET portfolio/education', async () => {
            chai.request(server)
            .get('/portfolio/education')
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.should.have.property('education');
                res.body.education.should.have.property('year')
                res.body.education.should.have.property('titlr')
                res.body.education.should.have.property('desc')
            });
        })

        it('POST portfolio/education', async () => {
            chai.request(server)
            .post('/portfolio/education')
            .send({year : '2021', title : 'it is the title', desc : 'this is the desc'})
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.equal('education added successfully');
            })
        })

        it('DELETE portfolio/education', async () => {
            chai.request(server)
            .delete('/portfolio/education')
        })
    })

    describe('experience api test', () => {
        it('GET portfolio/experience', async () => {
            chai.request(server)
            .get('/portfolio/experience')
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.should.have.property('experience');
                res.body.experience.should.have.property('year')
                res.body.experience.should.have.property('titlr')
                res.body.experience.should.have.property('desc')
            })
        })

        it('POST portfolio/experience', async () => {
            chai.request(server)
            .post('/portfolio/experience')
            .send({year : '2021', title : 'it is the title', desc : 'this is the desc'})
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.equal('experience added successfully');
            })
        })

        it('DELETE portfolio/experience', async () => {})
    })


    after(()=>mongoose.connection.close())
})