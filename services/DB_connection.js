//////////////////////////////////////////////////////////////////////
//																	//
// Conexion a la base de datos         	    						//
// --------------------------------------------------				//
//																	//
// @author  Juan Jose Muñoz <disk737@hotmail.com>           		//
// @version 1.0.0													//
//																	//
//////////////////////////////////////////////////////////////////////

// Importo los modulos necesarios
const mysql = require('mysql');

// Importo el archivo de configuracion
const config = require('../config');

//////////////////////////////////////////////////////////////////
/* Código a ejecutar al iniciar la conexión a la base de datos */
const connection = mysql.createConnection(config.db);

connection.connect(function(error){
    if(error){
      	console.log("Error conectandose a la base de datos");
        throw error;
    }else{
        console.log('Conexion correcta.');
    }
});
//////////////////////////////////////////////////////////////////

module.exports = connection;