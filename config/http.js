/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

/**
 * A shallow object extender function
 */
var extend = require('util')._extend;

/**
 * Generate universal unique id's (for DOM element IDs, etc)
 */
var uuid = require('uuid');


module.exports.http = {

        /*
         * HTML helpers that are available from views:
         */
        customMiddleware: function (app) {
            app.use(function (req, res, next) {
                
                /**
                 * Adds a string to the classes key of the options object.  
                 * 
                 * Helper for appending CSS classes
                 */
               res.locals.addClass = function( options, cls) {
                   if( options.classes ) {
                       options.classes = options.classes + ' ' + cls;
                       return options;
                   }
                   else {
                       options.classes = cls;
                       return options;
                   }
                   
               }
              
              /**
               * Insert a div configured as a modal dialog.
               *
               * activate the dialog using the $('#id').modal() call, or by clicking a link of class
               * 'dialog-static' which causes helper.js to open and center the dialog box.
               *
               * The content should be generated using something like the dialogStart, dialogEnd helper functions
               *
               * @param string id      DOM id for the dialog box
               * @param string content content for the dialog box
               *
               * @return null
               */
              res.locals.modal = function(id, content)
              {
                  return '<div class="black-box modal hide fade in" id="' + id + '">' + content + '<div>';
              };


              /**
               * Helpers for inserting a bootstrap row.
               * 
               * Use row.start, then your content, then row.end
               *
               * @return string
               */
              res.locals.row = {
                  start : function() {
                      return '<div class="row-fluid">';
                  },
                  end : function() {
                      return '</div>';
                  },
                  
              };

              /**
               * Helpers for inserting a bootstrap column.
               * 
               * Use column.start(width), then your content, then column.end
               * The parameter is the number of grids the column should span (1-12)
               *
               * @return string
               */
              res.locals.column = {
                  start : function( span, classes ) {
                      classes = classes || '';
                      
                      return '<div class="span' + span + ' ' + classes + '">';
                  },
                  end : function() {
                      return '</div>';
                  },
                  
              };

              /**
               * Builds an HTML anchor tag
               *
               * @param mixed  name    name of the icon; see Bootstrap docs
               * @param string color   the color of the icon (black or white)
               *
               * @access public
               * @return void
               */
              res.locals.link = function( content, link, options, confirm )
              {
                  options = options || {};
                  options = extend( {}, options);
                  
                  confirm = confirm || false;
                  //@todo options and confirm
                  return '<a href="' + link + '">' + content + '</a>';
              };

              /**
               * Takes the name of an icon and returns the i tag with the appropriately
               * named class. The second param will switch between black and white
               * icon sets.
               *
               * @param mixed  name    name of the icon; see Bootstrap docs
               * @param string color   the color of the icon (black or white)
               *
               * @access public
               * @return void
               */
              res.locals.icon = function( name, color )
              {
                  var c = 'icon-' + name;
                  
                  color = color || 'black';
                  if (color === 'white')
                  {
                      c = c + ' icon-white';
                  }
                  
                  return '<i class="' + c + '"></i>';
              };


              /**
               * Builds a dropdown menu for inclusion in a box
               *
               * Include an array of strings containing <a> tags or blank string ('') for a divider
               *
               * Options:
               *     icon: the icon for the menu (see icon helper)
               *
               * @param array links   an array of strings containing <a> elements
               * @param array options options for the menu
               *
               * @return string HTML element
               */
              res.locals.boxDropdownMenu = function( links, options )
              {
                  options = options || {};
                  options = extend( {icon: 'cog'}, options);

                  var list = '';

                  links.forEach(function(entry) 
                  {
                      if( entry == '') list = list + '<li class="divider"></li>';
                      else list = list + '<li>' + entry + '</li>';
                  });

                  var icon = '<a class="dropdown-toggle" data-toggle="dropdown">' + res.locals.icon( $options['icon'] ) + '</a>';

                  return '<span class="pull-right"><span class="options"><div class="btn-group">' + icon
                          + '<ul class="dropdown-menu black-box-dropdown dropdown-left">' + list + '</ul></div></span></span>';
              };

              /**
               * Builds a toolbar icon menu for inclusion in a box helper
               *
               * Include an array of buttons, each array element containing a button definition object:
               *     'icon' -> see icon helper
               *     'link' -> an <a> tag
               *     'confirm' -> string text to display in a confirmation box
               *
               * Options:
               *
               * @param array buttons an array of strings containing <a> elements
               *
               * @return string HTML element
               */
              res.locals.boxToolbar = function( buttons )
              {
                  var icons = '';

                  buttons.forEach( function( entry )
                  {
                      // initialize options and confirm in case the caller didn't
                      entry = extend( {options:{}, confirm:false }, entry);
                      entry.options = extend( entry.options, {escape:false} );

                      icons = icons + res.locals.link(
                          res.locals.icon( entry.icon ),
                          entry.link,
                          entry.options,
                          entry.confirm );
                  });

                  return '<span class="pull-right"><span class="options"><div class="btn-group">' + icons + '</div></span></span>';
              };

              /**
               * Returns a content box, with title and optional icon
               *
               * You should put this box inside a 'row-fluid' or 'row' div according to bootstrap conventions
               * You have to close the box with box.end
               *
               * Options:
               *     'title' = the text for the title bar
               *     'icon' = the icon to put to the left of the title (see $this->icon)
               *     'menu' = dropdown menu in the title bar (from output of $this->boxDropdownMenu or $this->boxToolbar)
               *     'span' => the number of grids spanned by the box (1-12, default is 12)
               *     'type' => 'box' or 'black-box' or 'tabbable black-box' or 'tabbable-box'
               *
               * @param string content HTML to put in the box
               * @param array  options see descriptions
               *
               * @return string HTML element
               */
              res.locals.box = {
                      start: function( content, options ) { 
                  
                          if( 'object' == typeof( content ))
                              {
                              options = content;
                              content = '';
                              }
           
                  options = options || {};
                  options = extend( {title: '', icon: '', span: 12, type: 'black-box tex', menu: ''}, options); 

                  var icon = (options.icon > '') ? res.locals.icon( options.icon ) + ' ' : '';

                  var header = '<div class="tab-header">' + icon + options.title + options.menu + '</div>';
                  
                  return '<div class="span' + options.span + ' ' + options.type + '">' + header 
                      + '<div class="row-fluid">' + content;
              },
              end: function() {
                  return '</div></div>';
              }
              };

             
              /**
               * Returns a div with content
               *
               * You should put this box inside a 'row-fluid' or 'row' div according to bootstrap conventions.
               * If no content is supplied, only an opening tag is returned (close the element with this->blockEnd)
               *
               * Options:
               *     'span' => the number of grids spanned by the box (1-12, default is 12)
               *
               * @param string content HTML to put in the box
               * @param array  options see descriptions
               *
               * @return string HTML element
               */
              res.locals.block = function( content, options )
              {
                  if( content > '' ) content += '</div>';
                  
                  options = options || { span: 12 };
                  options.span = options.span || 12;
                  
                  var classes = 'span' + options.span;
                  
                  if( 'string' == typeof(options.classes))
                      classes = classes + ' ' + options.classes;
                  
                  return '<div class="' + classes + '">' + content;
              };

              /**
               * Returns a closing div tag for a block started with ::block
               *
               * @return string closing tag
               */
              res.locals.blockEnd = function()
              {
                  return '</div>';
              };

              /**
               * Inserts a status block widget
               *
               * Options
               *     valueClass: a CSS class to apply to the value text (try 'red')
               *     Other options are passed through to ::block
               *
               * @param string $title   the title (small letters)
               * @param string $value   the value (big letters)
               * @param string $detail  additional content to show next to the title/value
               * @param array  $options see description
               *
               * @return string HTML content
               */
              res.locals.statusBlock = function( title, value, detail, options)
              {
                  options = options || {};
                  detail = detail || '';
                  options = this.addClass( options, 'status-box');
                  
                  var valueClass = options.valueClass || '';
                  delete options.valueClass;

                  return this.block('<div class="status-row"><h4 class="' + valueClass + '"><span>' + title + '</span>' + value + '</h4>' + detail + '</div>', options );
              };

              /**
               * statusRow
               *
               * @param unknown $content - content
               * @param unknown $options - options
               *
               * @return string
               *
               * @todo more docs
               */
              res.locals.statusRow = function( content, options )
              {
                  return this.block( '<div class="status-row">' + content + '</div>', options );
              };

              /**
               * Returns a padded div
               *
               * You should put this box inside a 'row-fluid' or 'row' div according to bootstrap conventions
               *
               * Options:
               *     'span' => the number of grids spanned by the box (1-12, default is 12)
               *     'classes => css classes to add to the div
               *
               * @param string content HTML to put in the box.  If not specified, you have to close the block with ::blockEnd!!
               * @param array  options see descriptions
               *
               * @return string HTML element
               */
              res.locals.blockPadded = function( content, options )
              {
                  content = content || '';
                  if( content > '' ) content += '</div>';
                  
                  options = options || { span:12 };
                  
                  var classes = 'padded span' + options.span;
                  delete options.span;

                 

                  return '<div class="' + classes + '">' + content;
              };


             /**
               * Generates an HTML toggle (on/off) switch
               *
               * Options:
               *     'label': the text to show near the toggle switch
               *     'position': 'left' (default) or 'right'; the location of the label relative to the switch
               *     'color': 'green' (default)
               *     'checked': true or false (default), dependent on state of input
               *     'id': the HTML element's id (include this if you need a specific id to hook events to)
               * Examples:
               *    toggleSwitch( {id: 'my-toggle'});
               *    Client-side: capture a change notification:
               *      $("#my-toggle").change(function() { alert($(this).attr("checked")); });'
               *
               * @param array options see description above
               *
               * @return string HTML content
               */
              res.locals.toggleSwitch = function( options ) 
              {
                 options = extend( { label: '', color: 'green', checked: false, position: 'left' }, options);

                  // make a new unique element ID
                  options.id = options.id || uuid.v4();

                  if (true == $options['checked'])
                  {
                      return '<span class="checky-label-' + options.position + '">'
                          + options.label + '</span>'
                          + '<input type="checkbox" id="' + options.id + '" class="checky ' + options.color + '" checked/>'
                          + '<label for="' + options.id + '" class="checky '
                          + options.color + '"><span></span></label>';
                  }
                  else
                  {
                      return '<span class="checky-label-' + options.position + '">'
                          + options.label + '</span>'
                          + '<input type="checkbox" id="' + options.id + '" class="checky ' + options.color + '" />'
                          + '<label for="' + options.id + '" class="checky '
                          + options.color + '"><span></span></label>';
                  }
              }

             /**
               * Panel helpers, to make panels with LED indicators for instance
               * 
               * 
               *
               */
              res.locals.panel = {
                      columnCount : '',
                      columnWidth : '',

                      open : function (columnNumber, header1, header2, header3, header4, header5, header6) {
                  columnCount = columnNumber;
                  columnWidth = 100 / columnNumber;
                  columnWidth = columnWidth.toFixed(2);
                  columnWidth = columnWidth.toString() + "%";
                  var headerCount = 0;
                  var tableArray = new Array('<div class="panel-table-wrap"><table class="panel-table"><thead>');
                  var headerArray = new Array('<tr>');
                  for (var i=1; i<=columnNumber; i++) {
                      if(typeof(arguments[i]) == 'undefined') 
                          arguments[i] = '<div class="panel-column-head-empty"></div>';
                      else headerCount++;
                      headerArray.push('<td class="panel-column-head"><div class="inner">' + arguments[i] + "</div></td>");
                  }
                  headerArray.push('</tr>');
                  //Only include a table head if there is at least one header.
                  if (headerCount > 0)
                      tableArray.push(headerArray.join(''));
                  tableArray.push('</thead><tbody>');
                  return tableArray.join('');
              },

              close : function () {
                  return '</tbody></table></div>';
              },

              /*
               * An LED Group should be a set of single lights (as described below).  Maximum of 9 supported,
               * which is a number that probably won't fit into the page properly.
               * 
               * var sampleLight1 = new array('Some indicator', 'green', 'off');
               * var sampleLight2 = new array('Another light', 'yellow', 'on');
               * var sampleLight3 = new array('Blinkenlight', 'red', 'blink');
               * PanelLEDGroup(sampleLight1, sampleLight2, sampleLight3);
               */
              ledGroup : function (light1, light2, light3, light4, light5, light6, light7, light8, light9) {
                  var wrapperClasses = "panel-led-group ";
                  var lights = new String();
                  var LEDGroup = new String();
                  var lightCount = arguments.length;
                  var lightWidth = '';
                  if (lightCount < 2) {
                      wrapperClasses += "panel-led-quantity-single ";
                      lightWidth = 'auto';
                  } else {
                      var temp = parseFloat(100/lightCount);      
                      lightWidth = (temp.toFixed(2)).toString() + "%";
                  }
                  for (var i= 0; i< lightCount; i++)
                      lights += this.led(arguments[i], lightWidth);
                  LEDGroup = "<div class='" + wrapperClasses + "'>" + lights + "</div>";
                  LEDArray = new Array(LEDGroup, wrapperClasses);
                  return LEDArray;
              },

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
              led : function (light, lightWidth) {
                  var LEDClass =  'panel-led-individual panel-led-label-' + this.makeSafeForCSS(light[0]) + ' ';
                  var LED = new String();
                  if (typeof(lightWidth) == 'undefined') {
                      lightWidth = 'auto';
                  } 
                  if (typeof(light) == 'string') {
                      LED = "<div class='" + LEDClass + "' style='width:" + lightWidth +  ";'><div class='inner'><div class='panel-led-led'></div><span class='panel-led-label-text'>" + light + "</span></div></div>"; 
                  } else {
                      LEDClass += 'panel-led-color-' + light[1] + ' ';
                      if (light.length > 2) 
                          LEDClass += 'panel-led-power-' + light[2] + ' ';
                      LED = "<div class='" + LEDClass + "' style='width:" + lightWidth +  ";'><div class='inner'><div class='panel-led-led'></div><span class='panel-led-label-text'>" + light[0] + "</span></div></div>";
                  }
                  return LED;
              },

              text : function (text) {
                  var panelClass = 'panel-text';
                  var panelText = "<div class='" + panelClass + "'><div class='inner'><div class='panel-text-text'>" + text + "</div></div></div>";
                  var textArray = new Array(panelText, panelClass);
                  return textArray;
              },

              label : function (text, link) {
                  var labelClass= 'panel-label ';
                  var labelLink = new String();
                  var labelCell = new String();
                  
                  if (typeof(link) != 'undefined') {
                      labelClass += 'panel-label-link ';
                      labelLink = '<a class="panel-info-link" href="' + link + '">info</a>';
                  }
                  labelCell = '<div class="' + labelClass + '"><div class="inner"><div class="panel-label-text">' + text + '</div>' + labelLink + "</div></div>";
                  var label = new Array(labelCell, labelClass);
                  return label;
              },
              
              lineMeter : function (percentage, lowLabel, highLabel) {
                  if (typeof(lowLabel) == 'undefined')
                      lowLabel = 0;
                  if (typeof(highLabel) == 'undefined')
                      highLabel = 100;
                  var labelCell = '<div class="panel-line-meter-wrap"><div class="panel-line-meter-label-low">' + lowLabel 
                      + '</div><div class="panel-line-meter-meter"><div class="panel-line-meter-gradations"><img src="/img/set2/line-meter-gradations2.png" alt="' + percentage + '" title="' + percentage + '"></div><div class="panel-line-meter-reading" title="' + percentage + '" style="width:' + percentage 
                      + '%;"></div></div><div class="panel-line-meter-label-low">' + highLabel
                      + '</div></div>';
                  var labelClass = 'panel-line-meter';
                  var lineMeterArray = new Array(labelCell, labelClass);
                  return lineMeterArray;
                  
              },


              //Thank you StackOverflow. http://stackoverflow.com/questions/7627000/javascript-convert-string-to-safe-class-name-for-css 
              makeSafeForCSS : function (name) {
                  return name.replace(/[^a-z0-9]/g, function(s) {
                      var c = s.charCodeAt(0);
                      if (c == 32) return '-';
                      if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
                      return '__' + ('000' + c.toString(16)).slice(-4);
                  });
              },

              row : function (row1, row2, row3, row4, row5, row6) {
                  var cellContents = '';
                  var rowArray = new Array('<tr class="panel-row panel-row-count-' + columnCount +'">');
                  for(var i=0; i < columnCount; i++) {
                      if (typeof(arguments[i]) != 'undefined') { 
                          cellContents = arguments[i][0];
                          cellClass = arguments[i][1]; 
                      } else { 
                          cellContents = '<div class="panel-cell-empty"></div>';
                          cellClass = 'panel-cell-empty';
                      }
                      rowArray.push( '<td class="panel-row-cell ' + cellClass + '" style="width:' + columnWidth + '">' + cellContents + '</td>' );
                  }
                  rowArray.push('</tr>');
                  return rowArray.join('');
              },

              stringLookup : function (key) {
                  //Depending on how we handle key translation, this may substitute system strings for human-readable strings.
                  return key;
              },
              
              
              },
              
              
              
              /**
               * 
               * 
               */
              

              next();
            });
          },

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {
      /**
       * Insert a div configured as a modal dialog.
       *
       * activate the dialog using the $('#id').modal() call, or by clicking a link of class
       * 'dialog-static' which causes helper.js to open and center the dialog box.
       *
       * The content should be generated using something like the dialogStart, dialogEnd helper functions
       *
       * @param string id      DOM id for the dialog box
       * @param string content content for the dialog box
       *
       * @return null
       */
      modal : function(id, content)
      {
          return '<div class="black-box modal hide fade in" id="' + id + '">' + content + '<div>';
      },


      /**
       * Inserts the starting tag for a bootstrap grid row
       *
       * @return string
       */
      rowStart : function()
      {
          return '<div class="row-fluid">';
      },

      /**
       * Closes what rowStart began
       *
       * @return string
       */
      rowEnd : function()
      {
          return '</div>';
      },

      /**
       * Builds an HTML anchor tag
       *
       * @param mixed  name    name of the icon; see Bootstrap docs
       * @param string color   the color of the icon (black or white)
       *
       * @access public
       * @return void
       */
      link : function( content, link, options, confirm )
      {
          options = options || {};
          options = extend( {}, options);
          
          confirm = confirm || false;
          //@todo options and confirm
          return '<a href="' + link + '">' + content + '</a>';
      },

      /**
       * Takes the name of an icon and returns the i tag with the appropriately
       * named class. The second param will switch between black and white
       * icon sets.
       *
       * @param mixed  name    name of the icon; see Bootstrap docs
       * @param string color   the color of the icon (black or white)
       *
       * @access public
       * @return void
       */
      icon : function( name, color )
      {
          var c = 'icon-' + name;
          
          color = color || 'black';
          if (color === 'white')
          {
              c = c + ' icon-white';
          }
          
          return '<i class="' + c + '"></i>';
      },


      /**
       * Builds a dropdown menu for inclusion in a box
       *
       * Include an array of strings containing <a> tags or blank string ('') for a divider
       *
       * Options:
       *     icon: the icon for the menu (see icon helper)
       *
       * @param array links   an array of strings containing <a> elements
       * @param array options options for the menu
       *
       * @return string HTML element
       */
      boxDropdownMenu : function( links, options )
      {
          options = options || {};
          options = extend( {icon: 'cog'}, options);

          var list = '';

          links.forEach(function(entry) 
          {
              if( entry == '') list = list + '<li class="divider"></li>';
              else list = list + '<li>' + entry + '</li>';
          });

          var icon = '<a class="dropdown-toggle" data-toggle="dropdown">' + res.locals.icon( $options['icon'] ) + '</a>';

          return '<span class="pull-right"><span class="options"><div class="btn-group">' + icon
                  + '<ul class="dropdown-menu black-box-dropdown dropdown-left">' + list + '</ul></div></span></span>';
      },

      /**
       * Builds a toolbar icon menu for inclusion in a box helper
       *
       * Include an array of buttons, each array element containing a button definition object:
       *     'icon' -> see icon helper
       *     'link' -> an <a> tag
       *     'confirm' -> string text to display in a confirmation box
       *
       * Options:
       *
       * @param array buttons an array of strings containing <a> elements
       *
       * @return string HTML element
       */
      boxToolbar : function( buttons )
      {
          var icons = '';

          buttons.forEach( function( entry )
          {
              // initialize options and confirm in case the caller didn't
              entry = extend( {options:{}, confirm:false }, entry);
              entry.options = extend( entry.options, {escape:false} );

              icons = icons + res.locals.link(
                  res.locals.icon( entry.icon ),
                  entry.link,
                  entry.options,
                  entry.confirm );
          });

          return '<span class="pull-right"><span class="options"><div class="btn-group">' + icons + '</div></span></span>';
      },

      /**
       * Returns a content box, with title and optional icon
       *
       * You should put this box inside a 'row-fluid' or 'row' div according to bootstrap conventions
       *
       * Options:
       *     'title' = the text for the title bar
       *     'icon' = the icon to put to the left of the title (see $this->icon)
       *     'menu' = dropdown menu in the title bar (from output of $this->boxDropdownMenu or $this->boxToolbar)
       *     'span' => the number of grids spanned by the box (1-12, default is 12)
       *     'type' => 'box' or 'black-box' or 'tabbable black-box' or 'tabbable-box'
       *
       * @param string content HTML to put in the box
       * @param array  options see descriptions
       *
       * @return string HTML element
       */
      box : function( content, options )
      { 
          // Set defaults
          options = options || {};
          options = extend( {title: '', icon: '', span: 12, type: 'black-box tex', menu: ''}, options); 

          var icon = (options.icon > '') ? res.locals.icon( options.icon ) + ' ' : '';

          var header = '<div class="tab-header">' + icon + options.title + options.menu + '</div>';
          
          return '<div class="span' + options.span + ' ' + options.type + '">' + header 
              + '<div class="row-fluid">' + content + '</div>';
      },

 
  
 
  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
       'startRequestTimer',
       'cookieParser',
       'session',
       'myRequestLogger',
       'bodyParser',
       'handleBodyParserError',
       'compress',
       'methodOverride',
       'poweredBy',
       '$custom',
       'router',
       'www',
       'favicon',
       '404',
       '500',
       'rowStart',
    ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

   },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
