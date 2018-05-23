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
//cal which is the largest image in each row 
//next for each image cal the diff in height
//add the diff in margin to the bottom 
//var first = $('.tradingcardimage').eq(0).height()
//var second = $('.tradingcardimage').eq(1).height()
//var third = $('.tradingcardimage').eq(2).height()

//$('.tradingcardimage').first().css('margin-bottom', (second - first) + 'px')
//$('.tradingcardimage').eq(2).css('margin-bottom', (second - third) + 'px')


//tradingcardimage set as var 
// jquery docs .resize()

//$( window ).resize(function() {
 // $( '.tradingcardimage' );
//});