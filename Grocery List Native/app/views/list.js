var config = require("../shared/models/config");
var el = require("../shared/models/el");
var httpModule = require("http");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");

var groceries = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

exports.load = function(args) {
	page = args.object;
    pageData.set("grocery", "");
    pageData.set("groceries", groceries);
	page.bindingContext = pageData;

    // Empty the array for subsequent visits to the page
	while (groceries.length) {
		groceries.pop();
	}
    
    loadGroceries();
};

function loadGroceries() {
    el.data("Groceries").get().then(function(data) {
        data.result.forEach(function(grocery) {
            groceries.push({ name: grocery.Name });
        });
    });
}

function addGrocery(grocery) {
    el.data("Groceries").create({
        Name: grocery
    }).then( function(result) {
        groceries.push({ name: grocery });
    });
}

exports.add = function() {
	viewModule.getViewById( page, "grocery" ).dismissSoftInput();
	addGrocery( pageData.get( "grocery" ) );
	pageData.set( "grocery", "" );
};
