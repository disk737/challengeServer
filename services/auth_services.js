//////////////////////////////////////////////////////////////////////
//																	//
// Servicio de autentificacion de usuarios	 						//
// --------------------------------------------------				//
//	                                                                //
// Descripcion: Esto debe funcionar como un Middleware              //
//															    	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		//
// @version 1.0.0													//
//																	//
//////////////////////////////////////////////////////////////////////


var services = require('./jwt_services'); 


function isAuth(req, res, next){

	// Reviso si dentro del encabezado viene el campo de autorizacion
	if (!req.headers.authorization) {
		return res.status(403).json({"message" : "No tienes autorizacion pelmazo."});
	}

	// Capturo el Token. El token viene con formato => Beader "Token", por eso hay que hacerle split
	var token = req.headers.authorization.split(" ")[1];

	console.log("Punto de Control Lin 27");

	services.decodeToken(token)
	// Como es una promesa, se debe incluir
	.then(response => {
		req.user = response; // Ingreso el numero UUID del Payload dentro de req
		next(); // Esto lo hago para darle paso al siguiente middleware
		
	}) // Es una funcion que se ejecuta si se ha resuelto correctamente
	.catch(response =>{
		res.status(response.status)
	}) // Se ejecuta si ha ocurrido algun error

}

// Exportamos el modulo
module.exports = isAuth;