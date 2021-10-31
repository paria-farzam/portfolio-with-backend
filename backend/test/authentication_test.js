process.env.NODE_ENV='test';
const mongoose = require('mongoose');
const config = require('config');
const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('authentication api test', () => {
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

    it('POST portfolio/register', (done) => {
        chai
        .request(server)
        .post('/portfolio/register')
        .send({username : 'hello133', password : '1234'})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.have.property('msg').eql("admin added successfully");

            done();
        })
    })

    it('POST portfolio/login', (done) => {
        chai
        .request(server)
        .post('/portfolio/login')
        .send({username : 'hello1234', password : '1234'})
        .end((err, res) => {
            res.body.should.have.property('username');
            res.body.should.have.property('accessToken');
            console.log(res.body)
            done();
        })
    })

    it('POST portfolio/logout', (done) => {
        chai
        .request(server)
        .post('/portfolio/logout')
        .set({'authentication' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTdlNzg3ZTJmMDc0NDg5NGQ4MTViODUiLCJpYXQiOjE2MzU2NzkzMzAsImV4cCI6MTYzODI3MTMzMH0.HyhxZs-FvwuxGeYIBXPs-g4Q-sH9eW9UAd-9tQmmYBM'})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            console.log(res.body)
            res.body.should.have.property('msg').eql("you're logged out");
            done();
        })
    })

    after(()=>mongoose.connection.close())
})