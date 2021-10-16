const controller = require("./controller");
const {validationResult} = require('express-validator');

module.exports = new (class messages extends controller {
  index(req, res) {
    this.model.message.find({}, (err, message) => {
      if (err) throw err;
      if (message.length > 0) return res.json({ message });
      else return res.json('no message yet')
    });
  }

  store(req, res) {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    new this.model.message({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    }).save(err => {
      if(err) throw err;
      else res.json('your message sent!');
    })
  }

  destroy(req, res){
    this.model.message.findOneAndRemove(req.params.id, (err)=>{
      if(err) throw err;
      else res.json('message deleted');
    })
  }
})();
