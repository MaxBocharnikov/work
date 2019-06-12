'use strict';

function showModal () {
    $('.modal--create').addClass('show');
}

function hideModal() {
    $('.modal--create').removeClass('show');
}

$('.hamburger').on('click', function() {
	$('.hamburger').toggleClass('is-active');
	$('.sidebar').toggleClass('show');
});

$('.content__create-button').on('click', function () {
    showModal();
});

$('.modal__close').on('click', function () {
	hideModal();
});

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
       	if($('.modal--create').hasClass('show')) {
       		hideModal();
		}
    }
});