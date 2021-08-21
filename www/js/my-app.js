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
        // RUTAS GENERALES
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



const fecha = "";
var colFechas = db.collection("fechaHora");


 // Para el usuario
 var nombre="", emailReg="", emLogin="", passReg="", passLogin= "", fechaNac="";

 var avatarReg="", avatarElegido="", valRespuestas="";

// VAR GLOBALES PARA LAS MATERIAS


 var botella="", ventana="", libro="", uva="";


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialize
    // console.log(e);

      
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
      
      // ocultamos el navbar y toolbar
      app.navbar.hide('#navbar');
      app.toolbar.hide('#toolBar');

//Al hacer click en Registrarme, llamo a la funcion para registro de usuarios
      $$('#btnRegistro').on('click', registroUsuarios);

      $$('.fotoPerfil').on('click', avatarUsuario);

})

// FUNCIÓN QUE REGISTRA A LOS USUARIOS

function registroUsuarios() {
  avatarReg = $$('.fotoPerfil').attr();
  nombre = $$('#nombreReg').val();
  emailReg = $$('#emRegistro').val();
  passReg = $$('#passRegistro').val();

  firebase.auth().createUserWithEmailAndPassword(emailReg, passReg)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    mainView.router.navigate('/login/');
    console.info(`Usuario con email: ${emailReg} registrado con éxito`);
    // avatarReg = $$('.fotoPerfil').attr('src', `img/iconos/${avatarElegido}.png`);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
    // Que los campos no vengan vacíos

    if(typeof nombre !== "string") return console.warn(`${nombre} no es un nombre válido`);
    if(passReg.length > 8) return console.warn("La contraseña no puede exceder los 8 caracteres");
  });

}


// Elijo foto de perfil

function avatarUsuario() {
  avatarElegido = this.id;
  console.log('Avatar elegido: ' + avatarElegido);

// Evalúo distintos casos, dependiendo de la imagen que elijo
  switch(avatarElegido){
      case 'estrella':
        $$('#estrella').addClass('miAvatar');
        $$('#guitarra').removeClass('miAvatar');
        $$('#manzana').removeClass('miAvatar');
        $$('#piano').removeClass('miAvatar');
        $$('#pelota').removeClass('miAvatar');
        $$('#pintar').removeClass('miAvatar');
      break

      case 'manzana':
        $$('#manzana').addClass('miAvatar');
        $$('#estrella').removeClass('miAvatar');
        $$('#guitarra').removeClass('miAvatar');
        $$('#piano').removeClass('miAvatar');
        $$('#pelota').removeClass('miAvatar');
        $$('#pintar').removeClass('miAvatar');
          
      break

      case 'piano':
        $$('#piano').addClass('miAvatar');
        $$('#estrella').removeClass('miAvatar');
        $$('#guitarra').removeClass('miAvatar');
        $$('#manzana').removeClass('miAvatar');
        $$('#pelota').removeClass('miAvatar');
        $$('#pintar').removeClass('miAvatar');
            
      break

      case 'guitarra':
        $$('#guitarra').addClass('miAvatar');
        $$('#estrella').removeClass('miAvatar');
        $$('#manzana').removeClass('miAvatar');
        $$('#piano').removeClass('miAvatar');
        $$('#pelota').removeClass('miAvatar');
        $$('#pintar').removeClass('miAvatar');
      break

      case 'pelota':
        $$('#pelota').addClass('miAvatar');
        $$('#estrella').removeClass('miAvatar');
        $$('#guitarra').removeClass('miAvatar');
        $$('#manzana').removeClass('miAvatar');
        $$('#piano').removeClass('miAvatar');
        $$('#pintar').removeClass('miAvatar');
      break

      case 'pintar':
        $$('#pintar').addClass('miAvatar');
        $$('#estrella').removeClass('miAvatar');
        $$('#guitarra').removeClass('miAvatar');
        $$('#manzana').removeClass('miAvatar');
        $$('#piano').removeClass('miAvatar');
        $$('#pelota').removeClass('miAvatar');  
      break  
  } 

}



// LOGIN--------------------------------------------------------------

$$(document).on('page:init', '.page[data-name="login"]', function (e) {

    console.log("carga login");
      app.navbar.hide('#navBar');
      app.toolbar.hide('#toolBar');

      

  console.log('Mi Nombre: ' + nombre);

      $$('#btnLogin').on('click', loginUsuarios);
})


// LOGIN

function loginUsuarios() {
  nombre;
  emLogin = $$('#emailLogin').val();
  passLogin = $$('#passLogin').val();


  firebase.auth().signInWithEmailAndPassword(emLogin, passLogin)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
       console.info("Bienvenido/a " + nombre);
       mainView.router.navigate('/primer-grado/');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      if(emLogin !== emailReg) return console.error('El email es incorrecto');

      if(passLogin !== passReg) return console.error('La contraseña es incorrecta');
    });

}


