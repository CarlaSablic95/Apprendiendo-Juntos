
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
      { path: '/primer-grado/lengua/vyc/vocal-e', url: 'vocal-e.html', },
      { path: '/primer-grado/lengua/lectura', url: 'lectura.html', options: { transition: 'f7-circle',}, },
      { path: '/primer-grado/lengua/lectura/mozart', url: 'mozart.html', options: { transition: 'f7-dive',},  },
      { path: '/primer-grado/lengua/lectura/jirafa', url: 'jirafa.html', options: { transition: 'f7-dive',},  },
      { path: '/primer-grado/lengua/audiocuentos', url: 'audiocuentos.html', },

      // MATEMATICA
      { path: '/primer-grado/matematica/', url: 'matematica.html', },

      // SOCIALES
      { path: '/primer-grado/sociales/', url: 'sociales.html', },

      // NATURALES
      { path: '/primer-grado/naturales/', url: 'naturales.html', },

      // DIBUJO
      { path: '/primer-grado/dibujar/', url: 'dibujar.html', },
      
  {
    path: '/primer-grado/',
    async({ resolve }) {
      if (userIsLoggedIn) {
        resolve({
          url: 'primer-grado.html',
        });
      } else {
        resolve({
            url: 'login.html' ,
        });
      }
    },
  }
 



]



    // ... other parameters
  });


var mainView = app.views.create('.view-main');

// db me hace la conexión a la BD
 var db = firebase.firestore();
 var colUsuarios = db.collection("usuarios");

 var nom="", valRespuestas="";
 var nombreUsuario="";
 var email="";
 var fechaNac="";
 var avatarReg="";
 var avatarElegido="";


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialize
console.log(e);

    
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

//Panel

     
})

// REGISTRO

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {

console.log("carga registro");

app.navbar.hide('#navbar');
app.toolbar.hide('#toolBar');


$$('#btnRegistro').on('click', function() {

 nombreUsuario = $$('#nombreRegistro').val();

 $$('#msjBienvenida').html('<h1> ¡Bienvenido/a, ' +nombreUsuario+'!</h1>');
});

//Al hacer click en Registrarme, llamas a la funcion para registro de usuarios
$$('#btnRegistro').on('click', registroUsuarios);

 
$$('.fotoPerfil').on('click', avatarUsuario);

})

// Elijo foto de perfil

function avatarUsuario() {
  avatarElegido = this.id;
  console.log('Avatar elegido: ' + avatarElegido);

// Evalúo distintos casos, dependiendo de la imagen que el elijo, se selecciona
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

    $$('#nomUsuario').html('<h1> Soy ' +nombreUsuario+' </h1>');


})

// 1ER GRADO -> LISTADO DE MATERIAS--------------------------

$$(document).on('page:init', '.page[data-name="primer-grado"]', function (e) {

// Muestro el Navbar y Toolbar para la pagina del listado de las materias
    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

  
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

// JUEGO MOZART--------------------------------------------------

$$(document).on('page:init', '.page[data-name="mozart"]', function (e) {

    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

    $$('.radio').on('click', FnRespuestas);
    $$('.checkbox').on('click', FnRespuestas);

    $$('#btnFin').on('click', function() {
      $$('.popover-fin').on('popover:open', function (e) {
        console.log('About popover open');
      });
    })
    


function FnRespuestas(){
  //capturo el value de cada input radio
  valRespuestas = this.value;
  console.log('VALUE: ' + valRespuestas);

////////   Respuestas correctas  /////////
    switch(valRespuestas) {
      case 'austria':
      $$('#rta1C').addClass('fondoVerde');
      break

      case 'padre':
      $$('#rta2A').addClass('fondoVerde');
    
      break

       case 'palacios':
       $$('#rta3C').addClass('fondoVerde');
     
       break

       case 'piano':
         $$('#rta4A').addClass('fondoVerde');
         
        break

      case 'violin':
       $$('#rta4D').addClass('fondoVerde');

      break

////////   Respuestas incorrectas  /////////

      case 'paisMaravillas':
       $$('#rta1A').addClass('fondoRojo');
      break

      case 'españa':
       $$('#rta1B').addClass('fondoRojo');
      break

       case 'rumania':
        $$('#rta1D').addClass('fondoRojo');
      break

      case 'hermana':
       $$('#rta2B').addClass('fondoRojo');
      break

      case 'internet':
       $$('#rta2C').addClass('fondoRojo');
      break

      case 'vecino':
       $$('#rta2D').addClass('fondoRojo');
      break

      case 'centro':
       $$('#rta3A').addClass('fondoRojo');
      break

      case 'ciudad':
       $$('#rta3B').addClass('fondoRojo');
      break

      case 'colegio':
       $$('#rta3D').addClass('fondoRojo');
      break

      case 'trompeta':
       $$('#rta4B').addClass('fondoRojo');
      break

      case 'gElectrica':
       $$('#rta4C').addClass('fondoRojo');
      break
    }

   }

})

$$(document).on('page:init', '.page[data-name="dibujar"]', function (e) {
console.log("carga index");

// Oculto navbar y toolbar en el index
    app.navbar.show('#navBar');
    app.toolbar.show('#toolBar');

   colorPickerWheel = app.colorPicker.create({
        inputEl: '#demo-color-picker-wheel',
        targetEl: '#demo-color-picker-wheel-value',
        targetElSetBackgroundColor: true,
        modules: ['wheel'],
        openIn: 'popover',
        value: {
          hex: '#00ff00',
        },
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

    $$('#btnSiguiente').on('click', function(){  
      $$('#juegosVocales').html('');  
    })


    function elegirVocales(id){
      opciones = id;
        console.log('Elegido: ' + opciones);

        switch(opciones) {
          case 'abeja':
            $$('#abeja').addClass('fondoVerde');
            $$('.textoA').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'te':
            $$('#te').addClass('fondoRojo');
            $$('.textoC').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break

           case 'naranja':
            $$('#naranja').addClass('fondoVerde');
            $$('.textoD').html('<h3 style="color:green" class="text-align-center">¡Muy bien!</h3>');
          break

          case 'sol':
           $$('#sol').addClass('fondoRojo');
            $$('.textoB').html('<h3 style="color:#d00000" class="text-align-center">Es incorrecto</h3>');
          break
          
        }

      }
})


// Registro de usuario-----------------------------------------
function registroUsuarios() {
  
  // Guardo en variables cada dato que el usuario ingresa
    nom = $$('#nombreRegistro').val();
    email = $$('#emailRegistro').val();
    pass = $$('#passRegistro').val();
    fechaNacReg = $$('#fechaNacReg').val();
    avatarReg;
   
    // Guardo el email del usuario en una variable
    idUsuario = email;

  
   

firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((user) => {

      // Datos de usuario guardados en BD
        var datosReg = {
            Nombre: nom,
            Email: email,
            Fecha: fechaNacReg,
            Password: pass,
            Avatar: avatarElegido, // debo validar foto de perfil?
          };
          colUsuarios.doc(email).set(datosReg);
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

  
}


//Login de usuario-------------------

 function loginUsuarios() {
   emailLogin = $$('#emailLogin').val();
   passLogin = $$('#passLogin').val();

 emLogin = emailLogin;

 var datosLog = {
   Email: emailLogin,
   Password: passLogin
 }

 firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin)
 .then((docRef) => {
     colUsuarios.doc(emLogin).set(datosLog);
         mainView.router.navigate('/primer-grado/');
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