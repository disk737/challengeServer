//////////////////////////////////////////////////////////////////////
//												                   	//
// Modelo de user       			 		 	                    //
// --------------------------------------------------	        	//
//													               	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>         		    //
// @version 1.0.0									               	//
//													           		//
//////////////////////////////////////////////////////////////////////

// importo los modulos que requiero
const moment = require('moment');

function user(id_user, email, password, UUID){
    this.email = email,
    this.password = password,
    this.signupDate = moment().format(), // Esto esta por validar...  a lo mejor no lo necesito
    this.lastLogin = moment().format(), // Esto esta por validar...  a lo mejor no lo necesito
    this.UUID = UUID
}

module.exports = user;