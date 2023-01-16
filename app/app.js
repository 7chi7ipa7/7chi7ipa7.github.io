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
    }
}

function initApp() {
    let hiBtn = document.getElementById('btn1');

    hiBtn.addEventListener('click', function () {
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