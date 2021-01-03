//Plugin to put the values into the fields if them are empty
jQuery.fn.fill_or_clean = function () {
    this.each(function () {
        if ($("#prodname").val() === "") {
            $("#prodname").val("Input product name");
            $("#prodname").focus(function () {
                if ($("#prodname").val() === "Input product name") {
                    $("#prodname").val("");
                }
            });
        }
        $("#prodname").blur(function () { //Onblur is activated when user changes the focus
            if ($("#prodname").val() === "") {
                $("#prodname").val("Input product name");
            }
        });//Product name end

        if ($("#prodref").val() === "") {
            $("#prodref").val("Input product reference");
            $("#prodref").focus(function () {
                if ($("#prodref").val() === "Input product reference") {
                    $("#prodref").val("");
                }
            });
        }

        if ($("#prodprice").val() === "") {
            $("#prodprice").val("0");
            $("#prodprice").focus(function () {
                if ($("#prodprice").val() === "Input product price") {
                    $("#prodprice").val("");
                }
            });
        }
        $("#prodprice").blur(function () { //Onblur is activated when user changes the focus
            if ($("#prodprice").val() === "") {
                $("#prodprice").val("Input product price");
            }
        });//Product price end

        if ($("#date_reception").val() === "") {
            $("#date_reception").val("Input reception date");
            $("#date_reception").focus(function () {
                if ($("#date_reception").val() === "Input reception date") {
                    $("#date_reception").val("");
                }
            });
        }
        $("#date_reception").blur(function () { //Onblur is activated when user changes the focus
            if ($("#date_reception").val() === "") {
                $("#date_reception").val("Input reception date");
            }
        });//Date reception end

        if ($("#date_expiration").val() === "") {
            $("#date_expiration").val("Input expiration date");
            $("#date_expiration").focus(function () {
                if ($("#date_expiration").val() === "Input expiration date") {
                    $("#date_expiration").val("");
                }
            });
        }
        $("#date_expiration").blur(function () { //Onblur is activated when user changes the focus
            if ($("#date_expiration").val() === "") {
                $("#date_expiration").val("Input expiration date");
            }
        });//Date expiration end

        if ($("#proddesc").val() === "") {
            //console.log("Inside first if proddesc");
            $("#proddesc").val("Input product description");
            $("#proddesc").focus(function () {
                if ($("#proddesc").val() === "Input product description") {
                  //console.log("Inside second if proddesc");
                    $("#proddesc").val("");
                }
            });
        }
        $("#proddesc").blur(function () { //Onblur is activated when user changes the focus
            if ($("#proddesc").val() === "") {
                $("#proddesc").val("Input product description");
            }
        });//Product description end
        //info http://stackoverflow.com/questions/415602/set-value-of-textarea-in-jquery

    });//End of the each
    return this;
};// End of fill or clean function

//Solution to : "Uncaught Error: Dropzone already attached."
Dropzone.autoDiscover = false;

