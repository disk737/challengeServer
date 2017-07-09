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

module.exports = {generateToken};

// try {
//     var decoded = jwt.verify(token, config.SECRET_TOKEN);
//     //var decoded = jwt.verify(token, 'pedro');

// } catch (error) {
//     console.log(error.message);
// }

// console.log(decoded);