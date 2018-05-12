//////////////////////////////////////////////////////////////////////
//																                                	//
// Router de la aplicacion			 		 						                    //
// --------------------------------------------------			        	//
//																                                	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		    //
// @version 1.0.0												                          	//
//															                                		//
//////////////////////////////////////////////////////////////////////

// Importo las librerias que necesito
const express = require('express');

// Importo el controlador de los challenge
const challengeCtrl = require('../controllers/challenge');

// Importo el controlador de los user
const userCtrl = require('../controllers/user');

// Construyo un enruador (todavia no se para que funciona)
const api = express.Router();

// Importo el middleware de autenficacion
var auth = require('../services/auth_services');

//////////////////////////////////////////////////////////////////
// Definición de las rutas								                  		//
//////////////////////////////////////////////////////////////////

api.get('/', function(request, response) {
  response.send('Hello World!');
});

//////////////////////////////////////////////////////////////////
// API del Lider de Grupo 								                  		//
//////////////////////////////////////////////////////////////////

api.get('/leader/consultarReto', challengeCtrl.getChallenge);

api.post('/leader/crearReto', challengeCtrl.setChallenge);

api.get('/leader/consultarReto/:ChallengeID', challengeCtrl.getChallengeById);

api.delete('/leader/EliminarReto/:ChallengeID', challengeCtrl.deleteChallenge);

api.put('/leader/EditarReto/:ChallengeID', challengeCtrl.updateChallenge);

//////////////////////////////////////////////////////////////////
// API del Users           								                  		//
//////////////////////////////////////////////////////////////////

api.post('/user/crearUsuario', userCtrl.signUp);

api.post('/user/ingresarUsuario', userCtrl.signIn);

api.get('/user/obtenerPuntosUser', auth, userCtrl.getUserPoint);

api.post('/user/aceptarReto', auth, challengeCtrl.acceptChallenge);

api.delete('/user/renunciarReto/:ChallengeID', auth, challengeCtrl.quitChallenge);

api.get('/user/consultarRetos', auth, challengeCtrl.getUserChallenges);

api.get('/user/consultarOtrosRetos', auth, challengeCtrl.getUserNoChallenges);

//////////////////////////////////////////////////////////////////
// API del Admin           								                  		//
//////////////////////////////////////////////////////////////////

api.get('/admin/consultarUsuarios', userCtrl.getUsers);


//////////////////////////////////////////////////////////////////
// Test de Auth           								                  		//
//////////////////////////////////////////////////////////////////

api.get('/privateTest', auth, function(req,res){
  res.send({"Paquete" : req.user});
});

module.exports = api;