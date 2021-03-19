
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
      { path: '/', url: 'index.html', },

      { path: '/registro/', url: 'registro.html', },
      { path: '/login/', url: 'login.html', },
      { path: '/perfil/', url: 'perfil.html', options: { transition: 'f7-circle',}, },

      //LENGUA
      { path: '/primer-grado/', url: 'primer-grado.html', },
      { path: '/primer-grado/lengua/', url: 'lengua.html', },
      { path: '/primer-grado/lengua/abecedario/', url: 'abecedario.html', },
      { path: '/primer-grado/lengua/vyc/', url: 'vyc.html', },
      { path: '/primer-grado/lengua/vyc/vocales', url: 'vocales.html', },
      { path: '/primer-grado/lengua/vyc/consonantes', url: 'consonantes.html', },
      { path: '/primer-grado/lengua/lectura', url: 'lectura.html', options: { transition: 'f7-circle',}, },
      { path: '/primer-grado/lengua/lectura/mozart', url: 'mozart.html', options: { transition: 'f7-dive',},  },
      { path: '/primer-grado/lengua/lectura/jirafa', url: 'jirafa.html', options: { transition: 'f7-dive',},  },

      // MATEMATICA
      { path: '/primer-grado/matematica/', url: 'matematica.html', },
      { path: '/primer-grado/matematica/numeros', url: 'numeros.html', },

      // SOCIALES
      { path: '/primer-grado/sociales/', url: 'sociales.html', },
      { path: '/primer-grado/sociales/fechas-patrias', url: 'fechas-patrias.html', },

      // NATURALES
      { path: '/primer-grado/naturales/', url: 'naturales.html', },
      { path: '/primer-grado/naturales/naturaleza', url: 'naturaleza.html', },


]



    // ... other parameters
  });


var mainView = app.views.create('.view-main');

// db me hace la conexión a la BD
 var db = firebase.firestore();

 var colUsuarios = db.collection("usuarios");

 var colMaterias = db.collection("materias");

 var colActividades = db.collection("actividades");

 var actResueltas = db.collection("actResueltas");

 var nom="", email="", emailLogin="", emLogin="", fechaNac="", tipoUsuario="";

 var avatarReg="", avatarElegido="", valRespuestas="", respuestaCorrecta="", rtaCorrecta="";

// VAR GLOBALES PARA LAS MATERIAS
 var nomMateria="", actNombre="", nomJuego="", contenido="", actividad="";

 var botella="", ventana="", libro="", uva="";

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialize
console.log(e);

    // Llamada a funciones donde cada una tendrá datos que se subirán a la BD
    fnAgregarMaterias();
    // fnActResueltas();
})


// Option 2. Using live 'page:init' event handlers for each page

// INDEX

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
console.log("carga index");

// Oculto navbar y toolbar en el index
    app.navbar.hide('#navBar');
    app.toolbar.hide('#toolBar');

    $$('#registro').on('click', function(){
      mainView.router.navigate('/registro/');
    })

    $$('#login').on('click', function(){
      mainView.router.navigate('/login/');
    })
     
})

// REGISTRO

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {

console.log("carga registro");

app.navbar.hide('#navbar');
app.toolbar.hide('#toolBar');


//Al hacer click en Registrarme, llamas a la funcion para registro de usuarios
$$('#btnRegistro').on('click', registroUsuarios);



$$('.fotoPerfil').on('click', avatarUsuario);

})

// LOGIN--------------------------------------------------------------

$$(document).on('page:init', '.page[data-name="login"]', function (e) {

    console.log("carga login");

    app.navbar.hide('#navBar');
    app.toolbar.hide('#toolBar');

    $$('#btnLogin').on('click', loginUsuarios);


})

// PERFIL----------------------------------------

