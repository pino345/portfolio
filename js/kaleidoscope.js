/*
Original original https://github.com/coldhead/kaleidos
Yo sólo lo traslado a un pen para ilustrar artículo en ksesoCss.blogspot.com
*/

$(document).ready(function () {

    // Crude $_GET style array of query string parameters.
    var parameters = (function (src) {
  var params = src.split(/&/);
	$.each(params, function (i, p) {
	    p = p.replace(/\/$/, '').split(/=/);
	    var k = p[0].replace(/^\?/, '');
	    params[k] = p[1] || true;
	});

	return params;
    })(location.search);


    // PARAMETER: *n* is the number of segements.
    var n = ~~parameters['n'] || 7;
    if (n) {
	var tiles = '';
	for (var i = 0; i <= n * 2; i++) {
	    tiles += '<div class="tile t' + i + '"><div class="image"></div></div>';
	}
    }

    var $kaleidescope = $('.kaleidoscope');
    $kaleidescope.addClass('n' + n);
    $kaleidescope.append(tiles);
    var $image = $kaleidescope.find('.image');

    // PARAMETER: *src* is the URL for an alternate image.
    var src = parameters['src'];
    if (src)
	$image.css('background-image', 'url(../images/maxresdefault.jpg)');

    // PARAMETER: *clean* hides the Github link.
    var clean = parameters['clean'];
    if (clean)
	$('#fork').hide();

    // PARAMETER (undocumented): *mode* changes the animation style.
    var mode = ~~parameters['mode'] || 2;

    var x = 0;
    var y = 0;


    // Project changes in cursor (x, y) onto the image background position.
   $(document).mousemove(function (e) {
       x++;
       y++;

       var nx = e.pageX, ny = e.pageY;
       switch (mode) {
	   case 1: {
	       nx = -x;
	       ny = e.pageY;
	       break;
	   }
	   case 2: {
	       nx = e.pageX;
	       ny = -y;
	       break;
	   }
	   case 3: {
	       nx = x;
	       ny = e.pageY;
	       break;
	   }
	   case 4: {
	       nx = e.pageX;
	       ny = y;
	       break;
	   }
	   case 5: {
	       nx = x;
	       ny = y;
	   }
       }

       $image.css('background-position', [nx + "px", ny + "px"].join(' '));
   });

});