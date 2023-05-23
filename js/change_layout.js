function changeLayout(){
    var cookieName = "token";
    var cookieExists = checkCookieExists(cookieName);
  
    var cookieRole = "role";
    var cookieRoleExists = checkCookieExists(cookieName);

    var cookieId = "id";
    var cookieIdExists = checkCookieExists(cookieId);
  
    if (cookieExists) {
      //alert("O cookie 'token' existe.");
      var dropdownContent = document.querySelector(".dropdown-content");
  
      var loginRedirect = document.getElementById("login-redirect");
      var signupRedirect = document.getElementById("signup-redirect")
  
      loginRedirect.textContent = "Editar Conta";
      loginRedirect.href = "edit-account.html"




      signupRedirect.textContent = "Sign Off";
      signupRedirect.href = "home.html";
      signupRedirect.addEventListener("click", deleteCookie.bind(null, cookieName));  
      signupRedirect.addEventListener("click", deleteCookie.bind(null, cookieRole));  
      signupRedirect.addEventListener("click", deleteCookie.bind(null, cookieId));  

      
      if(checkAdminRole()){
        var newLoginRedirect = document.createElement("a");
        newLoginRedirect.id = "new-login-redirect";
        newLoginRedirect.href = "product-create.html";
        newLoginRedirect.className = "login-box";
        newLoginRedirect.innerText = "Criar Item";
        newLoginRedirect.style.left = "90px";
        newLoginRedirect.style.top = "285px";
        newLoginRedirect.style.width = "240px";
        newLoginRedirect.style.backgroundColor = "#FFFFFF";
        dropdownContent.appendChild(newLoginRedirect);
  
      } 
  
    } else {
      var cart = document.getElementById("cart-icon")
      cart.style.display = "none"; 
      //alert("O cookie 'token' não existe.");
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
  
function checkAdminRole() {
    return checkCookieValue("role", "Admin");
}
  
  function checkCookieValue(cookieName, expectedValue) {
    var cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        var value = cookie.substring(cookieName.length + 1);
        return value === expectedValue;
      }
    }
  
    return false;
  }

  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
  
function checkAdminRole() {
    return checkCookieValue("role", "Admin");
}