$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {

// Muestro el Navbar y Toolbar para la pagina del listado de las materias
    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
    
   // $$('#msjBienvenida').html('<h1>¡Bienvenido/a, ' +nom+'!</h1>');
      // $$('#nomUsuario').html('<h1>¡Bienvenido/a, ' +nom+'!</h1>');
      $$('#nomUsuario').html('<p>Nombre: ' + nom +'</p>');
      $$('#emUsuario').html('<p>Email: ' +emLogin+'</p>');

      $$('#miProgreso').html('<p>Mis juegos: ' +nomJuego.nombreActividad+ '</p>');
      
      console.log('NOMBRE JUEGO: ' + JSON.stringify(nomJuego.nombreActividad));

      $$('.open-confirm').on('click', function () {
        app.dialog.confirm('¿Estás seguro/a de cerrar sesión?',nom , function () {
          mainView.router.navigate('/login/');
          app.dialog.alert('¡Volvé pronto!');
        });
      });

       $$('#btnLogout').on('click', cerrarSesion);

      // Se muestra el avatar en el perfil
      $$('#avatarUsuario').attr('src', avatarReg);
})

// 1ER GRADO -> LISTADO DE MATERIAS--------------------------

$$(document).on('page:init', '.page[data-name="primer-grado"]', function (e) {

// Muestro el Navbar y Toolbar para la pagina del listado de las materias
    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    $$('#miAvatar').attr('src', avatarReg);
})

// LENGUA------------------------------------------------------

$$(document).on('page:init', '.page[data-name="lengua"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
  
})

// Compresión lectora-----------------------------------------------
$$(document).on('page:init', '.page[data-name="lectura"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    $$('#btnLeer').on('click', function(){
      mainView.router.navigate('/primer-grado/lengua/lectura/mozart');
    })

    $$('#aLeer').on('click', function(){
      mainView.router.navigate('/primer-grado/lengua/lectura/jirafa');

    })
  
})

// COMP. LECTORA MOZART--------------------------------------------------

$$(document).on('page:init', '.page[data-name="mozart"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    $$('.radio').on('click', FnRespuestas);
    $$('.checkbox').on('click', FnRespuestas);

    // $$('#btnFin').on('click', function() {
    //   $$('.popover-fin').on('popover:open', function (e) {
    //     console.log('About popover open');
    //   });
    // })

    $$('#btnFin').on('click', juegoMozart);

})

function FnRespuestas(){
  //capturo el value de cada input radio
  valRespuestas = this.value;
  console.log('VALUE: ' + valRespuestas);

////////   Respuestas correctas  /////////
    switch(valRespuestas) {
      case 'austria':
        respuestaCorrecta = $$('#rta1C').addClass('fondoVerde');
        rtaCorrecta = $$('.austria').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
      break

      case 'padre':
        $$('#rta2A').addClass('fondoVerde');
        $$('.padre').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
      break

       case 'palacios':
         $$('#rta3C').addClass('fondoVerde');
         $$('.palacio').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
       break

       case 'piano':
         $$('#rta4A').addClass('fondoVerde');
         $$('.piano').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
        break

      case 'violin':
        $$('#rta4D').addClass('fondoVerde');
        $$('.violin').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
      break

      ////////   Respuestas incorrectas  /////////

      case 'paisMaravillas':
       $$('#rta1A').addClass('fondoRojo');
       $$('.maravillas').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'españa':
       $$('#rta1B').addClass('fondoRojo');
       $$('.españa').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

       case 'rumania':
        $$('#rta1D').addClass('fondoRojo');
        $$('.rumania').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'hermana':
       $$('#rta2B').addClass('fondoRojo');
       $$('.hna').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'internet':
       $$('#rta2C').addClass('fondoRojo');
       $$('.internet').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'vecino':
       $$('#rta2D').addClass('fondoRojo');
       $$('.vecino').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'centro':
       $$('#rta3A').addClass('fondoRojo');
       $$('.centro').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'ciudad':
       $$('#rta3B').addClass('fondoRojo');
       $$('.ciudad').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'colegio':
       $$('#rta3D').addClass('fondoRojo');
       $$('.colegio').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'trompeta':
       $$('#rta4B').addClass('fondoRojo');
       $$('.trompeta').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break

      case 'gElectrica':
       $$('#rta4C').addClass('fondoRojo');
       $$('.guitarra').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
      break
  }
}


