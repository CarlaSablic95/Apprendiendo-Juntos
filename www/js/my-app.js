
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

      { path: '/primer-grado/', url: 'primer-grado.html', },
      { path: '/primer-grado/lengua/', url: 'lengua.html', },
      { path: '/primer-grado/lengua/abecedario/', url: 'abecedario.html', },
      { path: '/primer-grado/lengua/vyc/', url: 'vyc.html', },
      { path: '/primer-grado/lengua/vyc/vocales', url: 'vocales.html', },
      { path: '/primer-grado/matematica/', url: 'matematica.html', },
      { path: '/primer-grado/sociales/', url: 'sociales.html', },
      { path: '/primer-grado/naturales/', url: 'naturales.html', },
      
]



    // ... other parameters
  });


var mainView = app.views.create('.view-main');

// db me hace la conexión a la BD
 var db = firebase.firestore();
 var colUsuarios = db.collection("usuarios");
 var nom="";

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
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
console.log("carga index");

    app.navbar.hide('#navBar');

    app.toolbar.hide('#toolBar');

    $$('#registro').on('click', function(){
      mainView.router.navigate('/registro/');
    })

    $$('#login').on('click', function(){
      mainView.router.navigate('/login/');
    })

})


$$(document).on('page:init', '.page[data-name="registro"]', function (e) {

$$('#btnRegistro').on('click', registrarUsuarios);

app.navbar.hide('#navbar');

app.toolbar.hide('#toolBar');


})


$$(document).on('page:init', '.page[data-name="login"]', function (e) {

app.navbar.hide('#navBar');

app.toolbar.hide('#toolBar')

$$('#btnLogin').on('click', loginUsuarios);


})



$$(document).on('page:init', '.page[data-name="primer-grado"]', function (e) {

    app.navbar.show('#navBar');

    app.toolbar.show('#toolBar');
  
})

$$(document).on('page:init', '.page[data-name="lengua"]', function (e) {

    app.navbar.show('#navBar');

    app.toolbar.show('#toolBar');
  
})


$$(document).on('page:init', '.page[data-name="matematica"]', function (e) {

    app.navbar.show('#navBar');

    app.toolbar.show('#toolBar');
  
})

$$(document).on('page:init', '.page[data-name="sociales"]', function (e) {

    app.navbar.show('#navBar');

    app.toolbar.show('#toolBar');
  
})

$$(document).on('page:init', '.page[data-name="naturales"]', function (e) {

    app.navbar.show('#navBar');

    app.toolbar.show('#toolBar');
  
})

$$(document).on('page:init', '.page[data-name="abecedario"]', function (e) {

    app.navbar.show('#navBar');

    app.toolbar.show('#toolBar');
  
})

$$(document).on('page:init', '.page[data-name="vyc"]', function (e) {

    app.navbar.show('#navBar');

    app.toolbar.show('#toolBar');
})

$$(document).on('page:init', '.page[data-name="vocales"]', function (e) {

    app.navbar.show('#navBar');

    app.toolbar.show('#toolBar');
  
})





// Registro de usuario
function registrarUsuarios() {
  
    nom = $$('#nombreRegistro').val();
    email = $$('#emailRegistro').val();
    pass = $$('#passRegistro').val();

    idUsuario = email;

  var datosReg = {
    Nombre: nom,
    Email: email,
    Password: pass
  };
   
firebase.auth().createUserWithEmailAndPassword(email, pass)


// creo el usuario en la BD
.then((docRef) => {
 
console.log('Estas registrado ');
if(nom == "") {
    console.log('El campo nombre está vacío');
  } 

   colUsuarios.doc(idUsuario).set(datosReg);
  // Mensaje de bienvenida al usuario

var dynamicPopover = app.popover.create({
  targetEl: 'a.dynamic-popover',
  content: '<div class="popover">'+
              '<div class="popover-inner">'+
                '<div class="block">'+
                  '<p>¡ Bienvenido/a, ' + '<h3>' + nom + '</h3>' + ' !</p>'+
                  '<p><a href="#" class="link popover-close">Cerrar</a></p>'+
                '</div>'+
              '</div>'+
            '</div>',

});

$$('.dynamic-popover').on('click', function () {
  dynamicPopover.open();
});

dynamicPopover.on('close', function (popover) {
 dynamicPopover.close();
});

mainView.router.navigate('/primer-grado/');

})



.catch((error) => {
  var errorCode = error.code;
 var errorMessage = error.message;

  // console.log('error1: ' + errorCode + ' error2: ' + errorMessage);

  if(nom == "") {
    console.log('El campo nombre está vacío');
  } else {
    if(email == ""){
      console.log('El campo email está vacío');
    }
    if(pass < 8) {
      console.log('La contraseña debe contener 8 caracteres');
    }
  }

});

}

//Login de usuario

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

 .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;


  });


}