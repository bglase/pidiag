/**
 * ImuController
 *
 * Server-side interface for the Inertial Measurement unit.
 * 
 */

// File system interface
var fs = require('fs');

// module for managing 
var childProcess = require('child_process');

// The path to where sensor data files are stored
var fileHome = './';

// stores an instance of a running child process
var imu;

// Keep track of the latest
var latestImuUpdate = {
    quaternion: [ 1,0,0,0 ],
    acceleration: [0,0,1],
}
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


    startImu: function( req, res ) {

        // keep track of whether callback has been invoked to prevent multiple invocations
        var invoked = false;

        //imu = childProcess.spawn( './mock.py');
        imu = childProcess.spawn( '/usr/bin/minimu9-ahrs', ['-b', '/dev/i2c-1', '--output', 'quaternion']);

        // listen for errors as they may prevent the exit event from firing
        imu.on('error', function (err) {
            if (invoked) return;
            invoked = true;
            console.error( ' spawned program error: ' + err);
            //res.badRequest( err );//callback(err);
        });

        // execute the callback once the process has finished running
        imu.on('close', function (code) {
        //    if (invoked) return;
        //    invoked = true;
            //var err = code === 0 ? null : new Error('exit code ' + code);
            //callback(err);
            console.info( code);
        });

	res.send( 'Started minimu9');

        // Process data output from stdout in the child process
        imu.stdout.on('data', function(chunk) {
                var str = new Buffer(chunk).toString().trim().replace(/\s{2,}/g, ' ').split(' ');
                if( 10 != str.length)
                    console.error( 'got ' + str.length );
                else {
                    latestImuUpdate = {
                        quaternion: [ str[0], str[1], str[2], str[3] ],
                        acceleration: [str[4], str[5], str[6] ],

                    };
                    console.info( latestImuUpdate.quaternion );
                }
        });

        // Process data output from stdout in the child process
        imu.stderr.on('data', function(chunk) {
                var str = new Buffer(chunk).toString();
                
                    console.error( str );
                
        });
    },

    startImuFile: function( req, res ) {

        var file = req.param('file') || '';
        var interval = req.param('interval') || 1000;

        var fs = require( 'fs');

        fs.readFile( file, 'utf8', function(err, data) {
            if (err) res.notFound();
            else
            {
                
                var lines = data.split('\n');
                res.send( 'Using ' + file + ' which has ' + lines.length + '. Interval: ' + interval + ' ms' );
                var i = 0;
                setInterval( function() {
                    lines[i] = lines[i].trim().replace(/\s{2,}/g, ' ');
                    var str = lines[i].split(' ');
                    if( 10 != str.length)
                        console.error( 'got ' + str.length );
                    else {
                        latestImuUpdate = {
                            quaternion: [ str[0], str[1], str[2], str[3] ],
                            acceleration: [str[4], str[5], str[6] ],

                        };
                        console.info( latestImuUpdate.quaternion );
                    }

                    // increment the line and wrap at the end
                    i++;
                    if( ++i == lines.length)
                        i = 0;

                }, interval);
            }
        });
    },

    stopImu: function( req, res ) {

        if( imu ) {
            try {
                imu.kill;
            }
            catch(e) {

            }
            
            imu = null;
        }

        
    },

    // Retrieve the latest IMU reading
    currentImu: function( req, res) {
        return res.json( latestImuUpdate );
    },

    subscribeTo: function(req, res) {
        var name = req.param('name');
        sails.sockets.join(req.socket, name);
        
        res.json({
            message: 'Subscribed to '+name+'!'
        });
    }
      
          
};

