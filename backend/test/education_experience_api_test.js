process.env.NODE_ENV='test';
const mongoose = require('mongoose');
const config = require('config');
const chai = require('chai');
const should = chai.should();
const server = require('../server');
const education = require('../models/education');
const experience = require('../models/experience');
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
                for(let i = 0; i < res.body.education.length; i++){
                    res.body.education[i].should.have.property('year')
                    res.body.education[i].should.have.property('title')
                    res.body.education[i].should.have.property('desc')
                }
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
            let educationData = education.findOne({year : '2021', title : 'it is the title', desc : 'this is the desc'});
            let id = educationData._id;
            chai.request(server)
            .delete(`/portfolio/education/${id}`)
            .end((err, res)=>{
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('item deleted');
                done()
            })
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
                for(let i = 0; i < res.body.experience.length; i++){
                    res.body.experience[i].should.have.property('year')
                    res.body.experience[i].should.have.property('title')
                    res.body.experience[i].should.have.property('desc')
                }
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

        it('DELETE portfolio/experience', (done) => {
            let experienceData = experience.findOne({year : '2021', title : 'it is the title', desc : 'this is the desc'});
            let id = experienceData._id;
            chai.request(server)
            .delete(`/portfolio/experience/${id}`)
            .end((err, res)=>{
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('item deleted successfully');
                done()
            })
        })
    })


    after(()=>mongoose.connection.close())
})