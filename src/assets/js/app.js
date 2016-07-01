$(document).foundation();

//scroll animation
$(".menu li a").click(function() {
	var destination = $(this).attr('href'),
	scrollbuffer;
	
	if($('.shrink').length) {
		scrollbuffer = 100;
	} else {
		scrollbuffer = 220;
	}

    $('html, body').animate({
        scrollTop: ($(destination).offset().top - scrollbuffer)
    }, 1000);
});


//photo animation
var photo = $('.photo.row, #who-we-are .content, .points .row, #team .row');

photo.addClass('animate');

//navbar and photo animation on scroll
$(window).scroll(function(){
	
	if($(document).scrollTop() > 5) {
		$('#nav_main,#collage').addClass('shrink');
	} else {
		$('#nav_main,#collage').removeClass('shrink');
	}
	photo.each(function(){
		var photooffset = $(this).offset().top,
			scrolltop = $(window).scrollTop(),
			distance = (photooffset - scrolltop);
		
		if(distance < ($(window).height() + 10)) {
			
			$(this).removeClass('animate');
		}
	});
	
});


//mobile menu icon animation
$('.menu-icon').on('click',function(){
	$(this).toggleClass('menu-open');
});


//form labels
$('#contact-form input, #contact-form textarea').on('blur',function(){
	if($(this).val()) {
		$(this).addClass('focused');
	} else {
		$(this).removeClass('focused');
	}
});



// Form
var contactform = $('#contact-form'),
	newsletterform = $('#mc-embedded-subscribe-form'),
	formMessages = $('#form-messages'),
	spinner = '<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>';

$(contactform).submit(function(e) {
	e.preventDefault();
	
	$(contactform).find('button').addClass('sending').html('Sending... ' + spinner);

	var formData = $(contactform).serialize();

/*
	$.ajax({
		type: 'POST',
		url: $(contactform).attr('action'),
		data: formData
	})
*/
	$.ajax({
	    url: "https://formspree.io/info@grandcrossing.com", 
	    method: "POST",
	    data: formData,
	    dataType: "json"
	})
	.done(function() {
		$(formMessages).removeClass('error');
		$(formMessages).addClass('success');
		$(formMessages).text('');
		$(contactform).find('button').removeClass('sending').text('Thank you.');
		//$('#contact-form input, #contact-form textarea').val('');
	})
	.fail(function() {
		$(contactform).find('button').text('Submit message');
		$(formMessages).removeClass('success');
		$(formMessages).addClass('error');
		$(formMessages).text('Sorry - your message could not be sent. Please try again.');
	});

});



//Google map
var vendormarkers = [];

$(function() {
	
  if ($('#googlemap').length) {
	
	var mapDiv = document.getElementById('googlemap');
	
	function initMap() {
		var bounds = new google.maps.LatLngBounds();
		var markers = [ //array with all marker info - popup info goes here - title, lat, long, address
			['Grand Crossing Capital',41.877458, -87.635963,'311 South Wacker Drive, Suite 2525, Chicago, IL 60606'],
		];
		var markercount = markers.length;
			
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.877458, lng: -87.635963},
			zoom: 15,
			styles: [
			    {
			        "featureType": "water",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#e9e9e9"
			            },
			            {
			                "lightness": 17
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#f5f5f5"
			            },
			            {
			                "lightness": 20
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#ffffff"
			            },
			            {
			                "lightness": 17
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#ffffff"
			            },
			            {
			                "lightness": 29
			            },
			            {
			                "weight": 0.2
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#ffffff"
			            },
			            {
			                "lightness": 18
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#ffffff"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#f5f5f5"
			            },
			            {
			                "lightness": 21
			            }
			        ]
			    },
			    {
			        "featureType": "poi.park",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#dedede"
			            },
			            {
			                "lightness": 21
			            }
			        ]
			    },
			    {
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#ffffff"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "saturation": 36
			            },
			            {
			                "color": "#333333"
			            },
			            {
			                "lightness": 40
			            }
			        ]
			    },
			    {
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#f2f2f2"
			            },
			            {
			                "lightness": 19
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#fefefe"
			            },
			            {
			                "lightness": 20
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#fefefe"
			            },
			            {
			                "lightness": 17
			            },
			            {
			                "weight": 1.2
			            }
			        ]
			    }
			]
		  
		});
		

		// Display multiple markers on a map
		var infoWindow = new google.maps.InfoWindow(), marker, i;
		
		// Loop through our array of markers & place each one on the map  
		for( i = 0; i < markers.length; i++ ) {
		    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
		    bounds.extend(position);

		    marker = new google.maps.Marker({
		        position: position,
		        //icon: locationicon,
		        map: map,
		        title: markers[i][0]
		    });
		    		    
		    
		    // Allow each marker to have an info window    
		    google.maps.event.addListener(marker, 'click', (function(marker, i) {
		        return function() {
		            infoWindow.setContent("<p style=\'margin: 0;font-weight:600;\'>"+markers[i][0]+"</p><p>"+markers[i][3]+"</p>");
		            infoWindow.open(map, marker);
		        }
		    })(marker, i));
		    
		    vendormarkers.push(marker);

		}
		
		// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
/*
		var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
		    this.setZoom(14);
		    google.maps.event.removeListener(boundsListener);
		});
*/

	}
	
	initMap();
	
  }

});
