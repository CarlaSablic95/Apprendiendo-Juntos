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
      { path: '/mis-juegos/', url: 'mis-juegos.html', options: { transition: 'f7-circle',}, },

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
      { path: '/primer-grado/sociales/belgrano', url: 'belgrano.html', },

      // NATURALES
      { path: '/primer-grado/naturales/', url: 'naturales.html', },
      { path: '/primer-grado/naturales/naturaleza', url: 'naturaleza.html', },


]
 // ... other parameters
  });


var mainView = app.views.create('.view-main');

// db hace la conexión a la BD
 var db = firebase.firestore();

 var colUsuarios = db.collection("usuarios");

 var colMaterias = db.collection("materias");

 var colActividades = db.collection("actividades");

 var actResueltas = db.collection("actResueltas");

const fecha = "";
var colFechas = db.collection("fechaHora");

//  var fechaBD ="";

//  var horaBD ="";

//  var hoy="";
// var fecha = "";
// var hora="";
// var diaActual = "";
 // Para el usuario
 var nom="", email="", emailLogin="", emLogin="", fechaNac="";

 var avatarReg="", avatarElegido="", valRespuestas="";

// VAR GLOBALES PARA LAS MATERIAS
 var nomMateria="", nombreMateria="", actNombre="", contenido="", actividad="";

 var nomJuego="";

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
      agregarActividades();
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

      $$('#msjBienvenida').html('<h1 class="bienvenida">¡Bienvenido/a, ' +nom+'!</h1>');

  console.log('Mi Nombre: ' + nom);

      $$('#btnLogin').on('click', loginUsuarios);
})

// PERFIL----------------------------------------

$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {

// Muestro el Navbar y Toolbar para la pagina del listado de las materias
    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
    
      $$('#nomUsuario').html('<p>Nombre: ' + nom +'</p>');
      $$('#emUsuario').html('<p>Email: ' +emLogin+'</p>');

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


// MIS JUEGOS
$$(document).on('page:init', '.page[data-name="juegos"]', function (e) {

    console.log("carga misJuegos");

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    // var queryMaterias = colMaterias.where("nombre", "==", nomMateria)
    // queryMaterias.get('nomMateria')
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });

    // consulto a la coleccion "actResueltas", que está en la BD
    // donde el email sea igual al email del usuario logueado
var queryJuegosRealizados = actResueltas.where('email', '==', email).orderBy('fecha');
  queryJuegosRealizados.get('email', 'nombreActividad', 'nombreMateria')

  .then((querySnapshot) => {
      $$('#misJuegos').html('');
        querySnapshot.forEach((doc) => { //
          $$('#materia').append('<h3>'+ doc.data().nombreMateria + '</h3>');
          $$('#misJuegos').append('<h3>'+ doc.data().nombreActividad + '</h3>');
        });

        
  }).catch((error) => console.log('No se pueden mostrar los juegos realizados: ' + error));

    // docRef.get().then((doc) => {
    //   if (doc.exists) {
    //       console.log("Document data:", doc.data());
    //       console.log("OK! Con el ID: " + docRef.id);
    //         nomJuego = doc.data().nombreActividad;
    //           console.log('NOMBRE JUEGO: ' + JSON.stringify(nomJuego));
    //             $$('#miProgreso').html('<p>Mis juegos completados: ' + JSON.stringify(nomJuego.nombreActividad) +'</p>');
    //       } else {
    //         // doc.data() will be undefined in this case
    //           console.log("No such document!");
    //     }
    //     }).catch((error) => {
    //           console.log("Error getting document:", error);
    //     });

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

    // JUGAR DE NUEVO
    $$('#otroJuego').on('click', function() {
          $$('.opcionCor').removeClass('fondoVerde');
          $$('.rtaFinal').html('');
          $$('.opcionInc').removeClass('fondoRojo');
          $$('.opcionInc').removeClass('oculto');
          $$('.rtas').html('');
          $$('.img-tilde').attr('src', '');
          $$('.img-cruz').attr('src', '');

          // para desseleccionar los inputs de tipo radio
          document.querySelectorAll('[name=demo-radio-start]').forEach((x) => x.checked=false);
      // para desmarcar los checkbox, una vez que reinicia el juego
          $$(".checkbox").prop("checked", false); 
          
    } )


      $$('#btnFin').on('click', juegoMozart);

})

