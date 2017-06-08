/**
 * Hero-Slider
 */
$(function() {
  var animateSlide = function(slide) {
    //console.log("animateSlide");
    //console.log(slide);
    $(slide).find('.slider-hero-image').removeClass('blured');

    (function(element) {
      setTimeout(function() {
        $(element).find('.slider-slogan-before, .slider-slogan-after').removeClass('animate-in');
      }, 1000);
    })(slide);
  };

  var setBack = function() {
    $('.slider-hero-image').addClass('blured');
    $('.slider-slogan-before, .slider-slogan-after').addClass('animate-in');
  }

  var startAnimation = function() {
    
    $('.carousel-full-screen .item:first-child').each(function() {
      animateSlide(this);
    });

    /*  - Info overlay over Slider
     *  - Navigation Background
     */
    setTimeout(function() {
     /* $('.row.header').addClass('active');*/
      $('.container-header').addClass('ready');
    }, 2000);
  }



  $('.carousel-full-screen').on('slid.bs.carousel', function (event) {
    setBack();
    var target = event.relatedTarget;
    animateSlide(target);
  })

  var jgFirstImg = $('.carousel-header .item:first-child .slider-hero-image');
  if (jgFirstImg.length) {
    if (jgFirstImg.hasClass('img-loaded')) {
      startAnimation();
    } else {
      jgFirstImg[0].onload = function() {
        startAnimation();
      };
    }
  }

})


/**
 * Lazy-Loading Images
 */
$(function() {
  $('img[data-src]').each(function() {
    // Preload image via JS
    (function(jqImg) {
        var img = new Image();
        img.onload = function() {
          jqImg.attr('src', jqImg.attr('data-src'));
          jqImg.addClass('img-loaded');
        };
        //start to load the image
        img.src = jqImg.attr('data-src');
    })($(this));
  });

  $('div[data-src]').each(function() {
    // Preload image via JS
    (function(jqImg) {
        var img = new Image();
        img.onload = function() {
          jqImg.css('background-image', 'url(' + jqImg.attr('data-src') + ')');
          jqImg.addClass('img-loaded');
          jqImg.trigger('onload');
        };
        //start to load the image
        img.src = jqImg.attr('data-src');
    })($(this));

  });
});



/**
 * Header-Navigation
 */
$(function() {
  var isOnTop;

  var setHeaderOnTop = function() {
    isOnTop = $(window).scrollTop() == 0;
    $('.container-header').toggleClass('on-top', isOnTop);
  }

  setHeaderOnTop();

  $(window).scroll(function() {
    if (isOnTop != ($(window).scrollTop() == 0)) {
      setHeaderOnTop();
    }
  });
});

/*
 * smooth scrolling
 */
$(function() {
  $('a.smooth-scroll[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 127
        }, 1000);
        return false;
      }
    }
  });
});

/*
 * subscription
 */
$(function() {
	var jqForm = $('form[name="tt_address_form"]');

	var newAction = jqForm.attr('action') + "#" + jqForm.parent().attr('id');

	jqForm.attr('action', newAction);
});


$(function() {
	var form = $('.tx-powermail form');
	var navbar = $('nav.navbar-collapse');
	
	// listen for `invalid` events on all form inputs
	form.find(':input').on('invalid', function (event) {
	    var input = $(this);
		
		
		
		
	    // the first invalid element in the form
	    var first = form.find('input:invalid').first();
		
		console.log(input);
		console.log(first);
	    // only handle if this is the first invalid input
	    if (input[0] === first[0]) {
	        // height of the nav bar plus some padding
	        var navbarHeight = navbar.height() + 10;
	
	        // the position to scroll to (accounting for the navbar)
	        var elementOffset = input.offset().top - navbarHeight;
	
	        // the current scroll position (accounting for the navbar)
	        var pageOffset = window.pageYOffset - navbarHeight;
	
			//console.log(elementOffset);
			//console.log(pageOffset);
	
	        // don't scroll if the element is already in view
	        if (elementOffset > pageOffset && elementOffset < pageOffset + window.innerHeight) {
	            return true;
	        }
	
	        // note: avoid using animate, as it prevents the validation message displaying correctly
	        $('html,body').scrollTop(elementOffset);
	    }
})
});


/*For the Google Analytics Targets*/
$(document).ready(function() {
	
	
	$("a[href^='mailto:']").click(function() {
	 	ga('send', 'event', 'email', 'click');
	 	console.log("Email angeklickt");
	});
	
	$("a[href^='tel:']").click(function() {
	 	ga('send', 'event', 'telefon', 'click');
	 	console.log("Telefonnummer angeklickt");
	});
	
	$(".newsletter .btn_submit").click(function() {
	 	ga('send', 'event', 'newsletter', 'click');
	});
	

});
