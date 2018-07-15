var mongoose = require('mongoose');
var Product = require('../models/product');

var ENVIRONMENT = process.env.ENVIRONMENT;
var MONGO_URI = process.env.MONGO_URI;

if (ENVIRONMENT === "production") {
    mongoose.connect(MONGO_URI);
} else {
    mongoose.connect("mongodb://sarasuser:dantedante@ds113870.mlab.com:13870/sarasdb");
}

let getDineroFinanza = () => {

    return new Promise((resolve, reject) => {

        let dineroGastado;
        let dineroRecibido;
        //recupera el dinero gastado (precio de costo)
        Product.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        dinerogastadoag: { $sum: "$purchasePrice" }
                    }
                }
            ], (error, resultado) => {
                if (error) {
                    reject(error);
                }
                else {
                    dineroGastado = resultado[0].dinerogastadoag;

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
                                    dinerorecibidoag: { $sum: "$salePrice" }
                                }
                            }
                        ], (error, resultado) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                dineroRecibido = resultado[0].dinerorecibidoag;
                                resolve({
                                    dinerogastado: dineroGastado,
                                    dinerorecibido: dineroRecibido
                                });
                            }
                        });
                }
            });
    });
}

let getProductos = () => {
   return new Promise((resolve, reject) => {
        Product.find((error, document) => {
            if (error) { 
                reject(error); 
            }
            else{
                resolve(document);
            }
        });
    });
}


module.exports.getDineroFinanza = getDineroFinanza;
module.exports.getProductos = getProductos;