function FnRespuestas(){
  //capturo el value de cada input radio
  valRespuestas = this.value; // VALUE DEL INPUT
  console.log('VALUE: ' + valRespuestas);

////////   Respuestas correctas  --> EVALÚO LOS VALUES DE CADA INPUT /////////
    switch(valRespuestas) {
        case 'austria':
          $$('#rta1C').addClass('fondoVerde');
          $$('.rta-austria').attr('src', 'img/iconos/tilde.png');
          $$('#rta1A').addClass('oculto');
          $$('#rta1B').addClass('oculto');
        
          
        break

        case 'padre':
          $$('#rta2A').addClass('fondoVerde');
          $$('.rta-padre').attr('src', 'img/iconos/tilde.png');
          $$('#rta2B').addClass('oculto');
          $$('#rta2C').addClass('oculto');
        break

        case 'palacios':
          $$('#rta3C').addClass('fondoVerde');
          $$('.rta-palacio').attr('src', 'img/iconos/tilde.png');
          $$('#rta3A').addClass('oculto');
          $$('#rta3B').addClass('oculto');
        break

        case 'piano':
          $$('#rta4A').addClass('fondoVerde');
          $$('.rta-piano').attr('src', 'img/iconos/tilde.png');
          $$('#rta4B').addClass('oculto');
          $$('#rta4C').addClass('oculto');
        break

        case 'violin':
          $$('#rta4D').addClass('fondoVerde');
          $$('.rta-violin').attr('src', 'img/iconos/tilde.png');
          $$('#rta4B').addClass('oculto');
          $$('#rta4C').addClass('oculto');
        break

      ////////   Respuestas incorrectas  /////////

        case 'paisMaravillas':
          $$('#rta1A').addClass('fondoRojo');
          $$('.rta-maravillas').attr('src', 'img/iconos/cancelar.png');
        break

        case 'españa':
          $$('#rta1B').addClass('fondoRojo');
          $$('.rta-espania').attr('src', 'img/iconos/cancelar.png');
        break

        case 'hermana':
          $$('#rta2B').addClass('fondoRojo');
          $$('.rta-hermana').attr('src', 'img/iconos/cancelar.png');
          $$('.hna').addClass('bordeRojo');
        break

        case 'internet':
          $$('#rta2C').addClass('fondoRojo');
          $$('.rta-internet').attr('src', 'img/iconos/cancelar.png');
          $$('.internet').addClass('bordeRojo');
        break

        case 'centro':
          $$('#rta3A').addClass('fondoRojo');
          $$('.rta-centro').attr('src', 'img/iconos/cancelar.png');
        break

        case 'ciudad':
          $$('#rta3B').addClass('fondoRojo');
          $$('.rta-ciudad').attr('src', 'img/iconos/cancelar.png');
        break

        case 'trompeta':
          $$('#rta4B').addClass('fondoRojo');
        break

        case 'gElectrica':
          $$('#rta4C').addClass('fondoRojo');
        break
  }
}


// COMP. LECTORA---> CUENTO JIRAFA
$$(document).on('page:init', '.page[data-name="jirafa"]', function (e) {
    $$('.jirafaJuego').on('click', opcionesCorrectas);
    $$('.jirafaJuego').on('click', opcionesIncorrectas);

      $$('#btnFinalizar').on('click', juegoJirafa);
      $$('#rehacer').on('click', function(){

      $$('.good').removeClass('bordeVerde');
      $$('.bad').removeClass('bordeRojo');
      $$('.bad').removeClass('oculto');

      $$('.img-bien').attr('src', '');
      $$('.img-error').attr('src', '');

      // para desseleccionar los inputs de tipo radio
      document.querySelectorAll('[name=demo-radio-start]').forEach((x) => x.checked=false);
})

  function opcionesCorrectas(){
    rtaC= this.value;

    console.log('Mi respuesta: ' + rtaC);

    switch(rtaC) {
          case 'liebre':
            $$('.liebre').attr('src', 'img/iconos/tilde.png');
            $$('#a1').addClass('bordeVerde');
            $$('#b1').addClass('oculto');
            $$('#c1').addClass('oculto');
          break

          case 'acacia':
            $$('.acacia').attr('src', 'img/iconos/tilde.png');
            $$('#b2').addClass('bordeVerde');
            $$('#a2').addClass('oculto');
            $$('#c2').addClass('oculto');
          break

           case 'pelaje':
            $$('.pelaje').attr('src', 'img/iconos/tilde.png');
            $$('#c3').addClass('bordeVerde');
            $$('#a3').addClass('oculto');
            $$('#b3').addClass('oculto');
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
})

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

        $$('.rtaCor').removeClass('fondoVerde')
        $$('.rtaInc').removeClass('fondoRojo');
        $$('.rtaInc').removeClass('oculto');
    });

    $$('.popover-bien').on('popover:open', function (e) {
          $$('#contenido').html('<h4 style="color:green">¡Muy bien!</h4>' + '<img src="img/iconos/bien.png" alt="">');
      });

    $$('.popover-mal').on('popover:open', function (e) {
          $$('#correccion').html('<h4 style="color:#d00000">¡Es incorrecto!</h4>');
      });


})

