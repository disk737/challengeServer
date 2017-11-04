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
	var query = connection.query('SELECT * FROM challenge', 
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
			res.status(200).json({ "challenge" : rows });	// OK
		}
	});

};

// POST: Se crea un nuevo reto
function setChallenge(req, res){
    console.log('POST: Creando un nuevo reto...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('INSERT INTO challenge(name_challenge, descrip_challenge, eviden_challenge, point_challenge, due_challenge) VALUES(?, ?, ?, ?, ?)', 
                                 [req.body.challenge.name_challenge, req.body.challenge.descrip_challenge, req.body.challenge.eviden_challenge , req.body.challenge.point_challenge, req.body.challenge.due_challenge], function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito retorno los registros de la entidad
			res.status(200).json({ "challenge" : rows });	// OK
		}
	});
};

// GET: Se consulta un reto en especifico
function getChallengeById(req, res){
    console.log('GET: Consultando un reto en especifico ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('SELECT * FROM challenge WHERE challenge.id_challenge = ?', 
                                 [req.params.id_challenge], function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito retorno los registros de la entidad
			res.status(200).json({ "challenge" : rows });;	// OK
		}
	});
}

// DELETE: Se elimina un reto creado
function deleteChallenge(req, res){
    console.log('DELETE: Eliminando la informacion de un Reto ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");
 
    // Realizo la consulta
    var query = connection.query('DELETE FROM challenge WHERE id_challenge = ?', 
    								[req.params.id_challenge], function(err, rows){
        
        // Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito y retorno los registros de la entidad
			res.status(200).json({ "challenge" : rows });	// OK
		}
    });
}

// PUT: Se actualiza la informacion de un reto
function updateChallenge(req, res){
    console.log('PUT: Actualizando la informacion de un Reto ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");
 
    // Realizo la consulta
    var query = connection.query('UPDATE challenge SET name_challenge = ?, descrip_challenge = ?, eviden_challenge = ?, point_challenge = ?, due_challenge = ?  WHERE id_challenge = ?', 
    								[req.body.challenge.name_challenge, req.body.challenge.descrip_challenge, req.body.challenge.eviden_challenge , req.body.challenge.point_challenge, req.body.challenge.due_challenge, req.params.id_challenge], function(err, rows) {
        
        // Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito y retorno los registros de la entidad
			res.status(200).json({ "challenge" : rows });	// OK
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