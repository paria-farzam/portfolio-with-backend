const LocalStrategy = require("passport-local").Strategy;

function initialize(passport, getUserByName, getUserById) {
  const authenticateUser = async (name, password, done) => {
    const user = await getUserByName(name);
    if (user == null) return done(null, false, { message: "sorry! user name is not exist" });
    if(password == user.password){
        return done(null, user);
    } else done(null, false, {message : "incorrect password"});
  };
  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done)=> done(null, user.id));
  passport.deserializeUser((id, done)=> done(null, getUserById(id)));
}

module.exports = initialize;