// MATEMÁTICA--------------------------------------------------------------

$$(document).on('page:init', '.page[data-name="matematica"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

})

// JUEGO NUMEROS ---------------------------------------------------------
$$(document).on('page:init', '.page[data-name="numeros"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
  
$$('.juegoNro').on('click', function() { fnContar(this.id) });
$$('.respuestaInc').on('click', function() { nroIncorrecto(this.id) });

$$('#juegoNuevo').on('click', function() { 
  $$('.juegoNro').removeClass('fondoVerde');
  $$('.respuestaInc').removeClass('fondoRojo');
  $$('.num-opciones').removeClass('oculto');
});

$$('#terminar').on('click', juegoNumeros);


    function fnContar(id) {
      cantidad = id;
        console.log('ID: ' + cantidad);
          if( cantidad == "cant4") {
            $$('#cant4').addClass('fondoVerde');
            $$('#nro3').addClass('oculto');
          } else {
              if(cantidad == "cant2"){
                $$('#cant2').addClass('fondoVerde');
                $$('#nro4').addClass('oculto');
              }
              if(cantidad == "cant1") {
                $$('#cant1').addClass('fondoVerde');
                $$('#nro2').addClass('oculto');
              }
              if(cantidad == "cant3") {
                $$('#cant3').addClass('fondoVerde');
                $$('#nro5').addClass('oculto');
              }
              if(cantidad == "cant5") {
                $$('#cant5').addClass('fondoVerde');
                $$('#nro6').addClass('oculto');
              }
          }
    }

    function nroIncorrecto(id) {
        nroInc = id;
          console.log('ID: ' + nroInc);
            if( nroInc == "nro3") {
              $$('#nro3').addClass('fondoRojo');
            } else {
                if(nroInc == "nro4"){
                  $$('#nro4').addClass('fondoRojo');
                }
                if(nroInc == "nro2") {
                   $$('#nro2').addClass('fondoRojo');
                }
                if(nroInc == "nro5") {
                   $$('#nro5').addClass('fondoRojo');
                }
                 if(nroInc == "nro6") {
                    $$('#nro6').addClass('fondoRojo');
               }
            }
    }


 $$('.popover-cor').on('popover:open', function (e) {
          $$('#cont-popover').html('<h4 style="color:green">¡Muy bien!</h4>' + '<img src="img/iconos/bien.png" alt="">');
      });

    $$('.popover-inc').on('popover:open', function (e) {
          $$('#nroInc').html('<h4 style="color:#d00000">¡Es incorrecto!</h4>');
      });

})

// CIENCIAS SOCIALES------------------------------------------------------

$$(document).on('page:init', '.page[data-name="sociales"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
  
})

// BELGRANO ------------------------------------------------------

$$(document).on('page:init', '.page[data-name="belgrano"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

  $$('.juegoBelgrano').on('click', correcta);
  $$('.juegoBelgrano').on('click', incorrecta);
    
  // Guardar Juego
  $$('#btnGuardar').on('click', juegoBelgrano);

  // Jugar nuevamente
  $$('#aJugar').on('click', function() {
      $$('.tilde').attr('src', '');
      $$('.cruz').attr('src', '');

      $$('.itemOpcionesV').removeClass('bordeVerde');
      $$('.itemOpcionesR').removeClass('bordeRojo');
      $$('.itemOpcionesR').removeClass('oculto');

      // para desseleccionar los inputs de tipo radio
      document.querySelectorAll('[name=demo-radio-start]').forEach((x) => x.checked=false);
  })
})