// COMP. LECTORA---> CUENTO JIRAFA
$$(document).on('page:init', '.page[data-name="jirafa"]', function (e) {
  $$('.jirafaJuego').on('click', opcionesCorrectas);
  $$('.jirafaJuego').on('click', opcionesIncorrectas);

  $$('#btnFinalizar').on('click', juegoJirafa);
  $$('#rehacer').on('click', function(){

    $$('.liebre').attr('src', '');
    $$('#a1').removeClass('bordeVerde');

    $$('.acacia').attr('src', '');
    $$('#b2').removeClass('bordeVerde');

    $$('.pelaje').attr('src', '');
    $$('#c3').removeClass('bordeVerde');
////////////////////////////////////////
     $$('.ballena').attr('src', '');
    $$('#b1').removeClass('bordeRojo');

     $$('.cebra').attr('src', '');
    $$('#c1').removeClass('bordeRojo');

     $$('.hierba').attr('src', '');
    $$('#a2').removeClass('bordeRojo');

     $$('.bananas').attr('src', '');
    $$('#c2').removeClass('bordeRojo');

     $$('.comprobar').attr('src', '');
    $$('#a3').removeClass('bordeRojo');

     $$('.suerte').attr('src', '');
    $$('#b3').removeClass('bordeRojo');
    })
  })

  function opcionesCorrectas(){
    rtaC= this.value;

    console.log('Mi respuesta: ' + rtaC);

    switch(rtaC) {
          case 'liebre':
            $$('.liebre').attr('src', 'img/iconos/tilde.png');
            $$('#a1').addClass('bordeVerde');
          break

          case 'acacia':
            $$('.acacia').attr('src', 'img/iconos/tilde.png');
            $$('#b2').addClass('bordeVerde');
          break

           case 'pelaje':
            $$('.pelaje').attr('src', 'img/iconos/tilde.png');
            $$('#c3').addClass('bordeVerde');
          break
          
        }

      }

  function opcionesIncorrectas(){
    rtaI= this.value;

    switch(rtaI) {
          case 'ballena':
            $$('.ballena').attr('src', 'img/iconos/cruz.png');
            $$('#b1').addClass('bordeRojo');
          break

          case 'cebra':
            $$('.cebra').attr('src', 'img/iconos/cruz.png');
            $$('#c1').addClass('bordeRojo');
          break

           case 'hierba':
            $$('.hierba').attr('src', 'img/iconos/cruz.png');
            $$('#a2').addClass('bordeRojo');
          break

          case 'bananas':
            $$('.bananas').attr('src', 'img/iconos/cruz.png');
            $$('#c2').addClass('bordeRojo');
          break
          
          case 'comprobar':
            $$('.comprobar').attr('src', 'img/iconos/cruz.png');
            $$('#a3').addClass('bordeRojo');
          break

          case 'suerte':
            $$('.suerte').attr('src', 'img/iconos/cruz.png');
            $$('#b3').addClass('bordeRojo');
          break
        }
}


// JUEGO CONSONANTES
$$(document).on('page:init', '.page[data-name="consonantes"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    $$('.rtaCor').on('click', function() { rtaCorrecta(this.id) });

    $$('.rtaInc').on('click', function() { rtaIncorrecta(this.id) });

    $$('#guardar').on('click', juegoConsonante);

// reinicio el juego, borrando el contenido cada palabra
    $$('#nuevoJuego').on('click', function() {

        botella = $$('.botella').text();
        // reemplazo la B con _
       botella = botella.replace('B', '_');
        $$('.botella').text(botella);

        ventana = $$('.ventana').text();
        // reemplazo la V con _
        ventana = ventana.replace('V', '_');
        $$('.ventana').text(ventana);

         libro = $$('.libro').text();
        // reemplazo la B con _
        libro = libro.replace('B', '_');
        $$('.libro').text(libro);

         uva = $$('.uva').text();
        // reemplazo la V con _
        uva = uva.replace('V', '_');
        $$('.uva').text(uva);

    });

    $$('.popover-bien').on('popover:open', function (e) {
          $$('#contenido').html('<h4 style="color:green">¡Muy bien!</h4>' + '<img src="img/iconos/bien.png" alt="">');
        console.log('1er Popover');
      });

    $$('.popover-mal').on('popover:open', function (e) {
          $$('#correccion').html('<h4 style="color:#d00000">¡Es incorrecto!</h4>');
        console.log('2do Popover');
      });


})

