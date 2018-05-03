var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var method_override = require("method-override");
var app = express();



var env = process.env.ENVIRONMENT;

if (env === "PROD") {
	console.log("es production");
	mongoose.connect("mongodb://sarasuser:dantedante@ds113870.mlab.com:13870/sarasdb");
} else {
	mongoose.connect("mongodb://localhost/saradb");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(method_override("_method"));

var productShema = {
	title:String,
	description:String,
	pricing:Number,
	status:String
};

var Product = mongoose.model("Product", productShema);

app.set("view engine","jade");
app.use(express.static("public"));
app.get("/", function(req,res){
	var data = {
		title: "pantalon",
		description: "muy lindo",
		pricing: 10000,
		status: "Vendido"
	}

	var product = new Product(data);

	product.save(function(err){
console.log("products"+product);
	});

res.render("index");
});

app.get("/admin", function(req,res){
	Product.find(function(error, document){
		if(error){console.log(error);}
		res.render("admin/index", {products : document});
	});


});

app.get("/admin2", function(req,res){
	Product.find(function(error, document){
		if(error){console.log(error);}
		res.render("admin/index2", {products : document});
	});


});


app.post("/admin/edit", function(req,res){
    var idProd = req.body.id_prod;
    var data = 
	{ title: req.body.title,
  	  description: req.body.description,
  	  status:req.body.status
  	};

  	Product.update({"_id":idProd}, data, function(error, product){
  		if(error){console.log(error);}
		res.redirect("/admin2");
  	});
});


app.get("/admin/edit/:id", function(req,res){
var id_producto = req.params.id;
	Product.findOne({"_id":id_producto}, function(error,producto){
		res.render("admin/edit", {product : producto});
	});
});

app.get("/admin/delete/:id", function(req,res){
var id_producto = req.params.id;
	Product.remove({"_id":id_producto}, function(error){
  		if(error){console.log(error);}
		res.redirect("/admin2");
	});
});

app.post("/admin", function(req,res){
if(req.body.password=="123"){
	Product.find(function(error, document){
		if(error){console.log(error);}
		res.render("menu/index", {products : document});
	});
}
else{
	res.redirect("/");
}
});


app.get("/admin", function(req,res){
	res.render("admin/form");
});


app.listen(8080);