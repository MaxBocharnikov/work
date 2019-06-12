'use strict';

function showModal () {
    $('.modal--create').addClass('show');
}

function hideModal() {
    $('.modal--create').removeClass('show');
    $('.modal__error').text('');
}

function showModalError() {
    $('.modal__error').addClass('show');
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

$('.modal__button--cancel').on('click', function (e) {
	e.preventDefault();
    hideModal();
});

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
       	if($('.modal--create').hasClass('show')) {
       		hideModal();
		}
    }
});

$('.modal__form').submit(function (e) {
	e.preventDefault();
	var domain = $('.modal__input').val();
	if(domain.match(/^[a-zA-Z\-]+$/)) {
		hideModal();
		alert('Данные отправлены');
	} else {
		var message;
		if (!domain) {
			message = 'Домен не может быть пустым';
		} else if (domain.match('work5')) {
            message = 'Запрещается использовать словосочетание Work 5';
		}
		else {
            var message = 'Домен может содержать только латинские символы, а также тире';
		}

		$('.modal__error').text(message);
		showModalError();
	}

});