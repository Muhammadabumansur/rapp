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
        } else if (saveData) {
            Cookies.set(name, pass);
        }
    } else {
        e.preventDefault();
    }
    
})