var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var admin = require('./routes/admin')



var ENVIRONMENT = process.env.ENVIRONMENT;
var MONGO_URI = process.env.MONGO_URI;

if (ENVIRONMENT === "production") {
	mongoose.connect(MONGO_URI);
} else {
	mongoose.connect("mongodb://sarasuser:dantedante@ds113870.mlab.com:13870/sarasdb");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","jade");
app.use(express.static("public"));
app.get("/", function(req,res){

res.render("index");
});

app.use('/admin', admin);

app.listen(process.env.PORT || 3000);
