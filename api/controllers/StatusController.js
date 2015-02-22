/**
 * StatusController
 *
 * @description :: Server-side logic for managing statuses
 */


 /**
 * Prints a set of controller items to the console
 * 
 * @param error
 * @param data
 */
function outputItems( error, data ) {
    if( error ) {
        console.error( error.toString );
    }
    else {
        if( data.complete ) {
            for( var i = 0; i < data.items.length; i++ ) {
               console.log( data.items[i].name + ': ' + data.items[i].value + ' ' + data.items[i].units);
            }
        }
        else {
            console.log('progress: ' + data.progress );
        }
    }
};


module.exports = {

        
        /**
         * Default (index) page handler
         */
        index: function (req, res) {
            
            res.view('status', {
                title: 'Status',
                data: {},
            });
        },
        

        statuspanel: function (req, res) {

            var stuffToRead = [
                PortManager.map.throttleValue,
                PortManager.map.pwm,
                PortManager.map.speed,
                ];
            

            PortManager.readRam(  stuffToRead, function( error, data ) {
                outputItems( error, data );
                 return res.json( data );
            } );


           
          
        },
        

                pwm: function (req, res) {

            

            PortManager.readRam(  PortManager.map.pwm, function( error, data ) {
                outputItems( error, data );
                 return res.send( '&value=' + data.items[0].value );
            } );


           
          
        },

        idiotpanel: function (req, res) {

 

            var status = {
                    key: true,
                    brake: true,
                    fault: true,
                    quickstop: true,
                    forward: true,
                    reverse: false,
                    indoor: true,
                    outdoor: false
                    
            };
            return res.json( status );
          },
          
};

