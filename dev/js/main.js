var loginForm = document.forms.loginForm;

loginForm.addEventListener('submit', function(e) {
    var formData = new FormData(loginForm);
    var name = formData.get("name");
    var pass = formData.get("password");
    var saveData = formData.get("save");
    if (name && pass) {
        if (Cookies.get(name) !== undefined) {
            alert('Пользователь с таким именем уже залогинен');
            e.preventDefault()
        } else {
            alert('Пользователя с таким логином не существует');
            if (saveData) {
                Cookies.set(name, pass);
            }
            e.preventDefault()
        }
    } else {
        alert('Данные введены не полностью');
        e.preventDefault();
    }
})