//////////////////////////////////////////////////////////////////////
//																	                                //
// Codigo Web Services de Memoria Colombia 						            	//
// --------------------------------------------------			        	//
//																                                	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		    //
// @version 0.0.2													                          //
//																	                                //
//////////////////////////////////////////////////////////////////////

// Importo las librerias requeridas por la aplicacion
const express = require('express');
const bodyParser = require('body-parser');

// Importo el archivo de configuracion
const config = require('./config');

// Creo la aplicacion bajo el marco de express
const app = express();

// Importo la api que estan en el router creado
const api = require('./routes')

// Ingreso la configuracion del puerto
app.set('port', config.port);

//////////////////////////////////////////////////////////////////
// Permisos CORS 												//
//////////////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//////////////////////////////////////////////////////////////////
/* Configuración del analizador del cuerpo (request) y parámetros (response) */
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
//////////////////////////////////////////////////////////////////

// Le estamos indicando al codigo que cada vez que encuentre algo con /api, use las rutas que se encuentran dentro de api
app.use('/challenge',api);

//////////////////////////////////////////////////////////////////
// Iniciar el servicio a través del puerto elegido 
/////////////////////////////////////////////////////////////////

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//////////////////////////////////////////////////////////////////