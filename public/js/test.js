$(document).ready(function() {
	
    $(".btn").on('click', function(){

    if($(this).attr('id')=='btnEditar'){
        var idprod = $(this).data('idprod');
     	var nombre = $(this).data('nombre');
     	var descripccion = $(this).data('descripccion');
     	var precioCompra = $(this).data('preciocompra');
     	var precioVenta = $(this).data('precioventa');
     	var estado = $(this).data('estado');
     	$(".modal-content #id_prod").attr("value",idprod);
     	$(".modal-content #nombre").attr("value",nombre);
     	$(".modal-content #descripccion").attr("value",descripccion);
     	$(".modal-content #precioCompra").attr("value",precioCompra);
     	$(".modal-content #precioVenta").attr("value",precioVenta);
     	$(".modal-content #estado").attr("value",estado);
    }
    else if($(this).attr('id')=='btnEliminar'){
        var idprod2 = $(this).data('idprod');
        $(".modal-content #aEliminar").attr("href","/admin/delete/"+idprod2);
    }
   
    });


});