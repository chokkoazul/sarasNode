$(document).on("click", ".btn", function () {
     var nombre = $(this).data('nombre');
     var descripccion = $(this).data('descripccion');
     var precioCompra = $(this).data('preciocompra');
     var precioVenta = $(this).data('precioventa');
     $(".modal-content #nombre").attr("value",nombre);
     $(".modal-content #descripccion").attr("value",descripccion);
     $(".modal-content #precioCompra").attr("value",precioCompra);
     $(".modal-content #precioVenta").attr("value",precioVenta);
});