// Respuestas correctas

function correcta() {
  item = this.value;
    console.log('VALUE: ' + item);

    if(item == "belgrano") {
        $$('.mBelgrano').attr('src', 'img/iconos/tilde.png');
        $$('#belgrano').addClass('bordeVerde');
        $$('#sanMartin').addClass('oculto');
        $$('#castelli').addClass('oculto');
    } else {
      if (item == "españa"){
        $$('.espania').attr('src', 'img/iconos/tilde.png');
        $$('#esp').addClass('bordeVerde');
        $$('#fr').addClass('oculto');
        $$('#ing').addClass('oculto');
      }
    }if (item == "celesteBlanca"){
      $$('.cyb').attr('src', 'img/iconos/tilde.png');
      $$('#celesteB').addClass('bordeVerde');
      $$('#rojaB').addClass('oculto');
      $$('#rojaC').addClass('oculto');
    }

}

// Respuestas incorrectas

function incorrecta() {
  item = this.value;

  switch(item) {
    case 'san martin':
      $$('.sMartin').attr('src', 'img/iconos/cruz.png');
      $$('#sanMartin').addClass('bordeRojo');
    break

    case 'castelli':
      $$('.jCastelli').attr('src', 'img/iconos/cruz.png');
      $$('#castelli').addClass('bordeRojo');
    break

    case 'francia':
      $$('.francia').attr('src', 'img/iconos/cruz.png');
      $$('#fr').addClass('bordeRojo');
    break

    case 'inglaterra':
      $$('.inglaterra').attr('src', 'img/iconos/cruz.png');
      $$('#ing').addClass('bordeRojo');
    break

    case 'rojaBlanca':
      $$('.ryb').attr('src', 'img/iconos/cruz.png');
      $$('#rojaB').addClass('bordeRojo');
    break

    case 'rojaCeleste':
      $$('.ryc').attr('src', 'img/iconos/cruz.png');
      $$('#rojaC').addClass('bordeRojo');
    break

  }

}

// CIENCIAS NATURALES------------------------------------------------------

$$(document).on('page:init', '.page[data-name="cs-naturales"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
  
})

// JUEGO NATURALES ------------------------------------------------------

$$(document).on('page:init', '.page[data-name="naturaleza"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    $$('.rtaV').on('click', function() { rtaVerdadera(this.id) });
    $$('.rtaF').on('click', function() { rtaFalsa(this.id) });
    $$('#juegoNat').on('click', serONoSer);

    // Reinicia el Juego
    $$('#intentos').on('click', function() {
      $$('.rtaV').removeClass('fondoVerde');
      $$('.rtaF').removeClass('fondoRojo');
      $$('.rtaF').removeClass('oculto');
    })

    $$('.popover-rtaVerdadera').on('popover:open', function (e) {
          $$('#popoverV').html('<h4 style="color:green">¡Excelente!</h4>' + '<img src="img/iconos/bien.png" alt="">');
      });

    $$('.popover-rtaFalsa').on('popover:open', function (e) {
          $$('#popoverF').html('<h4 style="color:#d00000">¡Es incorrecto!</h4>');
      });
  })

  function rtaVerdadera(id) {
    rtasV = id;
    console.log('rtaVerdadera: ' + rtasV);

      if(rtasV == "mesa") {
        $$('#mesa').addClass('fondoVerde');
        $$('#a').addClass('oculto');
      } else {
          if(rtasV == "arbol") {
          $$('#arbol').addClass('fondoVerde');
          $$('#b').addClass('oculto');
        }
          if(rtasV == "elefante") {
          $$('#elefante').addClass('fondoVerde');
          $$('#c').addClass('oculto');
        }
          if(rtasV == "casa") {
          $$('#casa').addClass('fondoVerde');
          $$('#d').addClass('oculto');
        }
      }
  }
  
  function rtaFalsa(id) {
    rtasF = id;
    console.log('rtaFalsa: ' + rtasF);

     if(rtasF == "a") {
        $$('#a').addClass('fondoRojo');
      } else {
          if(rtasF == "b") {
          $$('#b').addClass('fondoRojo');
        }
          if(rtasF == "c") {
          $$('#c').addClass('fondoRojo');
        }
          if(rtasF == "d") {
          $$('#d').addClass('fondoRojo');
        }
    }
  }

