function wiki_search(text){
	
	$(".respuesta").hide();
	
	$.ajax({
	 
	  url: "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + encodeURIComponent(text),
	  dataType: "jsonp"
	}).done(function(data) {
		
		  if (!jQuery.isEmptyObject(data)){
			if (data.query.searchinfo.totalhits>0){
				titulo = data.query.search[0].title;
				if (text.toLowerCase() == titulo.toLowerCase()){
					 wiki_render(titulo);
				}else{
					$("#confirmar span").html(titulo);
					$("#searchValorContinuar").val(titulo);
					$("#confirmar").show();
				}
			}else{
				$("#wiki_log").html("No se encuentra");
			}

			    
		}else{
			
			$("#wiki_log").html("Se ha producido algún error. Vuelva a intentarlo más tarde.");
		}	  


	});

}



function wiki_render(title){

	$.ajax({
	 
	  url: "http://es.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=" + encodeURIComponent(title),
	  dataType: "jsonp"
	}).done(function(data) {
		
		  if (!jQuery.isEmptyObject(data)){

				
			$.each( data.query.pages, function( key, val ) {
				datos = val.revisions[0]['*'].replace(/ /g,"");
				//alert(datos);
				indice = datos.search(/muerte=/i);
				if (indice==-1){
					indice = datos.search(/defunción=/i);
				}
				
				if  (indice==-1){
					$("#res_vivo").fadeIn('fast');
				}
				else{
					
					$("#res_muerto").fadeIn('fast');
				}
				
				
			});
    
		}else{
			
			$("#wiki_log").html("Se ha producido algún error. Vuelva a intentarlo más tarde.");
		}	  


	});
}

