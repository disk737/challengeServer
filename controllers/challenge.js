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
			res.status(200).json({ "Challenge" : rows });;	// OK
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

module.exports = {
    getChallenge,
    setChallenge,
    getChallengeById,
    deleteChallenge,
    updateChallenge
}