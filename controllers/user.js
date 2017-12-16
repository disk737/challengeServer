//////////////////////////////////////////////////////////////////////
//																	//
// Controlador de las rutas de User			 						//
// --------------------------------------------------				//
//																	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		//
// @version 1.0.0													//
//																	//
//////////////////////////////////////////////////////////////////////

// Importo los modulos necesarios
const connection = require('../services/DB_connection');
const config = require('../config');
const jwt_services = require('../services/jwt_services');
const uuidv4 = require('../services/uuid_services');
const User = require('../models/user');
const bcrypt = require('bcrypt');

//////////////////////////////////////////////////////////////////
//       Definicion de las funciones                            //
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Metodos del Users           							 		//
//////////////////////////////////////////////////////////////////

// POST: Se crea un nuevo usuario y se le asigna un Token
function signUp(req, res){
    console.log('POST: Creando un nuevo usuario...');

	// Puedo tomar un modelo y crearlo desde req.body y crear un constructor
	var user = new User(null, 
						req.body.UserEmail, 
						req.body.UserPassword, 
						uuidv4());

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Se comprueba que el usuario no exista en la base de datos	
	var checkUser = connection.query('SELECT UserID FROM user WHERE user.UserEmail = ?',
								  [req.body.UserEmail], function(err, rows){

		// Verificar si sucedió un error durante la consulta							
		if (err) {
			console.error(err);
			res.status(500).json({ "Error consultando user." : err });	// Server Error	
		}else{

			// Reviso si el usuario ya existe dentro de la base de datos
			if (rows.length > 0) {
				console.error('El usuario ya esta registrado.');
				res.status(404).json({"message": 'El usuario ya esta registrado.'});
			
			}else{

				// Debo encriptar la contraseña
				bcrypt.hash(user.password, config.saltRounds, function(err, hash) {
					
					// Verifico si hubo algun error en la encriptacion
					if (err){
						console.error({"Error encriptando" : err});
						res.status(500).json({ "error" : err });	// Server Error	
					}else{
						// Guardo la contraseña encriptada 
						// Si el usuario no esta en la base de datos, lo ingreso dentro de la BD
						var query = connection.query('INSERT INTO user(UserEmail, UserPassword, UserSignupDate, UserLastLogin, UserUUID) VALUES(?, ?, ?, ?, ?)', 
								  [user.email, hash, user.signupDate , user.lastLogin, user.UUID], function(err, rows) {

							// Verificar si sucedió un error durante la consulta
							if (err)
							{
								console.error(err);
								res.status(500).json({ "error" : err });	// Server Error		
							}
							else 
							{
								// En caso de éxito retorno los resultados de la entidad
								res.status(200).json({ "token" : jwt_services.generateToken(user)} ); // ok
							}
						});
					}  
				});
			}
		}
	});
};

// POST: Se le da un nuevo token a un usuario que esta registrado
function signIn(req, res){
	console.log('POST: Validando un usuario dentro del sistema...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	// var query = connection.query('SELECT id_user, uuid_user FROM user WHERE user.email_user = ? AND user.password_user = ?',
	// 							  [req.body.email_user, req.body.password_user], function(err, rows) {
	var query = connection.query('SELECT id_user, password_user, uuid_user FROM user WHERE user.email_user = ?',
	 							  [req.body.email_user], function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "Error consultando user y pass" : err });	// Server Error		
		}
		else 
		{

			// Reviso si el usuario y la contraseña fueron validos
			if (rows.length == 0) {
				console.error('El usuario y/o la contraseña no corresponden.');
				res.status(404).json({"message": 'El usuario y/o la contraseña no corresponden.'});
			
			}else{
				
				// Creo un objeto para guardar el resultado de la consulta
				var user = new User(rows[0].id_user, 
									req.body.email_user,
									rows[0].password_user,
									rows[0].uuid_user);

				// Debo traer el hash de la contraseña y compararlo con la funcion
				bcrypt.compare(req.body.password_user, user.password, function(err, compare) {

					// Reviso si hubo algun error
					if (err){
						console.error({"Error en la comparacion hash:" : err});
						return res.status(500).json({ "Error en la comapracion con el hash." : err });	// Server Error
					}

					// Reviso el resultado de la comparacion
					if(!compare){
						// La contraseña no corresponde
						console.error('El usuario y/o la contraseña no corresponden.');
						res.status(404).json({"message": 'El usuario y/o la contraseña no corresponden.'});
					}else{

						// Debo actualizar la fecha de ingreso en la base de datos
						var updateLogin = connection.query('UPDATE user SET lastLogin_user = ? WHERE id_user = ?',
													[user.lastLogin, user.id_user], function(err, rows){
					
							// Verifico si sucedio un error durante la consulta
							if (err) {
								console.error(err);
								res.status(500).json({ "Error actualizando la fecha de login." : err });	// Server Error
							}else{

								// Puedo traer un usuario completo o solo el UUID
								res.status(200).json({ "token" : jwt_services.generateToken(user)} ); // ok
							}
						});
					}
	    		});
			}
		}
	});
}


