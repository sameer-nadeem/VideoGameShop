const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const config = require("config");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const setRoutes = require("./middleware/setUpRoutes").setRoutes;
const setGlobals = require('./middleware/middlewares').setGlobals
const initSession = require('./middleware/middlewares').initSession
var cookieParser = require('cookie-parser');
const connectToDatabase = require("./db/db").connectToDatabase;
const db_conn = require("./db/db").getDatabase();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));


app.use(
  session({
    secret: `${config.get("session_secret")}`,
    saveUninitialized: true,
    resave: false,
    maxAge:500000,
    cookie: { 
      maxAge:500000
    }
  })
);

app.use(cookieParser());
app.use(flash());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const db = connectToDatabase();

app.use(initSession)
app.use(setGlobals)

setRoutes(app);

app.listen(5000, () => {
  console.log("Server started at port: ", 5000);
});
