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

// Importo el controlador de los retos
const challengeCtrl = require('../controllers/challenge');

// Construyo un enruador (todavia no se para que funciona)
const api = express.Router();

//var auth = require('../middlewares/auth');

//////////////////////////////////////////////////////////////////
// Definición de las rutas								                  		//
//////////////////////////////////////////////////////////////////

api.get('/', function(request, response) {
  response.send('Hello World!');
});

api.get('/leader/consultarReto', challengeCtrl.getChallenge);

api.post('/leader/crearReto', challengeCtrl.setChallenge);

api.get('/leader/consultarReto/:id_challenge', challengeCtrl.getChallengeById);

api.delete('/leader/EliminarReto/:id_challenge', challengeCtrl.deleteChallenge);

api.put('/challenge/leader/EditarReto/:id_challenge', challengeCtrl.updateChallenge);

module.exports = api;