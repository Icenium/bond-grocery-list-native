var el = require( "../shared/models/el" ),
	observableModule = require( "data/observable" ),
	observableArray = require( "data/observable-array" ),
	viewModule = require( "ui/core/view" ),
	groceries = new observableArray.ObservableArray([]),
	pageData = new observableModule.Observable(),
	page;

function loadGroceries() {
	el.data( "Groceries" ).get().then(function( data ) {
		data.result.forEach(function( grocery ) {
			groceries.push({ name: grocery.Name });
		});
	});
};

function addGrocery( grocery ) {
	el.data( "Groceries" ).create({
		Name: grocery
	}).then( function( result ) {
		groceries.push({ name: grocery });
	});
};

exports.load = function( args ) {
	page = args.object;
	if ( page.ios ) {
		page.ios.title = "Grocery List";
	}

	pageData.set( "grocery", "" );
	pageData.set( "groceries", groceries );
	page.bindingContext = pageData;

	while ( groceries.length ) {
		groceries.pop();
	}
	loadGroceries();
};

exports.add = function() {
	viewModule.getViewById( page, "grocery" ).dismissSoftInput();
	addGrocery( pageData.get( "grocery" ) );
	pageData.set( "grocery", "" );
};
