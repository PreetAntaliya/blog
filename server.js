const express = require("express");
const port = 8000;
const db = require('./config/db')
const path = require("path");
const app = express();

app.set('view engine','ejs')
app.use(express.urlencoded())

app.use("/public",express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use('/',require('./routes/index'))


app.listen(port,(err) =>{
    if(err){
        console.log(err);
    }
    console.log(`Server is running...`);
})