// PERFIL----------------------------------------

$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
nombre;
// Muestro el Navbar y Toolbar para la pagina del listado de las materias
    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

      // $$('#avatarUsuario').attr('src', avatarElegido);
      // Se muestra el avatar en el perfil
      $$('#avatarUsuario').attr('src', `img/iconos/${avatarElegido}.png`);
      $$('#nomUsuario').html('<p>Nombre: ' + nombre +'</p>');
      $$('#emUsuario').html('<p>Email: ' + emLogin + '</p>');

      $$('.open-confirm').on('click', function () {
        app.dialog.confirm('¿Estás seguro/a de cerrar sesión?', nombre , function () {
          mainView.router.navigate('/login/');
          app.dialog.alert('¡Volvé pronto!');
        });
      });

        $$('#btnLogout').on('click', cerrarSesion);

        
        
})
      

      // CERRAR SESIÓN DE USUARIO
      function cerrarSesion() {
        firebase.auth().signOut().then(() => {
          mainView.router.navigate('/login/');
        }).catch((error) => {
          // An error happened.
          console.error(error);
        });
      }

// MIS JUEGOS
$$(document).on('page:init', '.page[data-name="juegos"]', function (e) {

    console.log("carga misJuegos");

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    var queryMaterias = colMaterias.where("nombre", "==", nomMateria)
    queryMaterias.get('nomMateria')
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    // consulto a la coleccion "actResueltas", que está en la BD
    // donde el email sea igual al email del usuario logueado
var queryJuegosRealizados = actResueltas.where('email', '==', emLogin).orderBy('fecha');
  queryJuegosRealizados.get('email', 'nombreActividad', 'nombreMateria')

  .then((querySnapshot) => {
      $$('#misJuegos').html('');
        querySnapshot.forEach((doc) => { //
          $$('#materia').append('<h3>'+ doc.data().nombreMateria + '</h3>');
          $$('#misJuegos').append('<h3>'+ doc.data().nombreActividad + '</h3>');
        });

        
  }).catch((error) => console.log('No se pueden mostrar los juegos realizados: ' + error));

  
    docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          console.log("OK! Con el ID: " + docRef.id);
            nomJuego = doc.data().nombreActividad;
              console.log('NOMBRE JUEGO: ' + JSON.stringify(nomJuego));
                $$('#miProgreso').html('<p>Mis juegos completados: ' + JSON.stringify(nomJuego.nombreActividad) +'</p>');
          } else {
            // doc.data() will be undefined in this case
              console.log("No such document!");
        }
        }).catch((error) => {
              console.log("Error getting document:", error);
        });

})




// 1ER GRADO -> LISTADO DE MATERIAS--------------------------

