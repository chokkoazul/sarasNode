var mongoose = require('mongoose');
var Product = require('../models/product');
var axios = require('axios');
var apiUrl = "https://sarasrest.herokuapp.com/sarasapi/products";

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
        axios.get(apiUrl)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

let deleteProduct = (idProd) => {
    return new Promise((resolve, reject) => {
        console.log("...............id de producto desde dao..." + idProd);
        axios.delete(apiUrl.concat("/").concat(idProd))
            .then(function (response) {
                resolve(`Producto con id ${idProd} ha sido eliminado`);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

let updateProduct = (product) => {
    return new Promise((resolve, reject) => {
        axios.put(apiUrl, product)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });

    });
}

module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getDineroFinanza = getDineroFinanza;
module.exports.getProductos = getProductos;