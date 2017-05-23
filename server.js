//////////////////////////////////////////////////////////////////////
//																	//
// Codigo Web Services de Memoria Colombia 							//
// --------------------------------------------------				//
//																	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		//
// @version 0.0.2													//
//																	//
//////////////////////////////////////////////////////////////////////

/* Módulos requeridos por la aplicación */

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));

//////////////////////////////////////////////////////////////////
/* Código a ejecutar al iniciar la conexión a la base de datos */
var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(function(error){
   if(error){
   	console.log("Error conectandose a la base de datos");
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
// Permisos CORS 												//
//////////////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});*/

//////////////////////////////////////////////////////////////////
/* Configuración del analizador del cuerpo (request) y parámetros (response) */
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Definición de las rutas										//
//////////////////////////////////////////////////////////////////
app.get('/', function(request, response) {
  response.send('Hello World!');
});

//////////////////////////////////////////////////////////////////
//       API de Lider                                           //
//////////////////////////////////////////////////////////////////

/* Se consultan todos los retos */

app.get('/challenge/leader/consultarReto', function(req, res, next) {

	console.log('Consultando todos los retos ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('SELECT * FROM challenge', 
                                 function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);

			res.status(500);	// Server Error

			res.json({ "error" : err });
		}
		else 
		{
			// En caso de éxito

			res.status(200);	// OK

			// Retornar los registros de la entidad
			res.json({ "Challenge" : rows });
		}
	});

});

//////////////////////////////////////////////////////////////////

/* Creo un nuevo reto  */

app.post('/challenge/leader/crearReto', function(req, res, next) {

	console.log('Creando un nuevo reto...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('INSERT INTO challenge(name_challenge, descrip_challenge, eviden_challenge, point_challenge, due_challenge) VALUES(?, ?, ?, ?, ?)', 
                                 [req.body.challenge.name_challenge, req.body.challenge.descrip_challenge, req.body.challenge.eviden_challenge , req.body.challenge.point_challenge, req.body.challenge.due_challenge], function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);

			res.status(500);	// Server Error

			res.json({ "error" : err });
		}
		else 
		{
			// En caso de éxito

			res.status(200);	// OK

			// Retornar los registros de la entidad
			res.json({ "Challenge" : rows });
		}
	});

});

//////////////////////////////////////////////////////////////////

/* Se consultan un reto en especifico */

app.get('/challenge/leader/consultarReto/:id_challenge', function(req, res, next) {

	console.log('Consultando un reto en especifico ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('SELECT * FROM challenge WHERE challenge.id_challenge = ?', 
                                 [req.params.id_challenge], function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);

			res.status(500);	// Server Error

			res.json({ "error" : err });
		}
		else 
		{
			// En caso de éxito

			res.status(200);	// OK

			// Retornar los registros de la entidad
			res.json({ "Challenge" : rows });
		}
	});

});

//////////////////////////////////////////////////////////////////

// Elimino un reto de la base de datos

app.delete('/challenge/leader/EliminarReto/:id_challenge', function(req, res, next) {
 
	console.log('Eliminando la informacion de un Reto ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");
 
    // Realizo la consulta
    var query = connection.query('DELETE FROM challenge WHERE id_challenge = ?', 
    								[req.params.id_challenge], function(err, rows){
        
        // Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);

			res.status(500);	// Server Error

			res.json({ "error" : err });
		}
		else 
		{
			// En caso de éxito

			res.status(200);	// OK

			// Retornar los registros de la entidad
			res.json({ "Challenge" : rows });
		}

    });

});

//////////////////////////////////////////////////////////////////

// Cambia la informacion de un Reto
app.put('/challenge/leader/EditarReto/:id_challenge', function(req, res, next) {
 
	console.log('Actualizando la informacion de un Reto ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");
 
    // Realizo la consulta
    var query = connection.query('UPDATE challenge SET name_challenge = ?, descrip_challenge = ?, eviden_challenge = ?, point_challenge = ?, due_challenge = ?  WHERE id_challenge = ?', 
    								[req.body.challenge.name_challenge, req.body.challenge.descrip_challenge, req.body.challenge.eviden_challenge , req.body.challenge.point_challenge, req.body.challenge.due_challenge, req.params.id_challenge], function(err, rows) {
        
        // Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);

			res.status(500);	// Server Error

			res.json({ "error" : err });
		}
		else 
		{
			// En caso de éxito

			res.status(200);	// OK

			// Retornar los registros de la entidad
			res.json({ "Challenge" : rows });
		}

    });

});

//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
// Iniciar el servicio a través del puerto elegido 
/////////////////////////////////////////////////////////////////

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//////////////////////////////////////////////////////////////////