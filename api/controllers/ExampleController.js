/**
 * ExampleController
 *
 * @description an interface for serving up example code; eg views in views/example/
 *
 * @example /example/three
 * 
 */


 
module.exports = {

    three: function (req, res) {
        res.view('example/three');
    },

};

