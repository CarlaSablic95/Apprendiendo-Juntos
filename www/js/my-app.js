
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
      { path: '/segundo-grado/', url: 'segundo-grado.html', },
      { path: '/tercer-grado/', url: 'tercer-grado.html', },
      { path: '/lengua/', url: 'lengua.html', },
      { path: '/matematica/', url: 'matematica.html', },
      { path: '/sociales/', url: 'sociales.html', },
      { path: '/naturales/', url: 'naturales.html', },
      { path: '/abecedario/', url: 'abecedario.html', },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    // console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {

    // console.log(e);

    //- With callbacks on click
var ac5 = app.actions.create({
  buttons: [
    {
      text: 'Registrarme',
      onClick: function () {
        app.dialog.alert('Button1 clicked')
      }
    },
    {
      text: 'Iniciar sesión',
      onClick: function () {
        app.dialog.alert('Button2 clicked')
      }
    },
    {
      text: 'Cancelar',
      color: 'red',
      onClick: function () {
        app.dialog.alert('Cancel clicked')
      }
    },
  ]
});
 
})

$$(document).on('page:init', '.page[data-name="primer-grado"]', function (e) {

    // console.log(e);
  
})
