$(document).ready(function() {
	
	gastado = $('#gastado').val();
	recibido = $('#recibido').val();
	completo = $('#completo').val();
	console.log("gastado desde ready"+gastado);
	console.log("recibido desde ready"+recibido);
	

	$(".btn").on('click', function(){

    if($(this).attr('id')=='btnEditar'){
		var idprod = $(this).data('idprod');
		var numeropedido = $(this).data('numeropedido');
		var producto = $(this).data('producto');
		var color = $(this).data('color');
		var talla = $(this).data('talla');
		var costo = $(this).data('costo');
		var venta = $(this).data('venta');
		var estado = $(this).data('estado');
		
		$(".modal-content #id_prod").attr("value",idprod);
		$(".modal-content #numeropedido").attr("value",numeropedido);
		$(".modal-content #producto").attr("value",producto);
		if (color !== "undefined"){
			$(".modal-content #color").attr("value",color);
		}
		if (talla !== "undefined"){
			$(".modal-content #talla").attr("value",talla);
		}
		$(".modal-content #costo").attr("value",costo);
		$(".modal-content #venta").attr("value",venta);
		
		$(".modal-content #estado").attr("value",estado);
    }
    else if($(this).attr('id')=='btnVer'){
		var numeropedido = $(this).data('numeropedido');
		var producto = $(this).data('producto');
		var color = $(this).data('color');
		var talla = $(this).data('talla');
		var costo = $(this).data('costo');
		var venta = $(this).data('venta');
		
		$(".modal-content #numeropedido").attr("value",numeropedido);
		$(".modal-content #producto").attr("value",producto);
		if (color !== "undefined"){
			$(".modal-content #color").attr("value",color);
		}
		if (talla !== "undefined"){
			$(".modal-content #talla").attr("value",talla);
		}
		$(".modal-content #costo").attr("value","$ "+costo);
		$(".modal-content #venta").attr("value","$ "+venta);
		

		
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