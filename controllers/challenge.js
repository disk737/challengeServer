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
const connection = require('./DB_Conection');

//////////////////////////////////////////////////////////////////
//       Definicion de las funciones                            //
//////////////////////////////////////////////////////////////////

// Se consultan todos los retos 
function getChallenge(req, res){
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

};

// Se crea un nuevo reto
function setChallenge(req, res){
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
};

// Se consulta un reto en especifico
function getChallengeById(req, res){
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
			// En caso de éxito retorno los registros de la entidad
			res.status(200).json({ "Challenge" : rows });;	// OK
		}
	});
}

// Se elimina un reto creado
function deleteChallenge(req, res){
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
			res.status(500).json({ "error" : err });	// Server Error
		}
		else 
		{
			// En caso de éxito y retorno los registros de la entidad
			res.status(200).json({ "Challenge" : rows });	// OK
		}
    });
}

// Se actualiza la informacion de un reto
function updateChallenge(req, res){
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