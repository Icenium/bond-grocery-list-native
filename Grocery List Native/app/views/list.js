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
	page.bindingContext = pageData;

	while (groceries.length) {
		groceries.pop();
	}
};
