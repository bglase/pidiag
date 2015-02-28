/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 */

var fileHome = '/home/pi/';
 
module.exports = {

        
        /**
         * Default (index) page handler
         */
        index: function (req, res) {
            
            var fs = require('fs');
            
            if( !req.param('file'))
                res.notFound();
            else if( !fs.existsSync(fileHome + req.param('file')))  {
                res.notFound();
            }
            else {
                
                res.view('imu1', {
                    title: 'IMU',
                    data: {file: req.param('file'),
                        labels: ['index', 'magX', 'magY', 'magZ', 'aX', 'aY', 'aZ', 'gX', 'gY', 'gZ' ]},
                });
            }
        },

        /**
         * used by the graph library to get a csv file
         */
        get: function (req, res) {
            
            var fs = require('fs');
            
            if( !req.param('file'))
                res.notFound();
            else if( !fs.existsSync(fileHome + req.param('file')))  {
                res.notFound();
            }
            else {
              
                res.download( fileHome + req.param('file'));
                
            }
        },

          
};

