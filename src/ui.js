define([], function() {

  var _inProgress;

  function applyToEach( nodeList, fn ) {
    var i, l;
    for ( i = 0, l = nodeList.length; i < l; i++ ) {
      fn( nodeList[ i ], i );
    }
  }

  function convertToNodeList( item ) {
    if ( typeof item === "string" ) {
      return document.querySelectorAll( item );
    } else if ( !item ) {
      return [];
    } else if ( item[ 0 ] ) {
      return item;
    } else {
      return item;
    }
  }

  function getHeight( element ) {
    var testClone,
        h;

    testClone = element.cloneNode( true );

    testClone.style.visibility = "none";
    testClone.style.display = "block";
    testClone.style.height = "";

    element.parentNode.appendChild( testClone );
    h = testClone.getBoundingClientRect().height;
    element.parentNode.removeChild( testClone );
    return h;
  }

  return {
    each: applyToEach,
    tabs: function( options ) {
      //  element:    A selector, element, or node list
      //  onUpdate:   A function to run when a new tab is selected

      var elements,
          onUpdate;

      if ( typeof options === "string" ) {
        elements = document.querySelectorAll( options );
        options = {};
      } else {
        options = options || {};
        elements = convertToNodeList( options.elements );
      }
      onUpdate = options.onUpdate || function(){};

      applyToEach( elements, function( element ) {
        var controlContainer = element.querySelector( "[data-tab-controls]" ) || element,
            panelContainer = element.querySelector( "[data-tab-panels]" ) || element,
            controls = controlContainer.querySelectorAll( "[data-tab-control]" ),
            panels = panelContainer.querySelectorAll( "[data-tab]" ),
            i;

        function onClick( e ) {
          var whichTab = this.getAttribute( "data-tab-control" ),
              j;

          e.preventDefault();

          for ( j = 0; j < controls.length; j++ ) {
            controls[ j ].classList.remove( "tab-on" );
          }
          this.classList.add( "tab-on" );

          if ( !whichTab ) {
            return;
          }

          for ( j = 0; j < panels.length; j++ ) {
            panels[ j ].classList.remove( "tab-on" );
          }
          panelContainer.querySelector( "[data-tab=\"" + whichTab + "\"]" ).classList.add( "tab-on" );
          onUpdate( element );
        }

        for ( i = 0; i < controls.length; i++ ) {
          if ( controls[ i ].hasAttribute( "data-tab-default" ) ) {
            controls[ i ].classList.add( "tab-on" );
            panelContainer.querySelector( "[data-tab=\"" + controls[ i ].getAttribute( "data-tab-control" ) + "\"]" ).classList.add( "tab-on" );
          }
          controls[ i ].addEventListener( "click", onClick, false );
        }

      });

    }
  };
});
