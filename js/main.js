'use strict';
(function () {
    var preview = document.querySelector('.picker__preview');
    var mainValue = document.querySelector('.picker__input--main');
    window.chooserValue = document.querySelectorAll('.picker__input--chooser');

    mainValue.value = '#000000';
    window.chooserValue.forEach(function (chooser) {
        chooser.value = '0';
    })

    // Изменяем значение главного инпута
    window.changeMainValue = function () {
        var mainVal = '#';
        window.chooserValue.forEach(function (chooser) {
            var chooserValue = parseInt(chooser.value, 10);
            var hexValue = chooserValue.toString(16);
            if (hexValue < 10) {
                hexValue = '0' + hexValue;
            }
            mainVal+=hexValue;
        });
        mainValue.value = mainVal;
    };

    // Изменяем цвет превью
    window.changePreview = function () {
        preview.style.background = mainValue.value;
    };

    // Обработчик на изменения в одном из инпутов установки цвета
    var chooserChangeHandler = function (chooser) {
        chooser.addEventListener('change', function (e) {
            if (e.target.value < 0 || e.target.value > 255) {
                chooser.value = '0';
            } else {
                chooser.value = e.target.value;
            }
            changeMainValue();
            window.changeRange();
            changePreview();
        });
    };

    // На каждый инпут установки цвета вызываем обработчик
    window.chooserValue.forEach(function (chooser, index) {
        chooserChangeHandler(chooser, index);
    });

    // На изменение основого инпута
    mainValue.addEventListener('change', function (e) {
        if (!e.target.value.toString().toUpperCase().match('^#((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$')) {
            mainValue.value = '#000000';
        } else {
            mainValue.value = e.target.value;
        }
        changeChooserValues();
        window.changeRange();
        changePreview();
    });

    //Изменить инпуты выбора цвета
    var changeChooserValues = function () {
        var arrValues = [];
        var modVal = mainValue.value;
        modVal = modVal.substr(1);
        arrValues = modVal.match(/[\s\S]{1,2}/g);

        arrValues.forEach(function (it ,index) {
            window.chooserValue[index].value = parseInt(it, 16); // преобразуем к rgb
        })
    };

})();