//////////////////////////////////////////////////////////////////
// Metodos del Admin           								  	//
//////////////////////////////////////////////////////////////////

// GET: Se consultan todos los usuarios.
function getUsers(req, res){
    console.log('GET: Consultando todos los usuarios ...');

	// Establecer el tipo MIME de la respuesta
	res.setHeader("Content-Type", "application/json");

	// Consultar las entidades a la base de datos
	var query = connection.query('SELECT * FROM user', 
                                 function(err, rows) {

		// Verificar si sucedió un error durante la consulta
		if (err)
		{
			console.error(err);
			res.status(500).json({ "error" : err });;	// Server Error
		}
		else 
		{
			// En caso de éxito retorno los registro de la entidad (user)
			res.status(200).json({ "user" : rows });	// OK
		}
	});

};

module.exports = {
    signUp,
	signIn,
	getUsers
}



// // Se consulta un reto en especifico
// function getChallengeById(req, res){
//     console.log('Consultando un reto en especifico ...');

// 	// Establecer el tipo MIME de la respuesta
// 	res.setHeader("Content-Type", "application/json");

// 	// Consultar las entidades a la base de datos
// 	var query = connection.query('SELECT * FROM challenge WHERE challenge.id_challenge = ?', 
//                                  [req.params.id_challenge], function(err, rows) {

// 		// Verificar si sucedió un error durante la consulta
// 		if (err)
// 		{
// 			console.error(err);
// 			res.status(500);	// Server Error
// 			res.json({ "error" : err });
// 		}
// 		else 
// 		{
// 			// En caso de éxito retorno los registros de la entidad
// 			res.status(200).json({ "Challenge" : rows });;	// OK
// 		}
// 	});
// }

// // Se elimina un reto creado
// function deleteChallenge(req, res){
//     console.log('Eliminando la informacion de un Reto ...');

// 	// Establecer el tipo MIME de la respuesta
// 	res.setHeader("Content-Type", "application/json");
 
//     // Realizo la consulta
//     var query = connection.query('DELETE FROM challenge WHERE id_challenge = ?', 
//     								[req.params.id_challenge], function(err, rows){
        
//         // Verificar si sucedió un error durante la consulta
// 		if (err)
// 		{
// 			console.error(err);
// 			res.status(500).json({ "error" : err });	// Server Error
// 		}
// 		else 
// 		{
// 			// En caso de éxito y retorno los registros de la entidad
// 			res.status(200).json({ "Challenge" : rows });	// OK
// 		}
//     });
// }

// // Se actualiza la informacion de un reto
// function updateChallenge(req, res){
//     console.log('Actualizando la informacion de un Reto ...');

// 	// Establecer el tipo MIME de la respuesta
// 	res.setHeader("Content-Type", "application/json");
 
//     // Realizo la consulta
//     var query = connection.query('UPDATE challenge SET name_challenge = ?, descrip_challenge = ?, eviden_challenge = ?, point_challenge = ?, due_challenge = ?  WHERE id_challenge = ?', 
//     								[req.body.challenge.name_challenge, req.body.challenge.descrip_challenge, req.body.challenge.eviden_challenge , req.body.challenge.point_challenge, req.body.challenge.due_challenge, req.params.id_challenge], function(err, rows) {
        
//         // Verificar si sucedió un error durante la consulta
// 		if (err)
// 		{
// 			console.error(err);
// 			res.status(500).json({ "error" : err });	// Server Error
// 		}
// 		else 
// 		{
// 			// En caso de éxito y retorno los registros de la entidad
// 			res.status(200).json({ "Challenge" : rows });	// OK
// 		}
//     });
// }

