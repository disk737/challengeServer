//////////////////////////////////////////////////////////////////////
//																	//
// UUID services     				 		 						//
// --------------------------------------------------				//
//																	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		//
// @version 1.0.0													//
//																	//
//////////////////////////////////////////////////////////////////////

// Importo los módulos requeridos por el servicio
const uuidv4 = require('uuid/v4');

// Funcion que me genera un UUID
function generateUUIDv4(){
    return uuidv4();    
}

module.exports = generateUUIDv4;