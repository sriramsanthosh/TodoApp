const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.port || 8000;

const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", require("./routes/index"));

app.listen(port, function(err){
    if(err){
        console.log(`Error occured while running the server at ${port}`);
    }
    console.log(`Yup! Successfully running server on ${port}`);
});