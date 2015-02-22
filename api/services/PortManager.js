/**
 * Wraps the serial port interface manager
 * 
 */

// Declare the serial port interface
var portManager = require('cs-controller');

// Attempt to open the serial port
var thePort = portManager.addPort( "/dev/cu.SLAB_USBtoUART", {baudrate: 115200} );

thePort.open( function( error ) {
    if( !error )
        console.log( 'Port Opened: ' );
    else {
        console.log( error );
        return EXIT_FAILURE;
    }
        
});



// Makes PortManager object globally accessible within the sails application
module.exports = thePort;

