function login_input() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (!username) {
        document.getElementById('login-error').innerHTML = "Login incompleto";
    } else if (!password) {
        document.getElementById('login-error').innerHTML = "Senha incompleta";
    } else {


        axios.post("https://localhost:7150/User/Login",{
            email: username,
            password: password
        })            
        .then(function (response) {
            if(response.data == "E-mail inválido."){
                document.getElementById('login-error').innerHTML = response.data;
            } else if(response.data == "Senha inválida."){
                document.getElementById('login-error').innerHTML = response.data;
            } else{
                var token = response.data.token;
                var id = response.data.userId;
                setCookie("token", token, 7); 
                setCookie("id", id, 7); 
                axios.get("https://localhost:7150/User/GetUser/" + id, {
                    headers: {
                        Authorization: "Bearer " + token
                      }
                })
                .then(function (response){
                    var role = response.data.role
                    setCookie("role", role, 7); 
                    window.location.href = "/html/home.html";

                })
                .catch(function(error){
                     return null
                })
            }
        })
        .catch(function (error) {
            alert(error.response.data.title);
        });
    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=None";
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

