function cartItems() {
    const idUser = getCookie('id');
    const token = getCookie('token');

    axios.get("https://localhost:7150/Cart/GetByUserId/" + idUser, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(function (response) {
            const cartItemsData = response.data.items;
            addItem(cartItemsData, idUser);
        })
        .catch(function (error) {

            const wrapper = document.getElementById("cart-list");
            wrapper.style.width = "1600px";
            wrapper.style.height = "700px";
            wrapper.style.display = "flex";
            
            const newDiv = document.createElement("div");
            newDiv.style.margin = "110px";
            newDiv.style.fontFamily = "Roboto"
            newDiv.style.marginBottom = "100px";
            newDiv.style.flexGrow = "1";
            newDiv.textContent = "Parece que seu carrinho esta vazio :(";
            newDiv.style.color = "#000000";
            newDiv.style.fontSize = "105px";
            
            const imageElement = document.createElement("img");
            imageElement.src = "/image/empty-icon.png";
            imageElement.style.margin = "50px";
            imageElement.style.flexGrow = "1";
            
            wrapper.appendChild(imageElement);
            wrapper.appendChild(newDiv);


        });

}


function addItem(items) {

    for (let i = 0; i < items.length; i++) {
        const wrapper = document.getElementById("cart-list");

        const item = items[i].product;
        const image = item.image;
        const newDiv = document.createElement("div");
        const newImage = document.createElement("img");
        const newTitle = document.createElement('div');
        const newQuantity = document.createElement('div');

        const newPrice = document.createElement('div');
        const newAddButton = document.createElement('button');
        const newRemoveButton = document.createElement('button');
        const newRemoveItem = document.createElement('button');


        newDiv.id = "product-" + i;
        newImage.id = "product-img-" + i;


        newDiv.style.margin = "50px";
        newDiv.style.width = "93%";
        newDiv.style.height = "55%";
        newDiv.style.background = "#6100FF";
        newDiv.style.marginBottom = "100px";
        newDiv.style.display = "flex";

        newTitle.style.fontFamily = 'Roboto';
        newTitle.style.fontStyle = 'normal';
        newTitle.style.fontWeight = '900';
        newTitle.style.fontSize = '32px';
        newTitle.style.margin = "100px";
        newTitle.style.color = "#FFFFFF";
        newTitle.innerHTML = item.name;

        newPrice.style.fontFamily = 'Roboto';
        newPrice.style.fontStyle = 'normal';
        newPrice.style.fontWeight = '900';
        newPrice.style.fontSize = '32px';
        newPrice.style.color = "#FFFFFF";
        newPrice.style.margin = "100px";
        newPrice.innerHTML = "R$" + item.price;

        newImage.style.borderStyle = "solid";
        newImage.style.borderColor = "#FFFFFF";
        newImage.style.margin = "10px";
        newImage.style.height = "250px";
        newImage.style.width = "250px";
        newImage.src = image;

        newAddButton.style.height = "50px"
        newAddButton.style.width = "50px"
        newAddButton.style.margin = "90px 0 0 0"
        newAddButton.style.innerHTML = "+";
        newAddButton.classList.add("add-button");
        newAddButton.addEventListener("click", function () {
            addQuantity(item.id);
        });


        newQuantity.style.fontFamily = 'Roboto';
        newQuantity.style.fontStyle = 'normal';
        newQuantity.style.fontSize = '32px';
        newQuantity.style.color = '#000000';
        newQuantity.style.margin = "95px 20px 0 20px";
        newQuantity.style.color = "#FFFFFF";
        newQuantity.innerHTML = items[i].quantity;
        newQuantity.id = "quantity" + item.id;

        newRemoveButton.style.height = "50px"
        newRemoveButton.style.width = "50px"
        newRemoveButton.style.margin = "90px 0 0 0px"
        newRemoveButton.style.content = "-"
        newRemoveButton.classList.add("remove-button");
        newRemoveButton.addEventListener("click", function () {
            removeQuantity(item.id);
        });

        newRemoveItem.style.height = "50px"
        newRemoveItem.style.width = "150px"
        newRemoveItem.style.margin = "90px 0 0 70px"
        newRemoveItem.style.content = "Remove"
        newRemoveItem.classList.add("remove-item");
        newRemoveItem.addEventListener("click", function () {
            removeItem(item.id);
        });



        newDiv.appendChild(newImage);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newPrice);

        newDiv.appendChild(newAddButton);
        newDiv.appendChild(newQuantity);

        newDiv.appendChild(newRemoveButton);
        newDiv.appendChild(newRemoveItem);


        wrapper.appendChild(newDiv);
    }
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


function addQuantity(idProduto) {
    const token = getCookie('token');
    const idUser = getCookie('id');

    axios.put("https://localhost:7150/Cart/AddItem/", {
        UserId: idUser,
        ProductId: idProduto
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

        .then(function (response) {
            location.reload();
        })
        .catch(function (error) {
            alert(error);
        });
}


function removeQuantity(idProduto) {
    const token = getCookie('token');
    const idUser = getCookie('id');

    axios.put("https://localhost:7150/Cart/RemoveItem/", {
        UserId: idUser,
        ProductId: idProduto
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(function (response) {
            location.reload();
                })
        .catch(function (error) {
            alert(error);
        });
}


function removeItem(idProduto) {
    const token = getCookie('token');
    const idUser = getCookie('id');

    axios.put("https://localhost:7150/Cart/RemoveProduct/", {
        UserId: idUser,
        ProductId: idProduto
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(function (response) {
            location.reload();
                })
        .catch(function (error) {
            alert(error);
        });
}



