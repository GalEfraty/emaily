const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //cookie expmire in 30 days
    keys: [keys.cookieKey] //to encrypt the cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => console.log("Error on start: " + err.stack));

app.listen(PORT);
