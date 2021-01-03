////////////////////////////////////////////////////////////////
function load_users_ajax() {
    $.ajax({
        type: 'GET',
        url: "modules/products/controller/controller_products.class.php?load=true",
        //dataType: 'json',
        async: false
    }).done(function (data) {
        var json = JSON.parse(data);
        // alert(json.user.usuario);
        print_product(json);

    }).fail(function (xhr) {
        alert(xhr.responseText);
    });
}

$(document).ready(function () {
    load_users_ajax();
});

function print_product(data) {
    //alert(data.user.avatar);
   /* console.log(data);*/
    /*console.log(data.product.prodname);*/
    var content = document.getElementById("content");
    var div_product = document.createElement("div");
    var parrafo = document.createElement("p");

    var message = document.createElement("div");
    message.innerHTML = "message = ";
    message.innerHTML += data.message;

    var prodname = document.createElement("div");
    prodname.innerHTML = "prodname = ";
    prodname.innerHTML += data.product.prodname;

    var prodprice = document.createElement("div");
    prodprice.innerHTML = "prodprice = ";
    prodprice.innerHTML += data.product.prodprice;

    var date_reception = document.createElement("div");
    date_reception.innerHTML = "date_reception = ";
    date_reception.innerHTML += data.product.date_reception;

    var date_expiration = document.createElement("div");
    date_expiration.innerHTML = "date_expiration = ";
    date_expiration.innerHTML += data.product.date_expiration;

    var category = document.createElement("div");
    category.innerHTML = "category = ";
   
        if(data.product.cat1 == 1){
            category.innerHTML += " - Famili";
        }
        // console.log(data.product.cat1);
        
        if(data.product.cat2 == 1){
             category.innerHTML += " - Fashion";
        }
       /* console.log(data.product.cat2);*/
        if(data.product.cat3 == 1){
             category.innerHTML += " - Friends";
        }
        /*console.log(data.product.cat3);*/
        if(data.product.cat4 == 1){
             category.innerHTML += " - Terrace";
        }
       /* console.log(data.product.cat4);*/
    

    var packaging = document.createElement("div");
    packaging.innerHTML = "Promotion = ";
    packaging.innerHTML += data.product.promotion;

    var country = document.createElement("div");
    country.innerHTML = "country = ";
    country.innerHTML += data.product.country;

    var province = document.createElement("div");
    province.innerHTML = "Food = ";
    province.innerHTML += data.product.food;

    var city = document.createElement("div");
    city.innerHTML = "city = ";
    city.innerHTML += data.product.city;

    var proddesc = document.createElement("div");
    proddesc.innerHTML = "proddesc = ";
    proddesc.innerHTML += data.product.proddesc;

    //arreglar ruta IMATGE!!!!!

    var cad = data.product.prodpic;
    //console.log(cad);
    //var cad = cad.toLowerCase();
    var img = document.createElement("div");
    var html = '<img src="' + cad + '" height="100" width="100"> ';
    img.innerHTML = html;
    //alert(html);

    div_product.appendChild(parrafo);
    parrafo.appendChild(message);
    parrafo.appendChild(prodname);
    parrafo.appendChild(prodprice);
    parrafo.appendChild(date_reception);
    parrafo.appendChild(date_expiration);
    parrafo.appendChild(category);
    parrafo.appendChild(packaging);
    parrafo.appendChild(country);
    parrafo.appendChild(province);
    parrafo.appendChild(city);
    parrafo.appendChild(proddesc);
    content.appendChild(div_product);
    content.appendChild(img);
}
