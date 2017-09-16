var loginForm = document.forms.loginForm;
var warnPopup = document.querySelector('.warn-popup');
var body = document.body;
var topDocumentScroll;

var hideWarnMessage = function(e) {
    if (e.target.classList.contains('warn-popup')) {
        return
    }
    warnPopup.classList.add('hidden');
    body.classList.remove('frozen');
    body.querySelector('.center-block').style.marginTop = '';
    window.scroll(0, topDocumentScroll);
    document.removeEventListener('click', hideWarnMessage)
}

var showWarnMessage = function() {
    warnPopup.classList.remove('hidden');
    topDocumentScroll = window.scrollY;
    body.classList.add('frozen');
    body.querySelector('.center-block').style.marginTop = -topDocumentScroll + 'px';
    document.addEventListener('click', hideWarnMessage)
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var formData = new FormData(loginForm);
    var name = formData.get("name");
    var pass = formData.get("password");
    var saveData = formData.get("save");
    if (name && pass) {
        if (Cookies.get(name) !== undefined) {
            e.preventDefault()
        } else {
            e.preventDefault();
            showWarnMessage();
            // alert('Пользователя с таким логином не существует');
            if (saveData) {
                Cookies.set(name, pass);
            }
        }
    } else {
        e.preventDefault();
    }
})