$$(document).on('page:init', '.page[data-name="primer-grado"]', function (e) {

// Muestro el Navbar y Toolbar para la pagina del listado de las materias
    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');
    
    $$('#miAvatar').attr('src', `img/iconos/${avatarElegido}.png`);
    
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
          $$('#correccion').html('<h4 style="color:#900b0b;">¡Es incorrecto!</h4>');
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
            $$('#nroCor').html('<h3 style="color: #078407;">¡Genial!</h3>' + '<img src="img/iconos/bien.png">');
          } else {
              if(cantidad == "cant2"){
                $$('#cant2').addClass('fondoVerde');
                $$('#nro4').addClass('oculto');
                $$('#nroCor').html('<h3 style="color: #078407;">¡Genial!</h3>' + '<img src="img/iconos/bien.png">');
              }
              if(cantidad == "cant1") {
                $$('#cant1').addClass('fondoVerde');
                $$('#nro2').addClass('oculto');
                $$('#nroCor').html('<h3 style="color: #078407;">¡Genial!</h3>' + '<img src="img/iconos/bien.png">');
              }
              if(cantidad == "cant3") {
                $$('#cant3').addClass('fondoVerde');
                $$('#nro5').addClass('oculto');
                $$('#nroCor').html('<h3 style="color: #078407;">¡Genial!</h3>' + '<img src="img/iconos/bien.png">');
              }
              if(cantidad == "cant5") {
                $$('#cant5').addClass('fondoVerde');
                $$('#nro6').addClass('oculto');
                $$('#nroCor').html('<h3 style="color: #078407;">¡Genial!</h3>' + '<img src="img/iconos/bien.png">');
              }
          }
    }

    function nroIncorrecto(id) {
        nroInc = id;
          console.log('ID: ' + nroInc);
            if( nroInc == "nro3") {
              $$('#nro3').addClass('fondoRojo');
              $$('#nroInc').html('<h4 style="color:#900b0b;">¡Intentalo otra vez!</h4>');
            } else {
                if(nroInc == "nro4"){
                  $$('#nro4').addClass('fondoRojo');
                  $$('#nroInc').html('<h4 style="color:#900b0b;">¡Intentalo otra vez!</h4>');
                }
                if(nroInc == "nro2") {
                   $$('#nro2').addClass('fondoRojo');
                   $$('#nroInc').html('<h4 style="color:#900b0b;">¡Intentalo otra vez!</h4>');
                }
                if(nroInc == "nro5") {
                   $$('#nro5').addClass('fondoRojo');
                   $$('#nroInc').html('<h4 style="color:#900b0b;">¡Intentalo otra vez!</h4>');
                }
                 if(nroInc == "nro6") {
                    $$('#nro6').addClass('fondoRojo');
                    $$('#nroInc').html('<h4 style="color:#900b0b;">¡Intentalo otra vez!</h4>');
               }
            }
    }


 $$('.popover-cor').on('popover:open', function (e) {
          $$('#cont-popover').html('<h4 style="color:green">¡Muy bien!</h4>' + '<img src="img/iconos/bien.png" alt="">');
      });

    $$('.popover-inc').on('popover:open', function (e) {
          $$('#nroInc').html('<h4 style="color:#900b0b;">¡Es incorrecto!</h4>');
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
          $$('#popoverF').html('<h4 style="color:#900b0b;">¡Es incorrecto!</h4>');
      });
  })

  function rtaVerdadera(id) {
    rtasV = id;
    console.log('rtaVerdadera: ' + rtasV);

      if(rtasV == "mesa") {
        $$('#mesa').addClass('fondoVerde');
        $$('#a').addClass('oculto');
        $$('#popoverV').html('<h3 style="color: #078407;">¡Excelente!</h3>' + '<img src="img/iconos/bien.png">');
      } else {
          if(rtasV == "arbol") {
          $$('#arbol').addClass('fondoVerde');
          $$('#b').addClass('oculto');
          $$('#popoverV').html('<h3 style="color: #078407;">¡Excelente!</h3>' + '<img src="img/iconos/bien.png">');
        }
          if(rtasV == "elefante") {
          $$('#elefante').addClass('fondoVerde');
          $$('#c').addClass('oculto');
          $$('#popoverV').html('<h3 style="color: #078407;">¡Excelente!</h3>' + '<img src="img/iconos/bien.png">');
        }
          if(rtasV == "casa") {
          $$('#casa').addClass('fondoVerde');
          $$('#d').addClass('oculto');
          $$('#popoverV').html('<h3 style="color: #078407;">¡Excelente!</h3>' + '<img src="img/iconos/bien.png">');
        }
      }
  }
  
  function rtaFalsa(id) {
    rtasF = id;
    console.log('rtaFalsa: ' + rtasF);

     if(rtasF == "a") {
        $$('#a').addClass('fondoRojo');
        $$('#popoverF').html('<h4 style="color:#900b0b;">¡Es incorrecto!</h4>');
      } else {
          if(rtasF == "b") {
          $$('#b').addClass('fondoRojo');
          $$('#popoverF').html('<h4 style="color:#900b0b;">¡Es incorrecto!</h4>');
        }
          if(rtasF == "c") {
          $$('#c').addClass('fondoRojo');
          $$('#popoverF').html('<h4 style="color:#900b0b;">¡Es incorrecto!</h4>');
        }
          if(rtasF == "d") {
          $$('#d').addClass('fondoRojo');
          $$('#popoverF').html('<h4 style="color:#900b0b;">¡Es incorrecto!</h4>');
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
            $$('.vocal-1A').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'item-sol':
           $$('#item-sol').addClass('fondoRojo');
            $$('.vocal-2A').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
             // una vez que elige la respuesta incorrecta, tarda 2 milisegundos en desaparecer
            setTimeout(() => {
              $$('#item-sol').addClass('oculto');
            }, 1000);
          break

          case 'item-te':
            $$('#item-te').addClass('fondoRojo');
            $$('.vocal-3A').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
            // una vez que elige la respuesta incorrecta, tarda 2 milisegundos en desaparecer
            setTimeout(() => {
              $$('#item-te').addClass('oculto');
            },1000);
            
          break

           case 'item-naranja':
            $$('#item-naranja').addClass('fondoVerde');
            $$('.vocal-4A').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');

          break
  }
 }          // VOCAL E

        function fnVocalE(id){
          vocalE = id;
            //console.log('Elegido: ' + vocalE);

        switch(vocalE) {
          case 'item-barco':
            $$('#item-barco').addClass('fondoRojo');
            $$('.vocal-1E').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
            setTimeout(() => {
              $$('#item-barco').addClass('oculto');
            },1000);
          break

          case 'item-vaca':
            $$('#item-vaca').addClass('fondoRojo');
            $$('.vocal-2E').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
            setTimeout(() => {
              $$('#item-vaca').addClass('oculto');
            },1000);
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
            $$('.vocal-3I').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
            setTimeout(() => {
              $$('#item-nena').addClass('oculto');
            }, 1000);
          break

          case 'item-ventana':
           $$('#item-ventana').addClass('fondoRojo');
            $$('.vocal-4I').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
            setTimeout(() => {
              $$('#item-ventana').addClass('oculto');
            }, 1000);
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
              $$('.vocal-3O').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
              setTimeout(() => {
                $$('#item-isla').addClass('oculto');
              }, 1000);
            break

            case 'item-pez':
             $$('#item-pez').addClass('fondoRojo');
              $$('.vocal-4O').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
              setTimeout(() => {
                $$('#item-pez').addClass('oculto');
              }, 1000);
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
                $$('.vocal-3U').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
                setTimeout(() => {
                  $$('#item-mariposa').addClass('oculto');
                }, 1000);
              break

              case 'item-libro':
               $$('#item-libro').addClass('fondoRojo');
                $$('.vocal-4U').html('<h3 style="color:#900b0b;" class="text-align-center">Es incorrecto</h3>');
                setTimeout(() => {
                  $$('#item-libro').addClass('oculto');
                }, 1000);
              break
   }
  }    
  

  // FINALIZAR JUEGO VOCALES

    function encontrarVocales() {
      mainView.router.navigate('/mis-juegos/');
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
        // sobreescribo la palabra, con la consonante correcta
          $$('.botella').text(botella);

          $$('#btnBotella').addClass('fondoVerde');
          $$('#v1').addClass('oculto');

        console.log('Palabra: ' + botella);
        $$('#contenido').html('<h3 style="color: #078407;">¡Muy bien!</h3>' + '<img src="img/iconos/bien.png">');
    } else {
       if (palabra == 'btnVentana') {
        // guardo en la variable, para recuperar el texto
        ventana = $$('.ventana').text();
        // reemplazo el _ con la consonante correcta
        ventana = ventana.replace('_', 'V');

        // sobreescribo la palabra, con la consonante correcta
        $$('.ventana').text(ventana);
        $$('#btnVentana').addClass('fondoVerde');
        $$('#b2').addClass('oculto');
        console.log('Palabra: ' + ventana);
        $$('#contenido').html('<h3 style="color: #078407;">¡Muy bien!</h3>' + '<img src="img/iconos/bien.png">');
    }
      if (palabra == 'btnLibro') {
        // guardo en la variable, para recuperar el texto
        libro = $$('.libro').text();
        // reemplazo el _ con la consonante correcta
        libro = libro.replace('_', 'B');

        // sobreescribo la palabra, con la consonante correcta
        $$('.libro').text(libro);
        $$('#btnLibro').addClass('fondoVerde');
        $$('#v3').addClass('oculto');
        console.log('Palabra: ' + libro);
        $$('#contenido').html('<h3 style="color: #078407;">¡Muy bien!</h3>' + '<img src="img/iconos/bien.png">');
    }
      if (palabra == 'btnUva') {
        // guardo en la variable, para recuperar el texto
        uva = $$('.uva').text();
        // reemplazo el _ con la consonante correcta
        uva = uva.replace('_', 'V');

        // sobreescribo la palabra, con la consonante correcta
        $$('.uva').text(uva);
        $$('#btnUva').addClass('fondoVerde');
        $$('#b4').addClass('oculto');
        console.log('Palabra: ' + uva);
        $$('#contenido').html('<h3 style="color: #078407;">¡Muy bien!</h3>' + '<img src="img/iconos/bien.png">');
    }
  }
}
    function rtaIncorrecta(id) {
      consonanteInc = id;
      console.log('Consonante: ' + consonanteInc);

      if(consonanteInc == "v1") {
        $$('#v1').addClass('fondoRojo');
        $$('#correccion').html('<h3 style="color: #900b0b;;">¡Es incorrecto!</h3>');
      } else {

          if(consonanteInc == "b2") {
            $$('#b2').addClass('fondoRojo');
            $$('#correccion').html('<h3 style="color: #900b0b;;">¡Es incorrecto!</h3>');
        }
          if(consonanteInc == "v3") {
            $$('#v3').addClass('fondoRojo');
            $$('#correccion').html('<h3 style="color: #900b0b;;">¡Es incorrecto!</h3>');
          }
          if(consonanteInc == "b4") {
            $$('#b4').addClass('fondoRojo');
            $$('#correccion').html('<h3 style="color: #900b0b;;">¡Es incorrecto!</h3>');
        }
    }
}


/////////////  AGREGO MATERIAS A LA BD ///////////////

 

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


