$(document).ready(function() {
	$('.menu-item').click(function() {

	var keyword = $(this).attr('ss');
	var scrollTo = $('#' + keyword);
	console.log(keyword)
	$('html, body').animate({
		scrollTop: scrollTo.offset().top
	}, 'slow');
});})

alert("hi")