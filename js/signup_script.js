function signup_input(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password_repeat = document.getElementById('password-repeat').value;
     
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;
    if (!username) {
        document.getElementById('signup-error').innerHTML = "Nome de usuário incompleto";
    } else if (!password) {
        document.getElementById('signup-error').innerHTML = "Senha incompleta";
    } else if (!email) {
        document.getElementById('signup-error').innerHTML = "Email incompleta";
    } else if (!telephone){
        document.getElementById('signup-error').innerHTML = "Telefone incompleto";
    } 
    else if (password != password_repeat){
        document.getElementById('signup-error').innerHTML = "Senhas diferentes";
    } else {
        axios.post("https://localhost:7150/User/Create",{
            userName: username,
            email: email,
            password: password,
            phoneNumber: telephone,
            role: "User"
        }).then(function (response) {
            window.location.href = "home.html";
        })
            .catch(function (error) {
                const responseData = error.response.data;
                if (responseData.errors) {
                    const firstErrorKey = Object.keys(responseData.errors)[0];
                    const firstError = responseData.errors[firstErrorKey][0];
                    document.getElementById('signup-error').innerHTML = firstError;
                }
            });
        }
    }


function checkCookieExists(cookieName) {
    var cookies = document.cookie.split(";");
    
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + "=")) {
        return true;
        }
    }
    
    return false;
    }
    
function changeLayout(){
    var cookieName = "token";
    var cookieExists = checkCookieExists(cookieName);
    if (cookieExists) {
        window.location.href = "home.html";
    } else {   

    }
}
    
    