$(document).ready(function () {
    //console.log("Inside ready");

    $( "#date_reception" ).datepicker({
        dateFormat: 'dd/mm/yy',
        //dateFormat: 'mm-dd-yy',
        changeMonth: true, changeYear: true,
        minDate: -90, maxDate: "+1M"
    });
    $( "#date_expiration" ).datepicker({
      dateFormat: 'dd/mm/yy',
      //dateFormat: 'mm-dd-yy',
      changeMonth: true, changeYear: true,
      minDate: 0, maxDate: "+36M"
    });


    $('#submit_products').click(function(){
        //console.log("Inside click function");
        //console.log($('input[name="packaging"]:checked').val());
        validate_product();
    });

    $.get("https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/products/controller/controller_products.class.php?load_data=true",
          function(response){
            if(response.product===""){
                $("#prodname").val('');
                $("#prodref").val('');
                $("#prodprice").val('');
                $("#date_reception").val('');
                $("#date_expiration").val('');
                $('#country').val('Select country');
                $('#province').val('Select province');
                $('#city').val('Select city');
                $("#proddesc").val('');
                var inputElements = document.getElementsByClassName('catCheckbox');
                for (var i = 0; i < inputElements.length; i++) {
                    if (inputElements[i].checked){
                        inputElements[i].checked = false;
                    }
                }
            $(this).fill_or_clean();
            }else{
              $("#prodname").val(response.product.prodname);
              $("#prodref").val(response.product.prodref);
              $("#prodprice").val(response.product.prodprice);
              $("#date_reception").val(response.product.date_reception);
              $("#date_expiration").val(response.product.date_expiration);
              $('#country').val(response.product.country);
              $('#province').val(response.product.province);
              $('#city').val(response.product.city);
              $("#proddesc").val(response.product.proddesc);
              var category = response.product.category;
              var inputElements = document.getElementsByClassName('catCheckbox');
              for (var j = 0; j < category.length; j++) {
                  for (var k = 0; k < inputElements.length; k++) {
                    if (category[j] === inputElements[k]){
                        inputElements[k].checked = true;
                    }
                  }
              }
            }
          }, "json");

    //Dropzone function //////////////////////////////////
    $("#dropzone").dropzone({
        url: "https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/products/controller/controller_products.class.php?upload=true",
        addRemoveLinks: true,
        maxFileSize: 1000,
        dictResponseError: "An error has occurred on the server",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
        init: function () {
            this.on("success", function (file, response) {
                //alert(response);
                $("#progress").show();
                $("#bar").width('100%');
                $("#percent").html('100%');
                $('.msg').text('').removeClass('msg_error');
                $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'right': '300px'}, 300);
                console.log(file.name);
                console.log("Response: "+response);
            });
        },
        complete: function (file) {
            //if(file.status == "success"){
            //alert("El archivo se ha subido correctamente: " + file.name);
            //}
        },
        error: function (file) {
            //alert("Error subiendo el archivo " + file.name);
        },
        removedfile: function (file, serverFileName) {
            var name = file.name;
            console.log(name);
            $.ajax({
                type: "POST",
                url: "https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/products/controller/controller_products.class.php?delete=true",
                data: "filename=" + name,
                success: function (data) {
                  //console.log(name);
                  console.log(data);
                    $("#progress").hide();
                    $('.msg').text('').removeClass('msg_ok');
                    $('.msg').text('').removeClass('msg_error');
                    $("#e_avatar").html("");

                    var json = JSON.parse(data);
                    //console.log(data);
                    if (json.res === true) {
                        var element;
                        if ((element = file.previewElement) !== null) {
                            element.parentNode.removeChild(file.previewElement);
                            //alert("Imagen eliminada: " + name);
                        } else {
                            return false;
                        }
                    } else { //json.res == false, elimino la imagen también
                        var element2;
                        if ((element2 = file.previewElement) !== null) {
                            element2.parentNode.removeChild(file.previewElement);
                        } else {
                            return false;
                        }
                    }

                }
            });
        }
    });//End dropzone

    var string_reg = /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/;
    //var val_dates = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var val_dates = /\d{2}.\d{2}.\d{4}$/;
    var prod_ref = /^[0-9a-zA-Z]{2,20}$/;
    var prod_price = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    var string_description = /^(.){1,500}$/;
    //var string_description = /^[0-9A-Za-z]{2,90}$/;

    /* Fade out function to hide the error messages */

    $("#prodname").keyup(function () {
      if ($(this).val() !== "" && prod_ref.test($(this).val())) {
          $(".error").fadeOut();
          return false;
      }
    });

    $("#prodref").keyup(function () {
      if ($(this).val() !== "" && prod_ref.test($(this).val())) {
          $(".error").fadeOut();
          return false;
      }
    });

    $("#prodprice").keyup(function () {
      if ($(this).val() !== "" && prod_price.test($(this).val())) {
          $(".error").fadeOut();
          return false;
      }
    });

    $("#proddesc").keyup(function () {
      if ($(this).val() !== "" && string_description.test($(this).val())) {
          $(".error").fadeOut();
          return false;
      }
    });
    
    //Dependent combos //////////////////////////////////
    load_countries_v1();
    
    $("#province").empty();
    $("#province").append('<option value="" selected="selected">Select province</option>');
    $("#province").prop('disabled', true);
    $("#city").empty();
    $("#city").append('<option value="" selected="selected">Select city</option>');
    $("#city").prop('disabled', true);

    $("#country").change(function() {
		var country = $(this).val();
		var province = $("#province");
		var city = $("#city");

		if(country !== 'AS'){
		     province.prop('disabled', false);
	         city.prop('disabled', false);
	         load_cities_v1(country);
	       //  alert(country);
	         load_provinces_v1();
		}else{
	          province.prop('disabled', true);
	         city.prop('disabled', true);
	         $("#province").empty();
		     $("#city").empty();
		}//fi else
	});

	$("#province").change(function() {
		var prov = $(this).val();
		if(prov > 0){
			load_cities_v1(prov);
		}else{
			$("#city").prop('disabled', false);
		}
	});

});//End document ready

