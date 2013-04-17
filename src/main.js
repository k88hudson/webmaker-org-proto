requirejs.config({
  shim: {
    "packery": {
      exports: "Packery"
    }
  }
});
require([
  "jquery",
  "text",
  "textToDom",
  "ui"
], function( $, Text, Domfrag, UI ) {
  $(function() {

    var makeContainer = document.querySelector( ".main-splash" ),
        makesByType = {
          featured: [],
          remix: [],
          template: []
        };

    function setup( makes ) {
      UI.tabs( ".wrapper" );
      UI.each( makes, function( make ) {
        var el = document.createElement( "li" );
        if ( make.tags ) {
          for ( var i = 0; i < make.tags.length; i++ ) {
             el.classList.add( make.tags[ i ] );
             if ( makesByType[ make.tags[ i ]  ]  || makesByType[ make.tags[ i ] ] === [] ) {
              makesByType[ make.tags[ i ] ].push( el );
             }
          }
        }
        el.style.backgroundColor = "rgba(99,169,133, " + ( 0.7 + Math.random() * 0.3 ) + ")";
        el.style.backgroundImage = "url( http://lorempixel.com/640/480/people/" + Math.floor( Math.random() * 10 ) + ")";
        el.innerHTML = "Blah blah blah";
        makeContainer.appendChild( el );
      });
      var container = document.querySelector( ".main-splash" ),
        packery = new Packery( container, {
          itemSelector: "li",
          gutter: -1
        }),
        flippy = document.querySelectorAll( ".flippy" ),
        makeSelector = document.querySelector( ".make-selector" );
      UI.each( flippy, function( el ) {
        el.addEventListener( "click", function() {
          this.classList.toggle( "flipped" );
        }, false );
      });
      makeSelector.addEventListener( "change", function( e ) {
        var allOthers = makeContainer.querySelectorAll( "li" ) || [],
            theseMakes = makesByType[ this.value ] || [];
        console.log( theseMakes );
        if ( allOthers.length ) {
          packery.remove( allOthers );
        }
        if ( theseMakes.length ) {
          packery.addItems( theseMakes );
        }
        packery.layout();
      }, false );
    }

    $.getJSON( "src/data/fakes.json", function( data ) {
      setup( data.makes );
    });

  });
});
