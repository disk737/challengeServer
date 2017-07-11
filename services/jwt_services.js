//////////////////////////////////////////////////////////////////////
//																	//
// JWT services     				 		 						//
// --------------------------------------------------				//
//																	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		//
// @version 1.0.0													//
//																	//
//////////////////////////////////////////////////////////////////////

// Importo los módulos requeridos por la aplicación
const jwt = require('jsonwebtoken');
const moment = require('moment'); // Libreria para el manejo de fechas
const config = require('../config');

// Creo la funcion para generar el token
function generateToken(user){
    
    // Construyo el payLoad
    var payLoad = {
		sub: user.UUID, // este es el UUID de la base de datos
		iat: moment().unix(),    	// Cuando fue creado el Token
		exp: moment().add(7, 'days').unix()		// Cuando expira el Token
        //exp: moment().add(1).unix()		// Cuando expira el Token
	};

    // Retorno el token creado
    return jwt.sign(payLoad, config.SECRET_TOKEN);
}

// Funcion para verificar y decodificar un Token
function decodeToken (token){

    // Defino una promesa, creo que esto es para que se haga de manera asincrona al llamar la funcion.
	const decode = new Promise((resolve, reject) => {

		try{
			// Hago una decodificacion
			var payLoad = jwt.verify(token, config.SECRET_TOKEN);

			console.log("Punto de Control Lin 41");

			// Verifico si el Token no ha caducado
			if (payLoad.exp <= moment().unix()) {

				reject({
					status: 401,
					message: 'El token ha expirado'
				})
			} 

			// Si llego hasta aqui significa que el token es valido
			resolve(payLoad.sub)

		} catch(err){
			reject({
				status: 500,
				message: 'Invalid Token'
			})
		}
	})

	// Devuelvo la promesa creada
	return decode;
}


module.exports = {
    generateToken,
    decodeToken
    };
