

	var nav = document.querySelector(".nav");
	var nav_toggle = document.querySelector(".nav__toggle");
	var page_toggle = document.querySelector(".page-header__toggle");

	var firstname = document.querySelector("#firstname");
	var lastname = document.querySelector("#lastname");
	var phone = document.querySelector("#phone");
	var spanphone = document.querySelector(".page-form__additional--phone");
	var email = document.querySelector("#email");
	var spanemail = document.querySelector(".page-form__additional--email");

	var submit = document.querySelector("#submit");

	var modalerror = document.querySelector(".modal--error");
	var modalsuccess = document.querySelector(".modal--success");

	var successclose = document.querySelector(".modal__button");
	var errorclose = document.querySelector(".modal__button--error");

	nav.classList.add("nav--close");


	page_toggle.addEventListener("click", function(e){
		e.preventDefault();
		nav.classList.toggle("nav--close");
	});

	nav_toggle.addEventListener("click", function(e){
		e.preventDefault();
		nav.classList.add("nav--close");
	});





	submit.addEventListener("click", function(e){
		e.preventDefault();


		if(!firstname.value || !lastname.value || !phone.value || !email.value) {
			modalerror.classList.add("modal--open");

			if(!firstname.value) {
				firstname.classList.add("page-error");
			}

			if(!lastname.value) {
				lastname.classList.add("page-error");
			}

			if(!phone.value) {
				phone.classList.add("page-error");
				spanphone.classList.add("page-error--span");
			}

			if(!email.value) {
				email.classList.add("page-error");
				spanemail.classList.add("page-error--span");
			}

		} else {
			modalsuccess.classList.add("modal--open");
		}
	});

	successclose.addEventListener("click", function(e) {
		e.preventDefault();

		if(modalsuccess.classList.contains("modal--open"))  modalsuccess.classList.remove("modal--open");
	});

	errorclose.addEventListener("click", function(e) {
		e.preventDefault();

		if(modalerror.classList.contains("modal--open"))  modalerror.classList.remove("modal--open");

		if(firstname.classList.contains("page-error")) firstname.classList.remove("page-error");
		if(lastname.classList.contains("page-error")) lastname.classList.remove("page-error");
		if(phone.classList.contains("page-error")) phone.classList.remove("page-error");
		if(email.classList.contains("page-error")) email.classList.remove("page-error");

		if(spanphone.classList.contains("page-error--span")) spanphone.classList.remove("page-error--span");
		if(spanemail.classList.contains("page-error--span")) spanemail.classList.remove("page-error--span");
	});


	//нажати на клавишу esc
	window.addEventListener("keydown", function(e){
		if(e.keyCode === 27) {
			if(modalsuccess.classList.contains("modal--open"))  modalsuccess.classList.remove("modal--open");
			if(modalerror.classList.contains("modal--open"))  modalerror.classList.remove("modal--open");

			if(firstname.classList.contains("page-error")) firstname.classList.remove("page-error");
			if(lastname.classList.contains("page-error")) lastname.classList.remove("page-error");
			if(phone.classList.contains("page-error")) phone.classList.remove("page-error");
			if(email.classList.contains("page-error")) email.classList.remove("page-error");

			if(spanphone.classList.contains("page-error--span")) spanphone.classList.remove("page-error--span");
			if(spanemail.classList.contains("page-error--span")) spanemail.classList.remove("page-error--span");
		}
	});

