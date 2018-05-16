var express = require('express')
var router = express.Router()
var mongoose = require('mongoose');

var ENVIRONMENT = process.env.ENVIRONMENT;
var MONGO_URI = process.env.MONGO_URI;

var app = express();

if (ENVIRONMENT === "production") {
	mongoose.connect(MONGO_URI);
} else {
	mongoose.connect("mongodb://sarasuser:dantedante@ds113870.mlab.com:13870/sarasdb");
}


var productShema = {
	title:String,
	description:String,
	purchasePrice:Number,
    salePrice:Number,
	status:String,
	image:String
};

var Product = mongoose.model("Product", productShema);

router.get('/', function(req,res) {
	Product.find(function(error, document){
		if(error){console.log(error);}
		res.render("admin/index2", {products : document});
	});
})

router.post("/edit", function(req,res){
    console.log("editar");
    console.log(req.body)
    var idProd = req.body.id_prod;
    console.log(idProd);
    var data = 
	{ title: req.body.nombre,
  	  description: req.body.descripccion,
  	  salePrice: req.body.precioVenta,
  	  status: req.body.estado,
  	  image: "chaquetanegra.jpg"
  	};

  	Product.update({"_id":idProd}, data, function(error, product){
  		if(error){console.log(error);}
		res.redirect("/admin");
  	});
});

router.get("/delete/:id", function(req,res){
var id_producto = req.params.id;
	console.log(id_producto);
    
	Product.remove({"_id":id_producto}, function(error){
  		if(error){console.log(error);}
		res.redirect("/admin");
	});
});

router.get('/crearproductoauto', function(req,res) {
	var data = {
		title: "pantalon",
		description: "muy lindo",
		purchasePrice: 10000,
	    salePrice: 10123,
		status: "Vendido",
		image: "chaquetanegra.jpg"
	}

	var product = new Product(data);

	product.save(function(err){
		console.log("products"+product);
	});
	
})

module.exports = router;