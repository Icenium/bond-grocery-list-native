var observableModule = require( "data/observable" ),
	data = new observableModule.Observable();

// Hardcode a user account for ease of testing
// data.set( "username", "tjvantoll" );
// data.set( "password", "password" );
// data.set( "email_address", "tj.vantoll@gmail.com" );

module.exports = data;