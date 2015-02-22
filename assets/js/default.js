
/*
$(document).ready(function() {
FusionCharts['debugger'].outputTo(function (message) {
    console.log(message);
});
FusionCharts['debugger'].enable(true);


FusionCharts.ready(function () {
    var linear = {
            "chart": {
                "theme": "carbon",
                "caption": "Server CPU Utilization",
                "subcaption": "food.hsm.com",
                "lowerLimit": "0",
                "upperLimit": "100",
                "numberSuffix": "%",
                "chartBottomMargin": "40",
                "valueFontSize": "11",
                "valueFontBold": "0"
             },
             "colorRange": {
                "color": [
                   {
                      "minValue": "0",
                      "maxValue": "35",
                      "label": "Low"
                   },
                   {
                      "minValue": "35",
                      "maxValue": "70",
                      "label": "Moderate"
                   },
                   {
                      "minValue": "70",
                      "maxValue": "100",
                      "label": "High"
                   }
                ]
             },
             "pointers": {
                "pointer": [
                   {
                      "value": "75"
                   }
                ]
             },
             "trendPoints": {
                "point": [
                   {
                      "startValue": "70",
                      "displayValue": " ",
                      "dashed": "1",
                      "showValues": "0"
                   },
                   {
                      "startValue": "85",
                      "displayValue": " ",
                      "dashed": "1",
                      "showValues": "0"
                   },
                   {
                      "startValue": "70",
                      "endValue": "85",
                      "displayValue": " ",
                      "alpha": "40"
                   }
                ]
             },
             "annotations": {
                "origw": "400",
                "origh": "190",
                "autoscale": "1",
                "groups": [
                   {
                      "id": "range",
                      "items": [
                         {
                            "id": "rangeBg",
                            "type": "rectangle",
                            "x": "$chartCenterX-115",
                            "y": "$chartEndY-35",
                            "tox": "$chartCenterX +115",
                            "toy": "$chartEndY-15",
                            "fillcolor": "#0075c2"
                         },
                         {
                            "id": "rangeText",
                            "type": "Text",
                            "fontSize": "11",
                            "fillcolor": "#ffffff",
                            "text": "Recommended Utilization Range : 70% - 85%",
                            "x": "$chartCenterX",
                            "y": "$chartEndY-25"
                         }
                      ]
                   }
                ]
             }
          };
    
    
    //--------------------------------------//--------------------------------------------
    
    var barchart = {
            "chart": {
                "caption": "Monthly revenue for last year",
                "subCaption": "Harry's SuperMart",
                "xAxisName": "Month",
                "yAxisName": "Revenues (In USD)",
                "numberPrefix": "$",
                "theme": "carbon"
             },
             "data": [
                {
                   "label": "Jan",
                   "value": "420000"
                },
                {
                   "label": "Feb",
                   "value": "810000"
                },
                {
                   "label": "Mar",
                   "value": "720000"
                },
                {
                   "label": "Apr",
                   "value": "550000"
                },
                {
                   "label": "May",
                   "value": "910000"
                },
                {
                   "label": "Jun",
                   "value": "510000"
                },
                {
                   "label": "Jul",
                   "value": "680000"
                },
                {
                   "label": "Aug",
                   "value": "620000"
                },
                {
                   "label": "Sep",
                   "value": "610000"
                },
                {
                   "label": "Oct",
                   "value": "490000"
                },
                {
                   "label": "Nov",
                   "value": "900000"
                },
                {
                   "label": "Dec",
                   "value": "730000"
                }
             ]
          };
    
    
    //--------------------------------------//--------------------------------------------

    var led = {
            "chart": {
                "caption": "Fuel Level Indicator",
                "lowerLimit": "0",
                "upperLimit": "100",
                "lowerLimitDisplay": "Empty",
                "upperLimitDisplay": "Full",
                "numberSuffix": "%",
                "valueFontSize": "12",
                "showhovereffect": "1",
                "origW": "400",
                "origH": "150",
                "ledSize": "3",
                "ledGap": "2",
                "manageResize": "1",
                "theme": "carbon"
             },
             "annotations": {
                "showbelow": "1",
                "groups": [
                   {
                      "id": "indicator",
                      "items": [
                         {
                            "id": "bgRectAngle",
                            "type": "rectangle",
                            "alpha": "90",
                            "radius": "1",
                            "fillColor": "#6baa01",
                            "x": "$gaugeCenterX - 20",
                            "tox": "$gaugeCenterX + 20",
                            "y": "$gaugeEndY + 25",
                            "toy": "$gaugeEndY + 45"
                         }
                      ]
                   }
                ]
             },
             "colorRange": {
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
             },
             "value": "92"
          };
    //--------------------------------------//--------------------------------------------
    
    var csatGauge = new FusionCharts({
        "type": "column2d",
        "renderAt": "chartContainer",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
        "dataSource": barchart
            
    });

 //   csatGauge.render();
    
    var gauge = new FusionCharts({
        "type": "HLinearGauge",
        "renderAt": "gaugeContainer",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
        "dataSource": linear
            
    });

  //  gauge.render();

    
    var speeddata = {
            "chart": {
               // "caption": "Fuel Level Indicator",
                "lowerLimit": "0",
                "upperLimit": "100",
                //"lowerLimitDisplay": "Empty",
                //"upperLimitDisplay": "Full",
                "numberSuffix": "%",
                "valueFontSize": "12",
              //  "showhovereffect": "1",
              //  "origW": "400",
              //  "origH": "150",
                "ledSize": "2",
                "ledGap": "1",
                "manageResize": "1",
                "theme": "cs",
                //    "bgAlpha" : "0",
             },
             "annotations": {
                "showbelow": "1",
                "groups": [
                   {
                      "id": "indicator",
                      "items": [
                         {
                            "id": "bgRectAngle",
                            "type": "rectangle",
                            "alpha": "90",
                            "radius": "1",
                            "fillColor": "#6baa01",
                            "x": "$gaugeCenterX - 20",
                            "tox": "$gaugeCenterX + 20",
                            "y": "$gaugeEndY + 25",
                            "toy": "$gaugeEndY + 45"
                         }
                      ]
                   }
                ]
             },
             "colorRange": {
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
             },
             "value": "92"
          };
  
    var led = new FusionCharts({
        "type": "hled",
        "renderAt": "speedgauge",
        "width": "100%",
        "height": "100%",
        "dataFormat": "json",
        "dataSource": speeddata
            
    });

    led.render();


    var speed = new FusionCharts({
        "type": "hled",
        "renderAt": "speedgauge",
        "width": "100%",
        "height": "100%",
        "dataFormat": "json",
        "dataSource": led
            
    });

    speed.render();


    
});
});
*/