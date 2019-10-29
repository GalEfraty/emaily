const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => console.log("Error cannot connect to mongoDB: " + err));

if (process.env.NODE_ENV === "production") {
  //express will serve up production assets (js or css file like main.js or main.css)
  //=> if ther's an income request, that i dont recpgnize, look up at client/build - maybe there the route defined
  app.use(express.static("client/build"));

  //express will serve up the index.hrml file if it doesnt recognize the path
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT);
