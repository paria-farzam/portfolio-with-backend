const controller = require("./controller");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../tokens/tokens");

module.exports = new (class authentication extends controller {
  async register(req, res) {
    const { username, password } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check if username is exist
    this.model.admin.find({ username: username }, (err, admin) => {
      if (err) throw err;

      if (admin.length > 0) {
        return res.json("user already exist");
      }
    });

    //add admin
    new this.model.admin({
      username: username,
      password: password,
    }).save((err) => {
      if (err) throw err;
      return res.json("admin added successfully");
    });
  }

  login(req, res) {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    this.model.admin.findOne(
      { username: req.body.username },
      async function (err, user) {
        if (err) return res.send({ error: `${err.message}` });
        if (user == null)
          return res.json({ auth: false, message: "incorrect username" });
        else {
          await bcrypt.compare(
            req.body.password,
            user.password,
            async (err, result) => {
              if (err) return res.send({ error: `${err.message}` });
              if (!result)
                return res.json({
                  auth: false,
                  message: "incorrect password!",
                });
              if (result) {
                const accessToken = await createAccessToken(user.id);
                // const refreshToken = createRefreshToken(user.id);
                user.token = accessToken;
                // sendRefreshToken(res, refreshToken);
                sendAccessToken(req, res, accessToken);
                return res.json({ token: accessToken });
              }
            }
          );
        }
      }
    );
  }
  
    getToken(req, res){
      let authorization = localStorage.getItem('authentication');
      if(authorization !== null){
        let token = authorization.split(' ')[1];
        return res.json({token, auth : true});
      } else return res.json({auth : false});
    }

  logout(req, res) {
    localStorage.removeItem("authentication");
    this.model.admin.find(
      { token: req.headers["authentication"] },
      (err, user) => {
        if (err) throw err;
        user.token = "";
        return res.json("you're logged out");
      }
    );
  }
})();
