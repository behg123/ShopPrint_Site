function cartItems() {
    const wrapper = document.getElementById("cart-list");

    

    for(let i = 0; i < 5; i++){
        const image = "/image/" + i + ".JPG";
        const newDiv = document.createElement("div");
        const newImage = document.createElement("img");
        const newTitle = document.createElement('div');
        const newPrice = document.createElement('div');
        newDiv.id = "product-" + i;
        newImage.id = "product-img-" + i;
    
    
        newDiv.style.margin = "50px";
        newDiv.style.width = "93%";
        newDiv.style.height = "55%";
        newDiv.style.background = "#6100FF";
        newDiv.style.marginBottom = "100px";
        newDiv.onclick = function () { getId(i, image, newTitle.innerHTML) };
        newDiv.style.display = "flex";
    
        newTitle.style.fontFamily = 'Roboto';
        newTitle.style.fontStyle = 'normal';
        newTitle.style.fontWeight = '900';
        newTitle.style.fontSize = '32px';
        newTitle.style.margin = "100px";
        newTitle.style.color = "#FFFFFF";
        newTitle.innerHTML = "Produto " + i;   
    
        newPrice.style.fontFamily = 'Roboto';
        newPrice.style.fontStyle = 'normal';
        newPrice.style.fontWeight = '900';
        newPrice.style.fontSize = '32px';
        newPrice.style.color = "#FFFFFF";
        newPrice.style.margin = "100px";
        newPrice.innerHTML = "R$ " + Math.floor(Math.random() * 10) + 1 + ",00";
    
        newImage.style.borderStyle = "solid";
        newImage.style.borderColor = "#FFFFFF";
        newImage.style.margin = "10px";
        newImage.style.height = "250px";
        newImage.style.width = "250px";
        newImage.src = image;

        
        newDiv.appendChild(newImage);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newPrice);
    
        wrapper.appendChild(newDiv);
    }


}


