// Login

function login_input() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (!username) {
        document.getElementById('login-error').innerHTML = "Login incompleto";
    } else if (!password) {
        document.getElementById('login-error').innerHTML = "Senha incompleta";
    } else {
        location.href = "home.html"
    }
}

function signup_input(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password_repeat = document.getElementById('password-repeat').value;

    let email = document.getElementById('email').value;
    if (!username) {
        document.getElementById('login-error-signup').innerHTML = "Nome de usuário incompleto";
    } else if (!password) {
        document.getElementById('login-error-signup').innerHTML = "Senha incompleta";
    } else if (!email) {
        document.getElementById('login-error-signup').innerHTML = "Email incompleta";
    } else if (!telephone){
        document.getElementById('login-error-signup').innerHTML = "Telefone incompleta";
    } 
    else if (password != password_repeat){
        document.getElementById('login-error-signup').innerHTML = "Senhas diferentes";
    } else {
        location.href = "home.html"
    }
}

function load_images() {
    const wrapper = document.getElementById("product-list");

    for (let i = 1; i <= 20; i++) {

        const j = i % 10;

        const image = "/image/" + j + ".JPG";
        const newDiv = document.createElement("a");
        const newImage = document.createElement("img");
        const newTitle = document.createElement('div');
        const newPrice = document.createElement('div');
        newDiv.id = "product-" + i;
        newImage.id = "product-img-" + i;


        newTitle.style.fontFamily = 'Roboto';
        newTitle.style.fontStyle = 'normal';
        newTitle.style.fontWeight = '900';
        newTitle.style.fontSize = '32px';
        newTitle.style.margin = '0 0 0 10px';
        newTitle.innerHTML = "Produto " + i;

        newDiv.style.width = "400px";
        newDiv.style.height = "400px";
        newDiv.style.background = "white";
        newDiv.style.marginBottom = "100px";
        newDiv.onclick = function () { getId(i, image, newTitle.innerHTML) };


        newPrice.style.fontFamily = 'Roboto';
        newPrice.style.fontStyle = 'normal';
        newPrice.style.fontWeight = '900';
        newPrice.style.fontSize = '18px';
        newPrice.style.margin = '10px 0 0 10px';
        newPrice.innerHTML = "R$ " + Math.floor(Math.random() * 10) + 1 + ",00";


        newImage.style.padding = "7px";
        newImage.style.height = "255px";
        newImage.style.width = "385px";
        newImage.src = image;
        newDiv.appendChild(newImage);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newPrice);

        wrapper.appendChild(newDiv);


    }
}

function getId(i, image, description) {
    window.location.href = "product-view.html?comandos=" + image + ":" + i + ":" + description;

}