// ABECEDARIO (ACTIVIDADES)-----------------------------------------------

$$(document).on('page:init', '.page[data-name="abecedario"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');


    // $$('.open-preloader-indicator').on('click', function () {
    //     app.preloader.show();
    //     setTimeout(function () { 
    //       app.preloader.hide(); 
    //     }, 3000);
    //   });


    //Obtengo una referencia al servicio de almacenamiento, que se utiliza para crear referencias en mi depósito de almacenamiento
  
    // var storage = firebase.storage();

  //Creo una referencia de almacenamiento desde el servicio de almacenamiento de firebase

    // var storageRef = storage.ref();


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

    $$('.vocal').on('click', function() { fnVocalA(this.id) });
    $$('.vocal').on('click', function() { fnVocalE(this.id) });
    $$('.vocal').on('click', function() { fnVocalI(this.id) });
    $$('.vocal').on('click', function() { fnVocalO(this.id) });
    $$('.vocal').on('click', function() { fnVocalU(this.id) });

    // JUGAR NUEVAMENTE

$$('#juegoNuevo').on('click', function() { 
    $$('.vocal').removeClass('fondoVerde');
    $$('.vocal-inc').removeClass('fondoRojo');
    $$('.vocal-inc').removeClass('oculto');
    $$('.texto').html('');
});

    $$('#guardarJuego').on('click', encontrarVocales);

 })


function fnVocalA(id){
      vocalA = id;
        console.log('Elegido: ' + vocalA);

        switch(vocalA) {
// VOCAL A
          case 'item-abeja':
            $$('#item-abeja').addClass('fondoVerde');
            $$('#item-sol').addClass('oculto');
            $$('#item-te').addClass('oculto');
            $$('.vocal-1A').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'item-sol':
           $$('#item-sol').addClass('fondoRojo');
            $$('.vocal-2A').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

          case 'item-te':
            $$('#item-te').addClass('fondoRojo');
            $$('.vocal-3A').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

           case 'item-naranja':
            $$('#item-naranja').addClass('fondoVerde');
            $$('.vocal-4A').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
            $$('#item-sol').addClass('oculto');
            $$('#item-te').addClass('oculto');
          break
  }
 }          // VOCAL E

        function fnVocalE(id){
          vocalE = id;
            //console.log('Elegido: ' + vocalE);

        switch(vocalE) {
          case 'item-barco':
            $$('#item-barco').addClass('fondoRojo');
            $$('.vocal-1E').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

          case 'item-vaca':
            $$('#item-vaca').addClass('fondoRojo');
            $$('.vocal-2E').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

           case 'item-estrella':
            $$('#item-estrella').addClass('fondoVerde');
            $$('.vocal-3E').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'item-leon':
           $$('#item-leon').addClass('fondoVerde');
            $$('.vocal-4E').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break
  }
}
      function fnVocalI(id){
        vocalI = id;
         //console.log('Elegido: ' + vocalI);
    // VOCAL I
      switch(vocalI){
        case 'item-bicicleta':
            $$('#item-bicicleta').addClass('fondoVerde');
            $$('.vocal-1I').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'item-jirafa':
            $$('#item-jirafa').addClass('fondoVerde');
            $$('.vocal-2I').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

           case 'item-nena':
            $$('#item-nena').addClass('fondoRojo');
            $$('.vocal-3I').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

          case 'item-ventana':
           $$('#item-ventana').addClass('fondoRojo');
            $$('.vocal-4I').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

        }
}
         function fnVocalO(id){
            vocalO = id;
        // console.log('Elegido: ' + vocalO);
       
         // VOCAL O
        switch(vocalO){
          case 'item-oso':
              $$('#item-oso').addClass('fondoVerde');
              $$('.vocal-1O').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
            break

            case 'item-flor':
              $$('#item-flor').addClass('fondoVerde');
              $$('.vocal-2O').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
            break

             case 'item-isla':
              $$('#item-isla').addClass('fondoRojo');
              $$('.vocal-3O').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
            break

            case 'item-pez':
             $$('#item-pez').addClass('fondoRojo');
              $$('.vocal-4O').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
            break
  }    
}
          function fnVocalU(id){
             vocalU = id;
               //console.log('Elegido: ' + vocalU);
           // VOCAL U
        switch(vocalU){
            case 'item-luna':
                $$('#item-luna').addClass('fondoVerde');
                $$('.vocal-1U').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
              break

              case 'item-frutilla':
                $$('#item-frutilla').addClass('fondoVerde');
                $$('.vocal-2U').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
              break

               case 'item-mariposa':
                $$('#item-mariposa').addClass('fondoRojo');
                $$('.vocal-3U').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
              break

              case 'item-libro':
               $$('#item-libro').addClass('fondoRojo');
                $$('.vocal-4U').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
              break
   }
  }    
  
 