// MATEMÁTICA--------------------------------------------------------------

$$(document).on('page:init', '.page[data-name="matematica"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
  
})

// CIENCIAS SOCIALES------------------------------------------------------

$$(document).on('page:init', '.page[data-name="sociales"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
  
})

// CIENCIAS NATURALES------------------------------------------------------

$$(document).on('page:init', '.page[data-name="naturales"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
  
})

// ABECEDARIO (ACTIVIDADES)-----------------------------------------------

$$(document).on('page:init', '.page[data-name="abecedario"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');


    $$('.open-preloader-indicator').on('click', function () {
        app.preloader.show();
        setTimeout(function () { 
          app.preloader.hide(); 
        }, 3000);
      });


    // var listRef = storageRef.child(('plantillas-abc/a.png'));

    //Obtengo una referencia al servicio de almacenamiento, que se utiliza para crear referencias en mi depósito de almacenamiento
  
    var storage = firebase.storage();

    //Creo una referencia de almacenamiento desde el servicio de almacenamiento de firebase

    var storageRef = storage.ref();

    // Las referencias secundarias también pueden tomar rutas delimitadas por '/'
    //plantillaRef ahora apunta a "img/lengua/plantilla-abc/a.png"

    var plantillaRef = storageRef.child('img/lengua/plantillas-abc/a.png');

    console.log('Mostrar: ' + plantillaRef);

    // parent() nos permite movernos al padre de una referencia.
    var imagesRef = storage.parent;

})

// VOCALES Y CONSONANTES (ACTIVIDADES)------------------------------

$$(document).on('page:init', '.page[data-name="vyc"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
})


// VOCALES (ACTIVIDAD)-------------------------------------------------

$$(document).on('page:init', '.page[data-name="vocales"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    $$('.vocal').on('click', function() { elegirVocales(this.id) });
    // jugar nuevamente
    $$('#jugar').on('click', function(){

      $$('#abeja').removeClass('fondoVerde');
      $$('.vocal-1A').html('');

      $$('#sol').removeClass('fondoRojo');
      $$('.vocal-2A').html('');


      $$('#te').removeClass('fondoRojo');
      $$('.vocal-3A').html('');

      $$('#naranja').removeClass('fondoVerde');
      $$('.vocal-4A').html('');

      $$('#barco').removeClass('fondoRojo');
      $$('.vocal-1E').html('');

      $$('#vaca').removeClass('fondoRojo');
      $$('.vocal-2E').html('');
          
      $$('#estrella').removeClass('fondoVerde');
      $$('.vocal-3E').html('');
          
      $$('#leon').removeClass('fondoVerde');
      $$('.vocal-4E').html('');
          
      $$('#bicicleta').removeClass('fondoVerde');
      $$('.vocal-1I').html('');
          
      $$('#jirafa').removeClass('fondoVerde');
      $$('.vocal-2I').html('');
          
      $$('#nena').removeClass('fondoRojo');
      $$('.vocal-3I').html('');
        
      $$('#ventana').removeClass('fondoRojo');
      $$('.vocal-4I').html('');

      $$('#oso').removeClass('fondoVerde');
      $$('.vocal-1O').html('');
          
      $$('#flor').removeClass('fondoVerde');
      $$('.vocal-2O').html('');
          
      $$('#isla').removeClass('fondoRojo');
      $$('.vocal-3O').html('');
          
      $$('#pez').removeClass('fondoRojo');
      $$('.vocal-4O').html('');
          
      $$('#luna').removeClass('fondoVerde');
      $$('.vocal-1U').html('');
          
      $$('#frutilla').removeClass('fondoVerde');
      $$('.vocal-2U').html('');
          
      $$('#mariposa').removeClass('fondoRojo');
      $$('.vocal-3U').html('');
          
      $$('#libro').removeClass('fondoRojo');
      $$('.vocal-4U').html('');

})
    $$('#guardarJuego').on('click', buscandoVocales);

})


