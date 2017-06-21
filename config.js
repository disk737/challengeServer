

module.exports = {
	
	port : process.env.PORT || 8080,
	db : process.env.JAWSDB_URL || {
   		host: 'localhost',
   		user: 'root',
		password: 'root',
		database: 'db_challenge_app',
		port: 3306
		},
	SECRET_TOKEN: 'miclavedetokens' 	// Se supone que sea mas complicada, puede ser un codigo generado

}