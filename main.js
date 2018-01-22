$(document).ready(function() {
	$('.menu-item').click(function() {

	var keyword = $(this).attr('ss');
	var scrollTo = $('#' + keyword);
	console.log(keyword)
	$('html, body').animate({
		scrollTop: scrollTo.offset().top
	}, 'slow');
});})

$(document).ready(function(){
  $('.regular').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
  autoplay: true,
  autoplaySpeed: 5000,
  });
});