function elegirVocales(id){
      opciones = id;
        console.log('Elegido: ' + opciones);

        switch(opciones) {
// VOCAL A
          case 'abeja':
            $$('#abeja').addClass('fondoVerde');
            $$('.vocal-1A').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'sol':
           $$('#sol').addClass('fondoRojo');
            $$('.vocal-2A').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

          case 'te':
            $$('#te').addClass('fondoRojo');
            $$('.vocal-3A').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

           case 'naranja':
            $$('#naranja').addClass('fondoVerde');
            $$('.vocal-4A').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

        // VOCAL E

        case 'barco':
            $$('#barco').addClass('fondoRojo');
            $$('.vocal-1E').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

          case 'vaca':
            $$('#vaca').addClass('fondoRojo');
            $$('.vocal-2E').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

           case 'estrella':
            $$('#estrella').addClass('fondoVerde');
            $$('.vocal-3E').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'leon':
           $$('#leon').addClass('fondoVerde');
            $$('.vocal-4E').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

         // VOCAL I
        case 'bicicleta':
            $$('#bicicleta').addClass('fondoVerde');
            $$('.vocal-1I').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'jirafa':
            $$('#jirafa').addClass('fondoVerde');
            $$('.vocal-2I').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

           case 'nena':
            $$('#nena').addClass('fondoRojo');
            $$('.vocal-3I').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

          case 'ventana':
           $$('#ventana').addClass('fondoRojo');
            $$('.vocal-4I').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

         // VOCAL O

        case 'oso':
            $$('#oso').addClass('fondoVerde');
            $$('.vocal-1O').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'flor':
            $$('#flor').addClass('fondoVerde');
            $$('.vocal-2O').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

           case 'isla':
            $$('#isla').addClass('fondoRojo');
            $$('.vocal-3O').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

          case 'pez':
           $$('#pez').addClass('fondoRojo');
            $$('.vocal-4O').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break
          
         // VOCAL U

        case 'luna':
            $$('#luna').addClass('fondoVerde');
            $$('.vocal-1U').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'frutilla':
            $$('#frutilla').addClass('fondoVerde');
            $$('.vocal-2U').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

           case 'mariposa':
            $$('#mariposa').addClass('fondoRojo');
            $$('.vocal-3U').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

          case 'libro':
           $$('#libro').addClass('fondoRojo');
            $$('.vocal-4U').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break
  }
 }         


// CONSONANTES (ACTIVIDAD)-------------------------------------------------
    function rtaCorrecta(id) {
      palabra = id;
      console.log('Consonante: ' + palabra);

      if (palabra == 'botella') {
        // guardo en la variable, para recuperar el texto
        botella = $$('.botella').text();
        // reemplazo el _ con la consonante correcta
        botella = botella.replace('_', 'B');

        // sobrescribo la palabra, con la consonante correcta
        $$('.botella').text(botella);

        console.log('Palabra: ' + botella);
    } else {
       $$('.popover-respuesta').on('popover:open', function (e) {
        console.log('Popover correcto');
      });
    }

    if (palabra == 'ventana') {
        // guardo en la variable, para recuperar el texto
        ventana = $$('.ventana').text();
        // reemplazo el _ con la consonante correcta
        ventana = ventana.replace('_', 'V');

        // sobrescribo la palabra, con la consonante correcta
        $$('.ventana').text(ventana);

        console.log('Palabra: ' + ventana);
    } else {
       $$('.popover-respuesta').on('popover:open', function (e) {
        console.log('Popover correcto');
      });
    }

    if (palabra == 'libro') {
        // guardo en la variable, para recuperar el texto
        libro = $$('.libro').text();
        // reemplazo el _ con la consonante correcta
        libro = libro.replace('_', 'B');

        // sobrescribo la palabra, con la consonante correcta
        $$('.libro').text(libro);

        console.log('Palabra: ' + libro);
    } else {
       $$('.popover-respuesta').on('popover:open', function (e) {
        console.log('Popover correcto');
      });
    }

    if (palabra == 'uva') {
        // guardo en la variable, para recuperar el texto
        uva = $$('.uva').text();
        // reemplazo el _ con la consonante correcta
        uva = uva.replace('_', 'V');

        // sobrescribo la palabra, con la consonante correcta
        $$('.uva').text(uva);

        console.log('Palabra: ' + uva);
    } else {
       $$('.popover-respuesta').on('popover:open', function (e) {
        console.log('Popover correcto');
      });
    }
 

 }
    function rtaIncorrecta(id) {
      consonanteIncorrecta = id;
      console.log('Consonante: ' + consonanteIncorrecta);

    }