function validate_product(){
       var result = true;

    var prodname = document.getElementById('prodname').value;
    var prodprice = document.getElementById('prodprice').value;
    var date_reception = document.getElementById('date_reception').value;
    var date_expiration = document.getElementById('date_expiration').value;
    var ideal = [];
    var inputElements = document.getElementsByClassName('catCheckbox');
    var j=0;
    for (var i=0; i< inputElements.length; i++){
        if (inputElements[i].checked){
          ideal[j] = inputElements[i].value;
          j++;
        }
    }
    var cat1=ideal[0];
    /* alert(cat1);*/
    var cat2=ideal[1];
    /*alert(cat2);*/
    var cat3=ideal[2];
    /*alert(cat3);*/
    var cat4=ideal[3];
    /*alert(cat4);*/
    
    if (cat1 == "Famili"){
        cat1 = 1;
    }else{
         cat1 = 0;  
    }
    if (cat2 == "Fashion"){
        cat2 = 1;
    }else{
         cat2 = 0;  
    }
    if (cat3 == "Friends"){
        cat3 = 1;
    }else{
         cat3 = 0;  
    }
    if (cat4 == "Terrace"){
        cat4 = 1;
    }else{
         cat4 = 0;  
    }
    var promotion = $('input[name="promotion"]:checked').val();
 
    var country =  $("#country option:selected").text();
    var city =     $("#city option:selected").text();
    var food =     $("#food option:selected").text();
    var proddesc = document.getElementById('proddesc').value;

    var string_reg = /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/;
    var val_dates = /\d{2}.\d{2}.\d{4}$/;
    var prod_price = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    var string_description = /^(.){1,500}$/;

    $(".error").remove();
    if ($("#prodname").val() === "" || $("#prodname").val() === "Input product name"){
      $("#prodname").focus().after("<span class='error'>Input product name</span>");
      return false;
    }else if(!string_reg.test($("#prodname").val())){
      $("#prodname").focus().after("<span class='error'>Name must be 2 to 30 letters</span>");
      return false;
    }


    if ($("#prodprice").val() === "" || $("#prodprice").val() === "Input product price") {
        $("#prodprice").focus().after("<span class='error'>Input product price</span>");
        return false;
    } else if (!prod_price.test($("#prodprice").val())) {
        $("#prodprice").focus().after("<span class='error'>Price must be numbers (like 1.2)</span>");
        return false;
    }

    if ($("#date_reception").val() === "" || $("#date_reception").val() === "Input disponibility date") {
        $("#date_reception").focus().after("<span class='error'>JS Input product disponibility date</span>");
        return false;
    } else if (!val_dates.test($("#date_reception").val())) {
        $("#date_reception").focus().after("<span class='error'>JS Input product reception date</span>");
        return false;
    }

    if ($("#date_expiration").val() === "" || $("#date_expiration").val() === "Input expiration date") {
        $("#date_expiration").focus().after("<span class='error'>JS Input product expiration date</span>");
        return false;
    } else if (!val_dates.test($("#date_expiration").val())) {
        $("#date_expiration").focus().after("<span class='error'>JS Input product expiration date</span>");
        return false;
    }

    if ($("#country").val() === "" || $("#country").val() === "Select country" || $("#country").val() === null) {
        $("#country").focus().after("<span class='error'>Select one country</span>");
        return false;
    }

    if ($("#city").val() === "" || $("#city").val() === "Select city") {
        $("#city").focus().after("<span class='error'>Select one city</span>");
        return false;
    }
    
    if ($("#food").val() === "" || $("#food").val() === "Select food") {
        $("#food").focus().after("<span class='error'>Select one food</span>");
        return false;
    }

    if ($("#proddesc").val() === "" || $("#proddesc").val() === "Input product description") {
        $("#proddesc").focus().after("<span class='error'>Input product description</span>");
        return false;
    } else if (!string_description.test($("#proddesc").val())) {
        $("#proddesc").focus().after("<span class='error'>Description cannot be empty</span>");
        return false;
    }

    //console.log("Before if result");
    if (result){
      //console.log("Inside if result");

        if (city === null) {
            city = 'default_city';
        }else if (city.length === 0) {
            city = 'default_city';
        }else if (city === 'Select city') {
            return 'default_city';
        }

        if (food === null) {
            food = 'TODO';
        }else if (food.length === 0) {
             food = 'TODO';
        }else if (food === 'Select food') {
             food = 'TODO';
        }

     var data = {"prodname": prodname, "prodprice": prodprice, "date_expiration": date_expiration, "date_reception": date_reception, "cat1": cat1,"cat2": cat2,"cat3": cat3,"cat4": cat4,"promotion": promotion,"country": country, "city": city,  "food": food, "proddesc": proddesc};
      console.log(data); //Apleguen les dades be
      var data_products_JSON = JSON.stringify(data);

      $.post('https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/products/controller/controller_products.class.php',
          {alta_products_json:data_products_JSON},
      function (response){
        console.log(response);//Aqui muestra los resultados de PHP
        //console.log(response.prodname);
        if(response.success){
          window.location.href = response.redirect;
        }
    },"json").fail(function(xhr, textStatus, errorThrown){
          console.log("Inside error json");
          console.log(xhr.responseJSON);
          if (xhr.status === 0) {
                alert('Not connect: Verify Network.');
            } else if (xhr.status == 404) {
                alert('Requested page not found [404]');
            } else if (xhr.status == 500) {
                alert('Internal Server Error [500].');
            } else if (textStatus === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (textStatus === 'timeout') {
                alert('Time out error.');
            } else if (textStatus === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error: ' + xhr.responseText);
            }
          if (xhr.responseJSON == 'undefined' && xhr.responseJSON === null )
                  xhr.responseJSON = JSON.parse(xhr.responseText);

          if(xhr.responseJSON.error.prodname)
            $("#error_prodname").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodname + "</span>");

          if(xhr.responseJSON.error.prodref)
            $("#error_prodref").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodref + "</span>");

          if(xhr.responseJSON.error.prodprice)
            $("#error_prodprice").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodprice + "</span>");

          if(xhr.responseJSON.error.date_reception)
            $("#error_date_reception").focus().after("<span  class='error1'>" + xhr.responseJSON.error.date_reception + "</span>");

          if(xhr.responseJSON.error.date_expiration)
            $("#error_date_expiration").focus().after("<span  class='error1'>" + xhr.responseJSON.error.date_expiration + "</span>");

          if(xhr.responseJSON.error.category)
            $("#error_category").focus().after("<span  class='error1'>" + xhr.responseJSON.error.category + "</span>");

          if(xhr.responseJSON.error.country)
            $("#error_country").focus().after("<span  class='error1'>" + xhr.responseJSON.error.country + "</span>");

          if(xhr.responseJSON.error.province)
            $("#error_province").focus().after("<span  class='error1'>" + xhr.responseJSON.error.province + "</span>");

          if(xhr.responseJSON.error.city)
            $("#error_city").focus().after("<span  class='error1'>" + xhr.responseJSON.error.city + "</span>");

          if(xhr.responseJSON.error.proddesc)
            $("#error_proddesc").focus().after("<span  class='error1'>" + xhr.responseJSON.error.proddesc + "</span>");

          if(xhr.responseJSON.error.prodpic)
            $("#prodpic").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodpic + "</span>");

          if (xhr.responseJSON.success1) {
                if (xhr.responseJSON.img_avatar !== "/shop_arevert/media/default-prodpic.png") {
                    //$("#progress").show();
                    //$("#bar").width('100%');
                    //$("#percent").html('100%');
                    //$('.msg').text('').removeClass('msg_error');
                    //$('.msg').text('Success Upload image!!').addClass('msg_ok').animate({ 'right' : '300px' }, 300);
                }
            } else {
                $("#progress").hide();
                $('.msg').text('').removeClass('msg_ok');
                $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'right': '300px'}, 300);
            }

    });//End fail function hrx
  }//End if result
}//End validate_product

