$(document).ready(function() {
    
    $("#btnEditar").click(function(){
    	var idprod = $(this).data('idprod');
     	var nombre = $(this).data('nombre');
     	var descripccion = $(this).data('descripccion');
     	var precioCompra = $(this).data('preciocompra');
     	var precioVenta = $(this).data('precioventa');
     	$(".modal-content #id_prod").attr("value",idprod);
     	$(".modal-content #nombre").attr("value",nombre);
     	$(".modal-content #descripccion").attr("value",descripccion);
     	$(".modal-content #precioCompra").attr("value",precioCompra);
     	$(".modal-content #precioVenta").attr("value",precioVenta);
    }); 

	$("#btnEliminar").click(function(){
    	var idprod = $(this).data('idprod');
     	$(".modal-content #aEliminar").attr("href","/admin/delete/"+idprod);
    }); 


});