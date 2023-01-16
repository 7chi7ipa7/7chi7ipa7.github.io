(function ($) {
    $.fn.redraw = function () {
        return this.map(function () { this.offsetTop; return this; });
    };
})(jQuery);

let tg = window.Telegram.WebApp;
tg.expand();


var app = {
    appValue: 0,

    init: function () {
        tg.ready();
        $('body').show();

        if (!tg.initDataUnsafe ||
            !tg.initDataUnsafe.query_id) {
            app.isClosed = true;
            $('body').addClass('closed');
            app.showStatus('You opened pages not through telegram');
            return;
        }
        app.userId = tg.initDataUnsafe.user.id
        app.userName = tg.initDataUnsafe?.user?.username
        initApp();
    },
    showStatus: function (text) {
        clearTimeout(app.statusTo);
        $('.js-status').text(text).addClass('shown');
        if (!app.isClosed) {
            app.statusTo = setTimeout(function () { app.hideStatus(); }, 2500);
        }
    },
    hideStatus: function () {
        clearTimeout(app.statusTo);
        $('.js-status').removeClass('shown');
    },
}

function initApp() {
    let hi_btn = document.getElementById('btn1');

    hi_btn.addEventListener('click', function () {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            app.appValue++
            tg.MainButton.setText(`Hi ${app.userName}`)
            tg.MainButton.show();
        }
    })

    tg.onEvent('mainButtonClicked', function () {
        let data = {
            id: app.userId,
            name: app.userName,
            value: app.appValue,
        };

        tg.sendData(data);
    });
}