function load_countries_v2(cad) {
    $.getJSON( cad, function(data) {
      $("#country").empty();
      $("#country").append('<option value="" selected="selected">Select country</option>');

      $.each(data, function (i, valor) {
        $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
      });
    })
    .fail(function() {
        alert( "error load_countries" );
    });
}

function load_countries_v1() {
    $.get( "https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/products/controller/controller_products.class.php?load_country=true",
        function( response ) {
            // console.log(response);
            if(response === 'error'){
                load_countries_v2("https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/resources/ListOfCountryNamesByName.json");
            }else{
                load_countries_v2("https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/products/controller/controller_products.class.php?load_country=true"); //oorsprong.org
            }
    })
    .fail(function(response) {
        load_countries_v2("https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/resources/ListOfCountryNamesByName.json");
    });
}

function load_provinces_v2(cad) {
   
    $.getJSON( cad, function(data) {
      $("#food").empty();
      $("#food").append('<option value="" disabled selected>Select Food</option>');

      $.each(data, function (i, valor) {
        $("#food").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
      });
    })
    .fail(function() {
        alert( "error load_provinces_v2" );
    });
}

function load_provinces_v1() { //LIST OF FOOD JSON
    $.get( "https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/products/controller/controller_products.class.php?load_provinces=true",
        function( response ) {
          $("#food").empty();
	        $("#food").append('<option value="" selected="selected">Select food</option>');

            //alert(response);
        var json = JSON.parse(response);
		    var provinces=json.provinces;
		    //alert(provinces);
		    //console.log(provinces);

		    //alert(provinces[0].id);
		    //alert(provinces[0].nombre);

            if(provinces === 'error'){
                /* alert("entra");*/
                load_provinces_v2("https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/resources/ListOfFood.json");
            }else{
                for (var i = 0; i < provinces.length; i++) {
        		    $("#food").append("<option value='" + provinces[i].id + "'>" + provinces[i].nombre + "</option>");
    		    }
            }
    })
    .fail(function(response) {
        load_provinces_v2("https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/resources/ListOfFood.json");
    });
}

