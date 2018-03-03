//////////////////////////////////////////////////////////////////////
//																	//
// Controlador de las rutas de Challenge	 						//
// --------------------------------------------------				//
//																	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		//
// @version 1.0.0													//
//																	//
//////////////////////////////////////////////////////////////////////

// Importo los modulos necesarios
const connection = require('../services/DB_connection');

//////////////////////////////////////////////////////////////////
//       Definicion de las funciones                            //
//////////////////////////////////////////////////////////////////

// GET: Se consultan todos los retos 
function getChallenge(req, res){
    console.log('GET: Consultando todos los retos ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('SELECT * FROM Challenge', 
                                 function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error	
		}
		else 
		{
			// En caso de éxito y retorno los registros de la entidad
			res.status(200).json({ "Challenge" : rows });	// OK
		}
	});

};

// POST: Se crea un nuevo reto
function setChallenge(req, res){
    console.log('POST: Creando un nuevo reto...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('INSERT INTO Challenge(ChallengeName, ChallengeDescription, ChallengeEvidence, ChallengePoint, ChallengeDueDate) VALUES(?, ?, ?, ?, ?)', 
                                 [req.body.ChallengeName, req.body.ChallengeDescription, req.body.ChallengeEvidence , req.body.ChallengePoint, req.body.ChallengeDueDate], function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito retorno los registros de la entidad
			res.status(200).json({ "Challenge" : rows });	// OK
		}
	});
};

// GET: Se consulta un reto en especifico
function getChallengeById(req, res){
    console.log('GET: Consultando un reto en especifico ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('SELECT * FROM Challenge WHERE Challenge.ChallengeID = ?', 
                                 [req.params.ChallengeID], function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito retorno los registros de la entidad
			res.status(200).json({ "Challenge" : rows });	// OK
		}
	});
}

// DELETE: Se elimina un reto creado
function deleteChallenge(req, res){
    console.log('DELETE: Eliminando la informacion de un Reto ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");
 
    // Realizo la consulta
    var query = connection.query('DELETE FROM Challenge WHERE ChallengeID = ?', 
    								[req.params.ChallengeID], function(err, rows){
        
        // Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito y retorno los registros de la entidad
			res.status(200).json({ "Challenge" : rows });	// OK
		}
    });
}

// PUT: Se actualiza la informacion de un reto
function updateChallenge(req, res){
    console.log('PUT: Actualizando la informacion de un Reto ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");
 
    // Realizo la consulta
    var query = connection.query('UPDATE Challenge SET ChallengeName = ?, ChallengeDescription = ?, ChallengeEvidence = ?, ChallengePoint = ?, ChallengeDueDate = ?  WHERE ChallengeID = ?', 
    								[req.body.ChallengeName, req.body.ChallengeDescription, req.body.ChallengeEvidence , req.body.ChallengePoint, req.body.ChallengeDueDate, req.params.ChallengeID], function(err, rows) {
        
        // Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito y retorno los registros de la entidad
			res.status(200).json({ "Challenge" : rows });	// OK
		}
    });
}

// POST: Se acepta un reto dentro de la aplicacion.
function acceptChallenge(req, res){
    console.log('POST: Se acepta un reto dentro de la aplicacion ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");
	
	// Consultar las entidades a la base de datos
	var queryGet = connection.query('SELECT UserID FROM UserData WHERE UserData.UserUUID = ?', 
                                 [req.user], function(err1, rows1) {

		// Verificar si sucedió un error durante la consulta
		if (err1){
			console.error(err1);
			res.status(500).json({ "error" : err1 });	// Server Error
		}
		else{
			// Realizo la consulta encargado de realizar el registro
			var queryPost = connection.query('INSERT INTO RelUserChallenge(UserID, ChallengeID) VALUES (?, ?)',
											[rows1[0].UserID ,req.body.ChallengeID], function(err2, rows2){

				// Verifico si sucedio un error durante la consulta
				if(err2){
					console.error(err2);
					res.status(500).json({"error" : err2});
				}
				else{
					// En caso de ser exitoso retorno la confirmacion del ingreso del registro
					res.status(200).json({"User" : rows2});
				}

			});
		}
	});
};

// GET: Consulto una lista de todos los retos que acepto un usuario
function getUserChallenges(req, res){
	console.log('GET: Se consultan todos los retos aceptados por un usuario...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	var queryGetUser = connection.query('SELECT UserID FROM UserData WHERE UserData.UserUUID = ?',
										[req.user], function(err1, rows1){

		// Verifico si sucedio un error durante la consulta
		if(err1){
			console.error(err1);
			res.status(500).json({"error" : err1});
		}
		else{
			// Realizo la consulta encargada de retorna la lista de retos aceptados por el usuario
			var queryGetChallenge = connection.query('SELECT Challenge.ChallengeID, Challenge.ChallengeName, Challenge.ChallengeDescription, Challenge.ChallengeEvidence, Challenge.ChallengePoint, Challenge.ChallengeDueDate FROM Challenge INNER JOIN RelUserChallenge ON Challenge.challengeID = RelUserChallenge.ChallengeID WHERE RelUserChallenge.UserID = ?',
													[rows1[0].UserID], function(err2, rows2){

				// Verifico si sucedio un error durante la consulta
				if(err2){
					console.error(err2);
					res.status(500).json({"error" : err2});
				}
				else{
					// En caso de ser exitoso retorno la confirmacion del ingreso del registro
					res.status(200).json({"Challenge" : rows2});
				}

			});
		}
	});
}

// GET: Consulto una lista de todos los retos que NO acepto un usuario
function getUserNoChallenges(req, res){
	console.log('GET: Se consultan todos los retos que no han sido aceptados por un usuario...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	var queryGetUser = connection.query('SELECT UserID FROM UserData WHERE UserData.UserUUID = ?',
										[req.user], function(err1, rows1){

		// Verifico si sucedio un error durante la consulta
		if(err1){
			console.error(err1);
			res.status(500).json({"error" : err1});
		}
		else{
			// Realizo la consulta encargada de retorna la lista de retos aceptados por el usuario
			var queryGetChallenge = connection.query('SELECT Challenge.ChallengeID, Challenge.ChallengeName, Challenge.ChallengeDescription, Challenge.ChallengeEvidence, Challenge.ChallengePoint, Challenge.ChallengeDueDate FROM Challenge WHERE Challenge.ChallengeID NOT IN (SELECT Challenge.ChallengeID FROM Challenge INNER JOIN RelUserChallenge ON RelUserChallenge.ChallengeID = Challenge.ChallengeID WHERE RelUserChallenge.UserID = ?)',
													[rows1[0].UserID], function(err2, rows2){

				// Verifico si sucedio un error durante la consulta
				if(err2){
					console.error(err2);
					res.status(500).json({"error" : err2});
				}
				else{
					// En caso de ser exitoso retorno la confirmacion del ingreso del registro
					res.status(200).json({"Challenge" : rows2});
				}

			});
		}
	});
}


module.exports = {
    getChallenge,
    setChallenge,
    getChallengeById,
    deleteChallenge,
	updateChallenge,
	acceptChallenge,
	getUserChallenges,
	getUserNoChallenges
}