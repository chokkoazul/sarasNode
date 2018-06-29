$(document).ready(function() {
	
	gastado = $('#gastado').val();
	recibido = $('#recibido').val();
	completo = $('#completo').val();
	console.log("gastado desde ready"+gastado);
	console.log("recibido desde ready"+recibido);
	

	$(".btn").on('click', function(){

    if($(this).attr('id')=='btnEditar'){
        var idprod = $(this).data('idprod');
     	var nombre = $(this).data('nombre');
     	var descripccion = $(this).data('descripccion');
     	var category = $(this).data('category');
     	var precioCompra = $(this).data('preciocompra');
     	var precioVenta = $(this).data('precioventa');
     	var estado = $(this).data('estado');
     	$(".modal-content #id_prod").attr("value",idprod);
     	$(".modal-content #nombre").attr("value",nombre);
     	$(".modal-content #descripccion").attr("value",descripccion);
     	$(".modal-content #category").attr("value",category);
     	$(".modal-content #precioCompra").attr("value",precioCompra);
     	$(".modal-content #precioVenta").attr("value",precioVenta);
     	$(".modal-content #estado").attr("value",estado);
    }
    else if($(this).attr('id')=='btnEliminar'){
        var idprod2 = $(this).data('idprod');
        $(".modal-content #aEliminar").attr("href","/admin/delete/"+idprod2);
    }
   
	});
	
	var chart;

	var chartData = [
		{
			"item": "Gastado",
			"pesos": gastado,
			"color": "#FF0F00"
		},
		{
			"item": "Recibido",
			"pesos": recibido,
			"color": "#3ADF00"
		},
		{
			"item": "",
			"pesos": 0,
			"color": "#FF6600"
		}
	];


	AmCharts.ready(function () {
		// SERIAL CHART
		chart = new AmCharts.AmSerialChart();
		chart.dataProvider = chartData;
		chart.categoryField = "item";
		// the following two lines makes chart 3D
		chart.depth3D = 20;
		chart.angle = 30;

		// AXES
		// category
		var categoryAxis = chart.categoryAxis;
		categoryAxis.labelRotation = 90;
		categoryAxis.dashLength = 5;
		categoryAxis.gridPosition = "start";

		// value
		var valueAxis = new AmCharts.ValueAxis();
		valueAxis.title = "Pesos";
		valueAxis.dashLength = 5;
		chart.addValueAxis(valueAxis);

		// GRAPH
		var graph = new AmCharts.AmGraph();
		graph.valueField = "pesos";
		graph.colorField = "color";
		graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
		graph.type = "column";
		graph.lineAlpha = 0;
		graph.fillAlphas = 1;
		chart.addGraph(graph);

		// CURSOR
		var chartCursor = new AmCharts.ChartCursor();
		chartCursor.cursorAlpha = 0;
		chartCursor.zoomable = false;
		chartCursor.categoryBalloonEnabled = false;
		chart.addChartCursor(chartCursor);

		chart.creditsPosition = "top-right";


		// WRITE
		chart.write("chartdiv");
	});


});

function mostrarGrafico(gastado,recibido){
	console.log("gastado..."+gastado);
	console.log("recibido..."+recibido);
	
}