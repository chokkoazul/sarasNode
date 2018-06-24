var express = require('express')
var router = express.Router()
var mongoose = require('mongoose');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

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

// index admin
router.get('/', function(req,res) {
	Product.find(function(error, document){
		if(error){console.log(error);}
		res.render("admin/index", {products : document});
	});
})

var dinerogas;
var dinerorec;
// index finanzas
router.get('/finanzas', function(req,res) {


	//recupera el dinero gastado (precio de costo)
	Product.aggregate(
    	[
    	{
            $group: {
                _id: null,
                dinerogastadoag: {$sum: "$purchasePrice"}
            }
        }
        ],function(error,resultado){
        if(error){console.log(error);}
	    dinerogas = resultado[0].dinerogastadoag;
	});

	// recupera el dinero recibido (precio de venta)
	Product.aggregate(
    	[
    	{ 
    		$match: {
        		status: "Vendido"
    		}
    	},
    	{
            $group: {
                _id: null,
                dinerorecibidoag: {$sum: "$salePrice"}
            }
        }
        ],function(error,resultado){
        if(error){console.log(error);}
		dinerorec = resultado[0].dinerorecibidoag;
	});

	// recuperar la cantidad de productos vendidos
	Product.count(function(error, cantidad){
		if(error){console.log(error);}
		
		Product.count({"status":"Vendido"},function(error, cantidadvendidos){

		var variable = {
			//"total":cantidad,
			//"vendidos":cantidadvendidos,
			"dinerogastado":dinerogas,
			"dinerorecibido":dinerorec
			//"ganancias":dinerogas-dinerorec
		};
		res.render("admin/finanzas", {modelo : variable});
		});
	});
})

// editar producto
router.post("/edit", function(req,res){
    console.log("editar");
    console.log(req.body)
    var idProd = req.body.id_prod;
    console.log(idProd);
    var data = 
	{ title: req.body.nombre,
  	  description: req.body.descripccion,
  	  salePrice: req.body.precioVenta,
  	  status: req.body.estado
  	};

  	Product.update({"_id":idProd}, data, function(error, product){
  		if(error){console.log(error);}
		res.redirect("/admin");
  	});
});

// eliminar producto
router.get("/delete/:id", function(req,res){
var id_producto = req.params.id;
	console.log(id_producto);
    
	Product.remove({"_id":id_producto}, function(error){
  		if(error){console.log(error);}
		res.redirect("/admin");
	});
});

// crear producto
router.post("/create", function(req,res){
    console.log("create");
    console.log(req.body);
	var form = new formidable.IncomingForm();
	console.log(form);
    form.parse(req, function(err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        console.log(files);
        console.log(files.imagenins);


        var old_path = files.imagenins.path;
        console.log(old_path);
        var file_size = files.imagenins.size;
        var file_ext = files.imagenins.name.split('.').pop();
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = old_path.substr(index);
        var file_name_clean = path.join(file_name + '.' + file_ext);

        var new_path = path.join('public/img/', file_name + '.' + file_ext);
        console.log("nuevo path");
        console.log(new_path);

        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(500);
                        res.json({'success': false});
                    } else {
                        //res.status(200);
                        //res.json({'success': true});


						var data = {
							title: fields.nombreins,
							description: fields.descripccionins,
							purchasePrice: fields.precioComprains,
	    					salePrice: fields.precioVentains,
							status: "En Stock",
							image: file_name_clean 
						}

						var product = new Product(data);

						product.save(function(err){
						if(err){console.log(err);}
						res.redirect("/admin");
						});



                    }
                });
            });
        });
    });
});


// crear producto automatico
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