// Registro de usuario-----------------------------------------
function registroUsuarios() {
  
  // Guardo en variables cada dato que el usuario ingresa
    nom = $$('#nombreRegistro').val();
    email = $$('#emailRegistro').val();
    pass = $$('#passRegistro').val();
    fechaNacReg = $$('#fechaNacReg').val();
    avatarReg= $$('#' + avatarElegido).attr('src'); // la variable avatarReg es el id de cada foto
    // y guarda la ruta de c/ foto
 
  console.log('AVATAR: ' + avatarElegido);
  console.log('SRC DE AVATAR: ' + avatarReg);
    // Guardo el email del usuario que es el ID del usuario
    idUsuario = email;

firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((user) => {

      // Datos de usuario guardados en BD
        var datosReg = {
            Nombre: nom,
            Email: email,
            Fecha: fechaNacReg,
            Password: pass,
            Avatar: avatarReg, 
          };

          colUsuarios.doc(email).set(datosReg);

          console.log('Datos de usuario: '+ JSON.stringify(datosReg));

          mainView.router.navigate('/primer-grado/');
         
    })

    .catch((error) =>{
       var errorCode = error.code;
       var errorMessage = error.message;
      if(nom == "" | email == "" | fechaNacReg == "" | pass == "" ){
         app.dialog.alert('¡Debés completar todos los campos!', 'Atención');
         mainView.router.navigate('/registro/');
      }
    })


// OBTENIENDO DATOS DE USUARIO

      colUsuarios.get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log("DATA: " + doc.data().Nombre + " " + doc.data().Email);
        });
      })

      .catch(function(error) {
         console.log("Error: ", error);
      })

}


// Elijo foto de perfil

function avatarUsuario() {
  avatarElegido = this.id;
  console.log('Avatar elegido: ' + avatarElegido);

// Evalúo distintos casos, dependiendo de la imagen que elijo
  switch(avatarElegido){
    case 'nene':
      $$('#nene').addClass('miAvatar');
      $$('#avion').removeClass('miAvatar');
      $$('#nena').removeClass('miAvatar');
      $$('#icon-mariposa').removeClass('miAvatar');
      $$('#icon-pelota').removeClass('miAvatar');
      $$('#flor').removeClass('miAvatar');
    break

    case 'nena':
      $$('#nena').addClass('miAvatar');
      $$('#nene').removeClass('miAvatar');
      $$('#avion').removeClass('miAvatar');
      $$('#icon-mariposa').removeClass('miAvatar');
      $$('#icon-pelota').removeClass('miAvatar');
      $$('#flor').removeClass('miAvatar');
         
    break

    case 'icon-mariposa':
      $$('#icon-mariposa').addClass('miAvatar');
      $$('#nene').removeClass('miAvatar');
      $$('#avion').removeClass('miAvatar');
      $$('#nena').removeClass('miAvatar');
      $$('#icon-pelota').removeClass('miAvatar');
      $$('#flor').removeClass('miAvatar');
          
    break

    case 'avion':
      $$('#avion').addClass('miAvatar');
      $$('#nene').removeClass('miAvatar');
      $$('#nena').removeClass('miAvatar');
      $$('#icon-mariposa').removeClass('miAvatar');
      $$('#icon-pelota').removeClass('miAvatar');
      $$('#flor').removeClass('miAvatar');
    break

    case 'icon-pelota':
      $$('#icon-pelota').addClass('miAvatar');
      $$('#nene').removeClass('miAvatar');
      $$('#avion').removeClass('miAvatar');
      $$('#nena').removeClass('miAvatar');
      $$('#icon-mariposa').removeClass('miAvatar');
      $$('#flor').removeClass('miAvatar');
    break

    case 'flor':
      $$('#flor').addClass('miAvatar');
      $$('#nene').removeClass('miAvatar');
      $$('#avion').removeClass('miAvatar');
      $$('#nena').removeClass('miAvatar');
      $$('#icon-mariposa').removeClass('miAvatar');
      $$('#icon-pelota').removeClass('miAvatar');  
    break  
  } 

}

