/**
 * Client-side javascript to show colored LED indicators
 */


              /*
               * A single light variable should be an array with at least 2 elements, preferably 3:
               * 
               * var sampleLight = new array('light label', 'yellow', 'blink');
               * panelLEDSingle(sampleLight);
               * 
               * 1) label is the label the light should have.  It will be converted into a CSS class as well.
               * 2) 'color' should be a string: 'red', 'yellow', or 'green.'  Anything else defaults to green.
               * 3) OPTIONAL.  'off', 'on', or 'blink'.  Anything else defaults to OFF.  Omitting it defaults
               *      to OFF. All three colors can blink.
               *  
               *  The second variable is the width of the individual light's cell.
               */
function led (light, lightWidth) {
    console.log( light.label);
                  var LEDClass =  'panel-led-individual ';
                  var LED = new String();
                  if (typeof(lightWidth) == 'undefined') {
                      lightWidth = 'auto';
                  } 
                  if (typeof(light) == 'string') {
                      LED = "<div class='" + LEDClass + "' style='width:" + lightWidth +  ";'><div class='inner'><div class='panel-led-led'></div><span class='panel-led-label-text'>" + light + "</span></div></div>"; 
                  } else {
                      LEDClass += 'panel-led-color-' + light.color + ' ';
                      if ( light.state) 
                          LEDClass += 'panel-led-power-' + light.state + ' ';
                      LED = "<div class='" + LEDClass + "' style='width:" + lightWidth +  ";'><div class='inner'><div class='panel-led-led'></div><span class='panel-led-label-text'>" + light.label + "</span></div></div>";
                  }
                  return LED;
              }
            
/*
 * An LED Group should be a set of single lights (as described below).  Maximum of 9 supported,
 * which is a number that probably won't fit into the page properly.
 * 
 * var sampleLight1 = new array('Some indicator', 'green', 'off');
 * var sampleLight2 = new array('Another light', 'yellow', 'on');
 * var sampleLight3 = new array('Blinkenlight', 'red', 'blink');
 * PanelLEDGroup(sampleLight1, sampleLight2, sampleLight3);
 */
 function ledGroup (lights) {
     
    var wrapperClasses = "panel-led-group ";
    var out = new String();
    var LEDGroup = new String();
    
    var lightCount = lights.length;
    console.log(lights.length);
    
    var lightWidth = '';
    if (lightCount < 2) {
        wrapperClasses += "panel-led-quantity-single ";
        lightWidth = 'auto';
    } else {
        var temp = parseFloat(100/lightCount);      
        lightWidth = (temp.toFixed(2)).toString() + "%";
    }
    for (var i= 0; i< lightCount; i++)
        out += led(lights[i], lightWidth);
    LEDGroup = "<div class='" + wrapperClasses + "'>" + out + "</div>";
    LEDArray = new Array(LEDGroup, wrapperClasses);
    return '<div class="' + wrapperClasses + '">' + LEDGroup + '<div>';
};



