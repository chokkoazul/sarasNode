$(document).on("click", ".btn", function () {
     var nombre = $(this).data('nombre');
     var descripccion = $(this).data('descripccion');
     var precioCompra = $(this).data('preciocompra');
     var precioVenta = $(this).data('precioventa');
     $(".modal-body #nombre").val(nombre);
     $(".modal-body #descripccion").val(descripccion);
     $(".modal-body #precioCompra").val(precioCompra);
     $(".modal-body #precioVenta").val(precioVenta);
     $(".modal-footer #linkeditar").attr("href", "/admin/edit");
       
});