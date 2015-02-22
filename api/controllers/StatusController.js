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
            
            res.view('status', {
                title: 'Status',
                data: {},
            });
        },
        
        
        idiotpanel: function (req, res) {
            var status = {
                    key: true,
                    brake: true,
                    fault: true,
                    quickstop: true,
                    
            };
            return res.json( status );
          },
          
};

