////////////// AUTOCOMPLETE ///////////////// 
$(document).ready(function() { 

var prov = '';
var cad="resources/ListOfCitys.json";
cad="https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/main/controller/filtro.php";
                
        $( "#e" ).autocomplete({
    source: function (request, response) {

          prov = $('#e').val();
          $.getJSON( cad, {sName: prov}, function(data) {
          /* console.log(data);*/
          
            response($.map(data, function (value, key) {
                 
                return {
                    value: value.sName
                };
            }));/*END RESPONSE*/
            
            $('#buffero2').html("");
            for(var i=0;i<data.length;i++){
              html='';
               html+='<div class="col-sm-6 col-md-4">';
          			html+='<div class="thumbnail">';
          			 html+='<a class="catagotie-head" href=>';
          				html+='<img src='+data[i].foto+' alt="...">';
          				html+='<h3>'+data[i].sName+'</h3>';
          			 html+='</a>';
          			html+='</div>	<!-- End of /.thumbnail -->';
          		 html+=	'</div>	<!-- End of /.col-sm-6 col-md-4 -->';
          		 var buffero = $('#buffero2').html();
            $('#buffero2').html(buffero+html);
            }/*END FOR*/
        });
    
    },
    select: function(event, ui) {
        //poner if "sin resultados"
        if(ui.item.value != "Sin resultados"){
          var prov = $('#e').val();
          var cad="https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/main/controller/filtro.php";
           $.getJSON( cad, {sName: prov}, function(data) {  
             
            $('#buffero2').html("");
            for(var i=0;i<data.length;i++){
            //   console.log(data[i].sName);
            // console.log(ui.item.value);
              if(data[i].sName==ui.item.value){
                  html='';
                   html+='<div class="col-sm-6 col-md-4">';
              			html+='<div class="thumbnail">';
              			 html+='<a class="catagotie-head" href=>';
              				html+='<img src='+data[i].foto+' alt="...">';
              				html+='<h3>'+data[i].sName+'</h3>';
              			 html+='</a>';
              			html+='</div>	<!-- End of /.thumbnail -->';
              		 html+=	'</div>	<!-- End of /.col-sm-6 col-md-4 -->';
              		 var buffero = $('#buffero2').html();
                $('#buffero2').html(buffero+html);
              }/*END IF*/
            }/*END FOR*/
        });
        }
    },
    minLength: 2,
    delay: 100
  });/*END AUTOCOMPLETE*/
        
});/*END DOCUMENT REDY FUNCTION*/

 ////////////// CATEGORIES ///////////////// 
 $('#e1').click(function(){
  
      });
    
    
function print_r(arr,level) {
  var dumped_text = "";
  if(!level) level = 0;
  var level_padding = "";
  for(var j=0;j<level+1;j++) level_padding += "    ";
    if(typeof(arr) == 'object') { //Array/Hashes/Objects 
      for(var item in arr) {
        var value = arr[item];
        if(typeof(value) == 'object') { //If it is an array,
          dumped_text += level_padding + "'" + item + "' ...\n";
          dumped_text += print_r(value,level+1);
        } else {
          dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
        }
      }
    } else { //Stings/Chars/Numbers etc.
    dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
  }
  return dumped_text;
 }