//Login de usuario-------------------

 function loginUsuarios() {
   emailLogin = $$('#emailLogin').val();
   passLogin = $$('#passLogin').val();
   
    emLogin = emailLogin;

 // var datosLog = {
 //   Email: emailLogin,
 //   Password: passLogin,
 // }

 firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin)
 .then((docRef) => {
     // colUsuarios.doc(emLogin).get(datosLog);

    var docRef = colUsuarios.doc(emLogin);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            nom = doc.data().Nombre;
            emLogin = doc.data().Email;
            console.log('EMAIL: ' + emLogin);
            avatarReg = doc.data().Avatar;

            mainView.router.navigate('/primer-grado/');
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

        // var usuario = firebase.auth().currentUser;

        // if (usuario) {
        //   // User is signed in.
        //   // console.log('Usuario actual: ' + JSON.stringify(datosLog));
        // } else {
        //   // No user is signed in.
        //   console.log('error');
        // }
   })

   .catch((error) =>{
       var errorCode = error.code;
       var errorMessage = error.message;
      if(emailLogin == "" | passLogin == "" ){
         app.dialog.alert('¡Debés completar todos los campos!', 'Atención');
         mainView.router.navigate('/login/');
      }
    })
}

/////////////  AGREGO MATERIAS A LA BD ///////////////

 function fnAgregarMaterias() {
  console.log('funcion materias');
    var nomMateria = "lengua";
    var actNombre = { 
      act1: "Abecedario", 
      act2: "Vocales y consonantes",
      act3: "Comprensión lectora" 
     };

    colMaterias.doc(nomMateria).set(actNombre);

    nomMateria = "matematica";
    actNombre = { act1: "Numeros"};
    
    colMaterias.doc(nomMateria).set(actNombre);

     nomMateria = "ciencias naturales";
    actNombre = { act1: "Naturaleza"};
    
    colMaterias.doc(nomMateria).set(actNombre);

     nomMateria = "ciencias sociales";
    actNombre = { act1: "Fechas Patrias"};
    
    colMaterias.doc(nomMateria).set(actNombre);

 }


/////////////  AGREGO ACTIVIDADES A LA BD ///////////////


// Guarda juego de vocales
    function juegoVocales(miEmail, nomJuego) {
      console.log('juego vocal');

    var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            nomJuego = { nombreActividad : "Vocales"};
            actResueltas.doc(miEmail).set(nomJuego);
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

        // var usuario = firebase.auth().currentUser;

        // if (usuario) {
        //   // User is signed in.
        //   // console.log('Usuario actual: ' + JSON.stringify(datosLog));
        // } else {
        //   // No user is signed in.
        //   console.log('error');
        // }

}

// Guarda juego de mozart

function juegoMozart(miEmail, nomJuego) {
  console.log('juego mozart');

 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
           var nomJuego = { nombreActividad : "Mozart"};
            actResueltas.doc(miEmail).set(nomJuego);
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


// Guarda juego de jirafa

function juegoJirafa(miEmail, nomJuego) {
  console.log('juego jirafa');

 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            nomJuego = { nombreActividad : "Jirafa Fita"};
            actResueltas.doc(miEmail).set(nomJuego);
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


// Guarda juego de vocales

function buscandoVocales(miEmail, nomJuego) {
  console.log('juego vocales');

 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            nomJuego = { nombreActividad : "Buscando las vocales"};
            actResueltas.doc(miEmail).set(nomJuego);
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}



// Guarda juego de consonante

function juegoConsonante(miEmail, nomJuego) {
  console.log('juego consonante');

 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            nomJuego = { nombreActividad : "B ó V"};
            actResueltas.doc(miEmail).set(nomJuego);
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}




// CERRAR SESIÓN DE USUARIO
function cerrarSesion() {
  firebase.auth().signOut().then(() => {
  // Sign-out successful.
mainView.router.navigate('/login/');
   
    console.log('Cerré sesión');
}).catch((error) => {
  // An error happened.
   console.log('Error ' + error);
});
}