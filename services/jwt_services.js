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
		exp: moment().add(config.expireDays, 'days').unix()		// Cuando expira el Token
        //exp: moment().add(1).unix()		// Cuando expira el Token
	};

    // Retorno el token creado
    return jwt.sign(payLoad, config.SECRET_TOKEN);
}

// Funcion para verificar y decodificar un Token
function decodeToken (token){

    // Defino una promesa, creo que esto es para que se haga de manera asincrona al llamar la funcion.
	const decode = new Promise((resolve, reject) => {

		jwt.verify(token, config.SECRET_TOKEN, function(err, payLoad) {

			// Reviso si encuentro un error (Como de expiracion)
			if (err) {
				reject({
					status: 401,
					message: err.message
				});
			}else{
				resolve(payLoad.sub)
			}

		});	

	});

	// Devuelvo la promesa creada
	return decode;
}


module.exports = {
    generateToken,
    decodeToken
    };
