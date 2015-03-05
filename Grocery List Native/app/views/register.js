var dialogs = require( "ui/dialogs" ),
	frameModule = require( "ui/frame" ),
	viewModule = require( "ui/core/view" ),
	pageData = require( "../shared/models/userCredentials" ),
	el = require( "../shared/models/el" ),
	images = require( "../shared/utils/images" );

exports.load = function( args ) {
	var page = args.object,
		email = viewModule.getViewById( page, "email" ),
		username = viewModule.getViewById( page, "username" );

	pageData.set( "email_address", "" );
	pageData.set( "username", "" );
	pageData.set( "password", "" );
	pageData.set( "logoSource", images.logo );
	page.bindingContext = pageData;

	// Turn off autocorrect and autocapitalization for iOS
	if ( username.ios ) {
		email.ios.autocapitalizationType =
			UITextAutocapitalizationType.UITextAutocapitalizationTypeNone;
		email.ios.autocorrectionType =
			UITextAutocorrectionType.UITextAutocorrectionTypeNo;
		username.ios.autocapitalizationType =
			UITextAutocapitalizationType.UITextAutocapitalizationTypeNone;
		username.ios.autocorrectionType =
			UITextAutocorrectionType.UITextAutocorrectionTypeNo;
	}
};
exports.register = function() {
	el.Users.register(
		pageData.get( "username" ),
		pageData.get( "password" ),
		{ Email: pageData.get( "email_address" ) },
		function( response ) {
			dialogs
				.alert( "Your account was successfully created." )
				.then(function() {
					frameModule.topmost().navigate( "app/views/login" );
				});
		},
		function( error ) {
			dialogs.alert({
				message: "Unfortunately we were unable to create your account.",
				okButtonText: "OK"
			});
		}
	);
};