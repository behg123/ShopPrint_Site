function autoFillCamps(){

    const token = getCookie('token');
    const id = getCookie('id');


    axios.get("https://localhost:7150/User/GetUser/" + id, {
        headers: {
            Authorization: "Bearer " + token
          }
    })
    .then(function (response){

        document.getElementById("username").value = response.data.userName
        document.getElementById("email").value = response.data.email
        document.getElementById("telephone").value = response.data.phoneNumber

        setCookie("role", role, 7); 

    })
    .catch(function(error){
         return null
    })
}


function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
        }
    }
    return null;
    }



function edit_account(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password_repeat = document.getElementById('password-repeat').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;

    const id = getCookie('id');
    const token = getCookie('token');

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
        axios.put("https://localhost:7150/User/Update",{
            id: id,
            userName: username,
            email: email,
            password: password,
            phoneNumber: telephone,
            role: "User"
        },{
            headers: {
                Authorization: "Bearer " + token
            }
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

    