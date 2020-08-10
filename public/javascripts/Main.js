// JavaScript Document


/*slider one */
$('.slider-one')
.not(".slick_intialized")
.slick({
	infinite:true,
	autoplay:true,
	autoplaySpeed:2000,
	dots:true,
	fade:true,
	cssEase: 'linear',
	prevArrow: ".site-slider.slider-btn.prev",
	nextArrow: ".site-slider.slider-btn.next"
});

$('.popover-dismiss').popover({
	trigger: 'focus'
  })
  
  $(function () {
	$('[data-toggle="popover"]').popover()
  })