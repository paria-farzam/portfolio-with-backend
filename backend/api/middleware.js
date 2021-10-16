const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.json({ success: false, msg: "user is not logeg in" });
  else {
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if(err) throw err;
        console.log(decoded)
        req.user_id = decoded.id;
    });
  }
};

module.exports = verifyAuth;
