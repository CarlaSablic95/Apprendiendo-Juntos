// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var datosGlobal = "";

var db = firebase.firestore();
var colCiudades = db.collection("ciudades");
var colUsuarios = db.collection("usuarios");



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

     fnInicializarCiudades();


/*
    var email = "usuario@dominio.com";
    var password = "12345678";


    var email = "usuario123@dominio.com";
    var password = "123ahsdflkhj";
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( function() {
             alert("registro ok");

        })

        .catch(function(error) {          
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message; 
            if (errorCode == 'auth/weak-password') {
                alert('Clave muy débil.');
            } else {
                alert(errorCode + "|" + errorMessage);
            }
            console.log(error);
        });
*/
       



    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //

    /*
    var onSuccessGPS = function(position) {

        miLat = position.coords.latitude;

        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };
 
    // onError Callback receives a PositionError object
    //
    function onErrorGPS(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);
    */


});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    alert('Hello');
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);

    $$('#btnLogin').on('click', fnLogin);
    $$('#btnRegistro').on('click', fnRegistro);

    // lleno el selCiudades 


    colCiudades.orderBy("Provincia","asc").get()    
    .then(function(querySnapshot) {              
      querySnapshot.forEach(function(doc) {               
        //console.log("data:" + doc.data().name);
        ciudad = doc.data().Ciudad;
        prov =  doc.data().Provincia;
        id = doc.id;

        console.log(id + "-" + ciudad + "-" + prov);

        opcion = "<option value='"+id+"'>"+prov+" | "+ ciudad +" </option>";

        $$('#selCiudades').append(opcion);

      });
    })
    .catch(function(error) {           
        console.log("Error: " , error);
    });





    // --------------------


    
    /*
    var url="https://api.ip2country.info/ip?8.9.2.5"; 
    app.request.json(url, function(cualquierCoSaAAAAoos0s) {

        $$('#elPais').html(cualquierCoSaAAAAoos0s.countryName);
    });
    */
    /*
    $$('#selCiudades').on('change', function(){
        id = $$('#selCiudades').val();
        console.log('seleccionado: ' + id);
        mostrarDatos(id);
    } )


    var url="https://ws.smn.gob.ar/map_items/forecast/1"; 
    app.request.json(url, function(datos) {

        datosGlobal = datos;
        for (i=0; i<datos.length ; i++) {
            estaCiudad = datos[i];

            id = i;
            nombre = estaCiudad.name;

            $$('#selCiudades').append('<option value="'+id+'">'+nombre+'</option>');

        }

//        miCiudad = datos[180];

        


/*
        ciudad = miCiudad.name;
        tempM = miCiudad.weather.morning_temp;
        tempT = miCiudad.weather.afternoon_temp;
        idM = miCiudad.weather.morning_id;
        idT = miCiudad.weather.afternoon_id;
        descM = miCiudad.weather.morning_desc;
        descT = miCiudad.weather.afternoon_desc;

        $$('#ciudad').html(ciudad);
        $$('#tempM').html(tempM + " *C");
        $$('#descM').html(descM);
        $$('#tempT').html(tempT + " *C");
        $$('#descT').html(descT);

        $$('#imgM').attr('src', 'http://openweathermap.org/img/w/'+idM+'d.png');
        $$('#imgT').attr('src', 'http://openweathermap.org/img/w/'+idT+'n.png');
* /


        //$$('#elPais').html(datos.countryName);
    });

    */



})


function fnRegistro() {
    em = $$('#emailRegistro').val();
    pa = $$('#passRegistro').val();
    no = $$('#nombreRegistro').val();
    ap = $$('#apellidoRegistro').val();

    firebase.auth().createUserWithEmailAndPassword(em, pa)
        .then( function() {
             //alert("registro ok");
             // aca tengo el usuario generado en AUTH
             datos = { 
                Nombre: no, 
                Apellido: ap  };

             colUsuarios.doc(em).set(datos);


        })

        .catch(function(error) {          
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message; 
            if (errorCode == 'auth/weak-password') {
                alert('Clave muy débil.');
            } else {
                alert(errorCode + "|" + errorMessage);
            }
            console.log(error);
        });




}





function fnLogin() {
    email = $$('#emailLogin').val();
    password = $$('#passLogin').val();


    firebase.auth().signInWithEmailAndPassword(email, password)

        /*
      .then( function(user) {
        // Signed in
        // ...
        }) */
      .then((user) => {
        // Signed in
        // ...
        alert("todo ok");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
      });


}



function mostrarDatos(id) {



        miCiudad = datosGlobal[id];

        



        ciudad = miCiudad.name;
        tempM = miCiudad.weather.morning_temp;
        tempT = miCiudad.weather.afternoon_temp;
        idM = miCiudad.weather.morning_id;
        idT = miCiudad.weather.afternoon_id;
        descM = miCiudad.weather.morning_desc;
        descT = miCiudad.weather.afternoon_desc;

        $$('#ciudad').html(ciudad);
        $$('#tempM').html(tempM + " *C");
        $$('#descM').html(descM);
        $$('#tempT').html(tempT + " *C");
        $$('#descT').html(descT);

        $$('#imgM').attr('src', 'http://openweathermap.org/img/w/'+idM+'d.png');
        $$('#imgT').attr('src', 'http://openweathermap.org/img/w/'+idT+'n.png');


}





function fnInicializarCiudades() {
    console.log("ingreso IC")

    var prov;
    cp = "1"; 
    ciudad="UNO"; 
    hab = 1; // falta prov

    console.log("ciuddad" + ciudad);

    datos = { 
        Ciudad: ciudad, 
        Provincia: ""+prov, 
        Habitantes: hab 
    };
    //datos = { Ciudad: ciudad, Provincia:, Habitantes: hab };
    colCiudades.doc(cp).set(datos);


    var cp = "2000";
    var datos = { Ciudad: "Rosario", Provincia: "Santa Fe", Habitantes: 1400000 };
    colCiudades.doc(cp).set(datos);

    cp = "1000"; ciudad="CABA"; prov="CABA"; hab = 8000000;
    datos = { Ciudad: ciudad, Provincia: prov, Habitantes: hab };
    colCiudades.doc(cp).set(datos);

    cp = "6300"; ciudad="Santa Rosa"; prov="La Pampa"; hab = 150254;
    datos = { Ciudad: ciudad, Provincia: prov, Habitantes: hab };
    colCiudades.doc(cp).set(datos);

    cp = "3400"; ciudad="Corrientes"; prov="Corrientes"; hab = 502352;
    datos = { Ciudad: ciudad, Provincia: prov, Habitantes: hab };
    colCiudades.doc(cp).set(datos);

    cp = "2900"; ciudad="San Nicolas"; prov="Buenos Aires"; hab = 150254;
    datos = { Ciudad: ciudad, Provincia: prov, Habitantes: hab };
    colCiudades.doc(cp).set(datos);

}