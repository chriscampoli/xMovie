/*!
* jQuery xParallax Plugin
* Version 1.0.0 Alpha (14-SEP-2012)
* Written by Chris Campoli (me{at}campolichristian.com)
* @requires jQuery v1.8.1 or later
*
* Copyright (c) 2012 xKraty
* 
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including 
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* the above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function( $ ) {
  $.fn.xParallax = function(options) {
    // defaults to extend options
    var settings = $.extend({
      'width': 1000,
      'height': 600,
      'screenId': 'screen',
      'filmId': 'film',
      'sceneContainerClass': 'scene-container',
      'sceneClass': 'scene',
      'activeSceneClass': 'active',
      'startingScene': 1,
      'sceneTimer': 750,
      'fixedTimer': false
    }, options);

    // gloval vars
    var windowWidth = 0;
    var current = parseInt(settings.startingScene); 
    var target = current + 1;
   
    // methods
    var methods = {
        init : function(options) {
          // setting active 
          $('.'+settings.sceneContainerClass+'[data-scene="'+settings.startingScene+'"]').addClass(settings.activeSceneClass);
          $(window).resize(function(){
            methods.fixWidth.apply();
          });

          $('.move').click(function(){
            target =  $(this).data('target');
            current = $('.active.'+settings.sceneContainerClass).data('scene');
            methods.moveTo.apply();
          });

          methods.fixWidth.apply();
        },
        fixWidth : function() { 
            windowWidth = $(window).width();
            // setting up scene container area to window width
            // if the window is too small scene area is set to <width>
            $('.'+settings.sceneContainerClass).width(windowWidth > settings.width ? windowWidth : settings.width );
        },
        moveTo : function() {
            target = parseInt(target) || 1;
            var offset = - ( windowWidth * (target-1) ); // target - 1 because i have to move *to* X scene and not move *of* X scene
            if ( settings.fixedTimer ) {
              var time = settings.sceneTimer;
            } else {
              var time = Math.abs(( target - current ) * settings.sceneTimer); // absolute number for backward movements
            }
            $('.'+settings.sceneContainerClass).removeClass(settings.activeSceneClass);
            $('.'+settings.sceneContainerClass+'[data-scene="'+target+'"]').addClass(settings.activeSceneClass);
            $('#'+settings.filmId).animate({left: offset}, time);
        },
        next : function() {
          
        }
    };

    // method setup
    return this.each(function(methodOrOptions) {
      if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' was never seen over here o_O' );
      }
    }); // end each
  }; // end plugin
})( jQuery );