// CONSONANTES (ACTIVIDAD)-------------------------------------------------
    function rtaCorrecta(id) {
      palabra = id;
      console.log('Consonante: ' + palabra);

      if (palabra == 'btnBotella') {
        // guardo en la variable, para recuperar el texto
          botella = $$('.botella').text();
        // reemplazo el _ con la consonante correcta
          botella = botella.replace('_', 'B');
        // sobrescribo la palabra, con la consonante correcta
          $$('.botella').text(botella);

          $$('#btnBotella').addClass('fondoVerde');
          $$('#v1').addClass('oculto');

        console.log('Palabra: ' + botella);
    } else {
       if (palabra == 'btnVentana') {
        // guardo en la variable, para recuperar el texto
        ventana = $$('.ventana').text();
        // reemplazo el _ con la consonante correcta
        ventana = ventana.replace('_', 'V');

        // sobrescribo la palabra, con la consonante correcta
        $$('.ventana').text(ventana);
        $$('#btnVentana').addClass('fondoVerde');
        $$('#b2').addClass('oculto');
        console.log('Palabra: ' + ventana);
    }
      if (palabra == 'btnLibro') {
        // guardo en la variable, para recuperar el texto
        libro = $$('.libro').text();
        // reemplazo el _ con la consonante correcta
        libro = libro.replace('_', 'B');

        // sobrescribo la palabra, con la consonante correcta
        $$('.libro').text(libro);
        $$('#btnLibro').addClass('fondoVerde');
        $$('#v3').addClass('oculto');
        console.log('Palabra: ' + libro);
    }
      if (palabra == 'btnUva') {
        // guardo en la variable, para recuperar el texto
        uva = $$('.uva').text();
        // reemplazo el _ con la consonante correcta
        uva = uva.replace('_', 'V');

        // sobrescribo la palabra, con la consonante correcta
        $$('.uva').text(uva);
        $$('#btnUva').addClass('fondoVerde');
        $$('#b4').addClass('oculto');
        console.log('Palabra: ' + uva);
    }
  }
}
    function rtaIncorrecta(id) {
      consonanteInc = id;
      console.log('Consonante: ' + consonanteInc);

      if(consonanteInc == "v1") {
        $$('#v1').addClass('fondoRojo');
      } else {

          if(consonanteInc == "b2") {
            $$('#b2').addClass('fondoRojo');
        }
          if(consonanteInc == "v3") {
            $$('#v3').addClass('fondoRojo');
          }
          if(consonanteInc == "b4") {
            $$('#b4').addClass('fondoRojo');
        }
    }
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
            Avatar: avatarReg
          };

          colUsuarios.doc(email).set(datosReg);

          console.log('Datos de usuario: '+ JSON.stringify(datosReg));
          console.log('Usuario: ' + JSON.stringify(user));

          mainView.router.navigate('/login/');
         
    })

    .catch((error) =>{
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log('Errores: ' + errorCode + '' + errorMessage);
      if(nom == "" | email == "" | fechaNacReg == "" | pass == "" ){
         app.dialog.alert('¡Debés completar todos los campos!', 'Atención');
         mainView.router.navigate('/registro/');
      }
    });


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
  console.log('ENTRANDO A: login');
   emailLogin = $$('#emailLogin').val();
   passLogin = $$('#passLogin').val();
   
    // emLogin = emailLogin;

 // var datosLog = {
 //   Email: emailLogin,
 //   Password: passLogin,
 // }

 firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin)
 .then((docRef) => {
     // colUsuarios.doc(emLogin).get(datosLog);

    var docRef = colUsuarios.doc(emailLogin);
  
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
            if(emailLogin == "" | passLogin == "" ){
              console.log('Mi email: ' + emailLogin + 'Mi pass: ' +  passLogin);
                app.dialog.alert('¡Debés completar todos los campos!', 'Atención');
                mainView.router.navigate('/login/');
           }
        }
    }).catch((error) =>{
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);

   });
 })
        // var usuario = firebase.auth().currentUser;

        // if (usuario) {
        //   // User is signed in.
        //   // console.log('Usuario actual: ' + (datosLog));
        // } else {
        //   // No user is signed in.
        //   console.log('error');
        // }
  

   
}

