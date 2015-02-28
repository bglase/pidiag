/**
 * ImuController
 *
 * Server-side interface for the Inertial Measurement unit.
 * 
 */

// File system interface
var fs = require('fs');

// The path to where sensor data files are stored
var fileHome = './';

// These are the public interfaces that we expose 
module.exports = {

    /**
     * Default (index) page handler.  Serves up a page showing the realtime dashboard
     */
    index: function (req, res) {
        
    },


    /**
     * Serves a page that shows the available sensor files
     */
    fileList: function (req, res) {

        // Read the list of CSV files from the system        
        var fs = require('fs');

        fs.readdir(fileHome, function(err, files) {
            if( err ) {
                files = [];
            }
            else {
                files = files.filter(function(item){
                    return /.csv$/.test(item);
                });
            }
            res.view('fileList', {
                title: 'Sensor Files',
                data: files,
            });
        });
        
    },
     

    /**
     * Handles requests for a page that shows graphs of a sensor data file
     */
    sensorFile: function (req, res) {
        
        var fs = require('fs');
        
        if( !req.param('file'))
            res.notFound();
        else if( !fs.existsSync(fileHome + req.param('file')))  {
            res.notFound();
        }
        else {
            
            res.view('sensorFile', {
                title: 'Sensor Data',
                data: {file: req.param('file'),
                    labels: ['index', 'magX', 'magY', 'magZ', 'aX', 'aY', 'aZ', 'gX', 'gY', 'gZ' ]},
            });
        }
    },


    /**
     * used by the graph library to get a csv file
     */
    getSensorFile: function (req, res) {
        
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


    subscribeTo: function(req, res) {
        var name = req.param('name');
        sails.sockets.join(req.socket, name);
        
        res.json({
            message: 'Subscribed to '+name+'!'
        });
    }
      
          
};

