$( window ).on( "orientationchange", function( event ) {
	$( "#orientation" ).text( "This device is in " + event.orientation + " mode!" );
});
