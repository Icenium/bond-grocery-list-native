var dialogs = require( "ui/dialogs" ),
	frameModule = require( "ui/frame" ),
	viewModule = require( "ui/core/view" ),
	pageData = require( "../shared/models/userCredentials" ),
	el = require( "../shared/models/el" ),
	images = require( "../shared/utils/images" );

exports.load = function( args ) {
	var page = args.object,
		username = viewModule.getViewById( page, "username" );

	pageData.set( "logoSource", images.logo );
	page.bindingContext = pageData;

	// Turn off autocorrect and autocapitalization for iOS
	if ( username.ios ) {
		username.ios.autocapitalizationType =
			UITextAutocapitalizationType.UITextAutocapitalizationTypeNone;
		username.ios.autocorrectionType =
			UITextAutocorrectionType.UITextAutocorrectionTypeNo;
	}
};

exports.signIn = function( args ) {
	el.Users.login(
		pageData.get( "username" ),
		pageData.get( "password" ),
		function() {
			frameModule.topmost().navigate( "app/views/list" );
		},
		function() {
			dialogs.alert({
				message: "Unfortunately we could not find your account.",
				okButtonText: "OK"
			});
		}
	);
};

exports.register = function( args ) {
	var topmost = frameModule.topmost();
	topmost.navigate( "app/views/register" );
};
