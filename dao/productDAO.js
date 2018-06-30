var mongoose = require('mongoose');
var Product = require('../models/product');

var ENVIRONMENT = process.env.ENVIRONMENT;
var MONGO_URI = process.env.MONGO_URI;

if (ENVIRONMENT === "production") {
	mongoose.connect(MONGO_URI);
} else {
	mongoose.connect("mongodb://sarasuser:dantedante@ds113870.mlab.com:13870/sarasdb");
}

var dineroGastado = function(callback){

    var dine;
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
            dine = resultado[0].dinerogastadoag;
            return callback(dine);
        });
};

var dineroRecibido = function(callback){

    var dine;
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
            dine = resultado[0].dinerorecibidoag;
            return callback(dine);
        });
};

	
module.exports.dineroGastado = dineroGastado;
module.exports.dineroRecibido = dineroRecibido;