function load_cities_v2(cad,prov) {
    
    $.getJSON( cad, {sISOCode: prov}, function(data) {
      $("#city").empty();
      $("#city").append('<option value="" disabled selected>Select City</option>');
        /*alert(prov);*/
    var prov1= prov;
      $.each(data, function (prov, valor) {
          
           if (valor.sISOCode == prov1) {
             $("#city").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
            }
        
      });
    })
    .fail(function() {
        alert( "error load_cities_v2" );
    });
}

function load_cities_v1(prov) { //provinciasypoblaciones.xml - xpath
    var datos = { idPoblac : prov  };
    var cad="https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/resources/ListOfCitys.json";
	$.post("https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/modules/products/controller/controller_products.class.php", datos, function(response) {
	    //alert(response);
        var json = JSON.parse(response);
		var cities=json.cities;
		
		//alert(poblaciones);
		//console.log(poblaciones);
		//alert(poblaciones[0].poblacion);

		$("#city").empty();
	    $("#city").append('<option value="" selected="selected">Select city</option>');

        if(cities === 'error'){
            
            load_cities_v2(cad,prov);
        }else{
            for (var i = 0; i < cities.length; i++) {
        		$("#city").append("<option value='" + cities[i].poblacion + "'>" + cities[i].poblacion + "</option>");
    		}
        }
	})
	.fail(function() {
        load_cities_v2(cad,prov);
    });
}
