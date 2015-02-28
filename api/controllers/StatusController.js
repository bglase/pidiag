/**
 * StatusController
 *
 * @description :: Server-side logic for managing statuses
 */


 
module.exports = {

        
        /**
         * Default (index) page handler
         */
        index: function (req, res) {
            
            var fs = require('fs');

            fs.readdir('/home/pi', function(err, files) {
                if( err ) {
                    console.log( err);
                }
                else {
                    files = files.filter(function(item){
                        return /.csv$/.test(item);
                    });
                    res.view('menu', {
                        title: 'IMU Menu',
                        data: files,
                    });
                }
            });
            
        },
     
};

