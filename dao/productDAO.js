var mongoose = require('mongoose');
var Product = require('../models/product');

var ENVIRONMENT = process.env.ENVIRONMENT;
var MONGO_URI = process.env.MONGO_URI;

if (ENVIRONMENT === "production") {
	mongoose.connect(MONGO_URI);
} else {
	mongoose.connect("mongodb://sarasuser:dantedante@ds113870.mlab.com:13870/sarasdb");
}

var dineroRecibido = function(callback){

    var dineGas;
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
            dineGas = resultado[0].dinerogastadoag;
            //return callback(dineGas);
        });

    var dineRec;
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
            dineRec = resultado[0].dinerorecibidoag;
            return callback(dineGas,dineRec);
        });
};

	
module.exports.dineroRecibido = dineroRecibido;