/////////////  AGREGO MATERIAS A LA BD ///////////////

 function fnAgregarMaterias() {
  console.log('funcion materias');
     nomMateria = "lengua";
    actNombre = { 
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

// function fnFechayHora() {
//   // hoy = new Date();
//   // console.log('FECHA: ' + Date);
//   // fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
//   // hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
//   // diaActual = fecha + ' ' + hora;

//   // console.log('Hoy es: ' + diaActual);


//   // const timestamp = Date.now();
//   // const Fecha = new Date(timestamp);
//   // console.log('FECHA: ' + Fecha);
 
//   // colFechas.doc(Fecha).set();
// }

/////////////  AGREGO ACTIVIDADES A LA BD ///////////////

function agregarActividades() {
  console.log('entro a función actividades');
// MATERIA LENGUA
nomJuego = "Abecedario";

  contenido = {
    Archivo: "Plantillas imprimibles",
  }
 colActividades.doc(nomJuego).set(contenido);


  nomJuego = "Encontrando las vocales";

  contenido = {
    Video: "Aprendemos las vocales",
    Imágenes: "íconos"
  }

  colActividades.doc(nomJuego).set(contenido);

nomJuego = "¿B ó V?";

  contenido = {
    Video: "Las consonantes y las vocales para niños",
    Imágenes: "íconos"
  }

  colActividades.doc(nomJuego).set(contenido);


  nomJuego = "Mozart, el músico genial";

  contenido = {
     Imágenes: "íconos"
  }

colActividades.doc(nomJuego).set(contenido);


// MATERIA MATEMÁTICA
nomJuego = "¡A contar!";

  contenido = {
     Video: "Aprendemos los números",
     Imágenes: "íconos"
    }

colActividades.doc(nomJuego).set(contenido);

// MATERIA CIENCIAS SOCIALES

nomJuego = "Belgrano";

contenido = {
Imágenes: "imagen"

}
colActividades.doc(nomJuego).set(contenido);

// MATERIA CIENCIAS NATURALES

nomJuego = "Ser o no ser";

contenido = {
  Video: "Seres vivos y seres inertes",
  Imágenes: "iconos"

}
colActividades.doc(nomJuego).set(contenido);

}



// Guarda juego de mozart

function juegoMozart(miEmail, nomJuego) {
  console.log('juego mozart');
    const timestamp = Date.now();
    const Fecha = new Date(timestamp);
    console.log('FECHA: ' + Fecha);
  // ME TRAIGO DE LA BD, LA COLUMNA DE USUARIOS
 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          emLogin = doc.data().Email;
          miEmail = emLogin;
          actividadFecha = {actFecha: Fecha };
          nomJuego = { nombreActividad : "Mozart", email: miEmail, Fecha, nombreMateria: 'Lengua'};
            //actResueltas.doc(miEmail).set(nomJuego);
            actResueltas.add(nomJuego); // add() --> GENERA UN ID AUTOMÁTICO
            mainView.router.navigate('/mis-juegos/');
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }
    // ME TRAIGO DE LA BD, LA COLUMNA DE MATERIAS
  //   var docRef = colMaterias.doc(nomMateria);

  //   docRef.get().then((doc) => {
  //     if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //         nomMateria = 
          
  //         //actResueltas.doc(miEmail).set(nomMateria);
  //         actResueltas.add(nomMateria);
  //         mainView.router.navigate('/mis-juegos/');

  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch((error) => {
  //     console.log("Error getting document:", error);
  // });

// Guarda juego de jirafa

function juegoJirafa(miEmail, nomJuego) {
  console.log('juego jirafa');
  const timestamp = Date.now();
  const Fecha = new Date(timestamp);
  console.log('FECHA: ' + Fecha);

 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            actividadFecha = {actFecha: Fecha };
            nomJuego = { nombreActividad : "Jirafa Fita", email: miEmail, Fecha, nombreMateria: 'Lengua' };
            //actResueltas.doc(miEmail).set(nomJuego);
            actResueltas.add(nomJuego); // add() --> GENERA UN ID AUTOMÁTICO
            mainView.router.navigate('/mis-juegos/');
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

function encontrarVocales(miEmail, nomJuego) {
  console.log('juego vocales');

  const timestamp = Date.now();
  console.log('TIMESTAMP: ' + timestamp);

  const Fecha = new Date(timestamp);
  console.log('FECHA: ' + Fecha);

 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            actividadFecha = {actFecha: Fecha };
            nomJuego = { nombreActividad : "Encontrando las vocales", email: miEmail, Fecha, nombreMateria: 'Lengua' };
            // actResueltas.doc(miEmail).set(nomJuego);
            actResueltas.add(nomJuego); // add() --> GENERA UN ID AUTOMÁTICO
            mainView.router.navigate('/mis-juegos/');
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
  const timestamp = Date.now();
  const Fecha = new Date(timestamp);


 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            actividadFecha = {actFecha: Fecha };
            nomJuego = { nombreActividad : "B ó V", email: miEmail, fecha: Fecha, nombreMateria: 'Lengua' };
            nomMateria = { nomMateria: "Lengua"};
            // actResueltas.doc(miEmail).set(nomJuego);
            actResueltas.add(nomJuego); // add() --> GENERA UN ID AUTOMÁTICO
            mainView.router.navigate('/mis-juegos/');
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


// Guarda JUEGO NUMEROS

function juegoNumeros(miEmail, nomJuego) {
  console.log('juego consonante');
  const timestamp = Date.now();
  const Fecha = new Date(timestamp);

 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            actividadFecha = {actFecha: Fecha };
            nomJuego = { nombreActividad : "¡A contar!", email: miEmail, fecha: Fecha, nombreMateria: 'Matemática' };
            // actResueltas.doc(miEmail).set(nomJuego);
            actResueltas.add(nomJuego); // add() --> GENERA UN ID AUTOMÁTICO
            mainView.router.navigate('/mis-juegos/');
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


// Guarda JUEGO NATURALES

function serONoSer(miEmail, nomJuego) {
  console.log('juego ser o no ser');
  const timestamp = Date.now();
  const Fecha = new Date(timestamp);

 var docRef = colUsuarios.doc(emLogin);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            emLogin = doc.data().Email;
            miEmail = emLogin;
            actividadFecha = {actFecha: Fecha };
            nomJuego = { nombreActividad : "Ser o no ser", email: miEmail, fecha: Fecha, nombreMateria: 'Ciencias Naturales'};
            // actResueltas.doc(miEmail).set(nomJuego);
            actResueltas.add(nomJuego); // add() --> GENERA UN ID AUTOMÁTICO
            mainView.router.navigate('/mis-juegos/');
            console.log('Juego ' + JSON.stringify(nomJuego.nombreActividad) + ' terminado por ' + miEmail);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// Guardo el juego Belgrano

function juegoBelgrano(miEmail, nomJuego) { 
  console.log('juego belgrano');
  const timestamp = Date.now();
  const Fecha = new Date(timestamp);

  var docRef = colUsuarios.doc(emLogin);
  docRef.get().then((doc) => {
    if(doc.exists) {
      console.log("Document data:", doc.data());
      emLogin = doc.data().Email;
      miEmail = emLogin;
      actividadFecha = {actFecha: Fecha };
      nomJuego = { nombreActividad : "Belgrano", email: miEmail, fecha: Fecha, nombreMateria: 'Ciencias Sociales'};

      // actResueltas.doc(miEmail).set(nomJuego);
      actResueltas.add(nomJuego); // add() --> GENERA UN ID AUTOMÁTICO
      mainView.router.navigate('/mis-juegos/');
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