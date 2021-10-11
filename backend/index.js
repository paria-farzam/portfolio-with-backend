const express = require('express');
const router = express.Router();

const aboutAPI = require('./api/about');
const educationAPI = require('./api/education');
const experienceAPI = require('./api/experience');
const loginAPI = require('./api/login');
const messageAPI = require('./api/messages');

//home
router.get('/', aboutAPI.index.bind(aboutAPI));
router.post('/', aboutAPI.store.bind(aboutAPI));

//resume
function resume(){
    return resume = [
        educationAPI.index.bind(educationAPI),
        experienceAPI.index.bind(experienceAPI)
    ]
}
router.get('/', resume);
router.post('/education', educationAPI.store.bind(educationAPI));
router.post('/experience', experienceAPI.store.bind(experienceAPI));

//message and send message from contact route
router.post('/conntact', messageAPI.store.bind(messageAPI));
router.get('/conntact', messageAPI.index.bind(messageAPI));

//login
router.post('/login', loginAPI.login.bind(loginAPI))

module.exports = router;