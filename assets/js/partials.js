/**
 * Client-side scripts that support view partials
 *
 *
 */

$(document).ready(function() {

    // idiotpanel partial
    $('#idiotpanel').each(function( index ) {
        
       // var domId = $this.id;
        
        window.setTimeout( function() {
            $.getJSON( 'status/idiotPanel', function(data, textStatus, jqXHR) {
                var leds = [];
                
                if( data.key )
                    leds.push({ label: 'Key', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Key', color: 'green', state: 'off'});
                
                if( data.brake )
                    leds.push({ label: 'Brake', color: 'red', state: 'blink'});
                else
                    leds.push({ label: 'Brake', color: 'red', state: 'off'});
 
                if( data.fault )
                    leds.push({ label: 'Fault', color: 'red', state: 'blink'});
                else
                    leds.push({ label: 'Fault', color: 'red', state: 'off'});
                
                if( data.quickstop )
                    leds.push({ label: 'Quickstop', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Quickstop', color: 'green', state: 'off'});

                if( data.other )
                    leds.push({ label: 'Other', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Other', color: 'green', state: 'off'});

                $('#idiotpanel').html( ledGroup(leds )); 

                
            })
            .fail(function() {
                console.log( "error" );
              })

        }, 1000);
    });
    
    
    
});



/**
 * view/partials/outputpanel.ejs client side script to show and refresh the gauges
 */
FusionCharts.ready(function () {
    
    $('#output-pwm').each( function() {
        // retrieve variables stored with the HTML element
        var id = $(this).attr('id');
        //var data = $(this).data();
        var data = {};
        data.colorRange = {
            "color": [
               {
                  "minValue": "0",
                  "maxValue": "45",
                  "code": "#e44a00"
               },
               {
                  "minValue": "45",
                  "maxValue": "75",
                  "code": "#f8bd19"
               },
               {
                  "minValue": "75",
                  "maxValue": "100",
                  "code": "#6baa01"
               }
            ]
         };
        
        data.chart= {
            "caption": "PWM",
            "lowerLimit": "0",
            "upperLimit": "100",
            "numberSuffix": "%",
            "valueFontSize": "12",
            "ledSize": "2",
            "ledGap": "1",
            "manageResize": "1",
            "theme": "cs",
         };
  
    var pwmGauge = new FusionCharts({
        "type": "vled",
        "renderAt": "output-pwm",
        "width": "100%",
        "height": "100%",
        "dataFormat": "json",
        "dataSource": {
            "chart" : data.chart,
            "colorRange": data.colorRange,
            "value": "47.68"
        }
    });

    pwmGauge.render();

    });
    
    
   // $('#output-volts').each( function() {

    
    var v_green_start = 0;
    var v_green_end = 80;
    var v_red_start = 90;
    var v_red_end = 100;
    var v_yellow_start = 80;
    var v_yellow_end = 90;
    
    var colorRange = {
            "color": [
               {
                  "minValue": "0",
                  "maxValue": "45",
                  "code": "#e44a00"
               },
               {
                  "minValue": "45",
                  "maxValue": "75",
                  "code": "#f8bd19"
               },
               {
                  "minValue": "75",
                  "maxValue": "100",
                  "code": "#6baa01"
               }
            ]
         };
        
    var mydata2 = {

       "chart": {
       "caption": "Current",
    //   "subcaption": "",
       "lowerLimit": "0",
       "upperLimit": "100",
       "numberSuffix": "%",
       "valueFontSize": "12",
       "valueFontBold": "0",
     //  "chartBottomMargin": "40",
       "theme": "cs"
    },

    "colorRange": colorRange,
    "value": "47.68"


    };

 

    var VertLED = new FusionCharts({
        "type": "vled",
        "renderAt": "output-volts",
        "width": "100%",
        "height": "100%",
        "dataFormat": "json",
        "dataSource": mydata2
      });

    VertLED.render();
 //   });

    var outputCurrentGauge = new FusionCharts({
        "type": "vled",
        "renderAt": "output-current",
        "width": "100%",
        "height": "100%",
        "dataFormat": "json",
        "dataSource": mydata2
      });

    outputCurrentGauge.render();

});

