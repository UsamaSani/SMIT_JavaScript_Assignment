let allProductsContainer = document.getElementById("allProducts")
let cartProducts = document.getElementById("cartProducts")
let searchInput = document.getElementById("search")
let searchbtn = document.getElementById("searchbtn")
let loginbtn = document.getElementById("loginbtn")
let signOutbtn = document.getElementById("signOutbtn")
let homebtn = document.getElementById("home")
let cartbtn = document.getElementById("cart")
let contactbtn = document.getElementById("contact")
let aboutbtn = document.getElementById("about")
let contactsection = document.getElementById("contact-section")
let aboutsection = document.getElementById("about-section")
let userCartItem = JSON.parse(localStorage.getItem("userCart"))
homebtn.addEventListener('click',()=>{
    window.location.href = './index.html';
})
cartbtn.addEventListener('click',()=>{
    window.location.href = './cart.html';
})
contactbtn.addEventListener('click',()=>{
    contactsection.scrollIntoView({
        behavior: 'smooth'
    });
})
loginbtn.addEventListener('click',()=>{
    window.location.href = './login.html';
})
aboutbtn.addEventListener('click',()=>{
    aboutsection.scrollIntoView({
        behavior: 'smooth'
    });
})
let currentUser = ()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if(user){
        signOutbtn.style.display = "flex"
        signOutbtn.innerHTML= `
        ${user.username}
        <img src="${user.image}" alt="">
        `
        signOutbtn.style.display = "flex"
        loginbtn.style.display = "none"
    }else{
        loginbtn.style.display = "flex"
    }
}
currentUser()
signOutbtn.addEventListener('click',()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if(user){
        // for(i=0;i<userCartItem.length;i++){
        //     userCartItem[i].pop()
        // }
        loginbtn.style.display = "flex"
        localStorage.removeItem("user");
        localStorage.removeItem("userCart");
        window.location.reload();
    }

})


let displayProducts = ()=>{
    for(i=0;i<userCartItem.length;i++){
        let productCard = document.createElement("div")
        let odd
    productCard.className = "card"
    if(i%2==1){
        odd = "odd"
    }
    productCard.innerHTML = `
            <div class="pimg ${odd}"><img src="${userCartItem[i].images[0]}" alt=""></div>
            <div class="pabout">
            <h1 class="ph">${userCartItem[i].title}</h1>
            <p class="pp">${userCartItem[i].description}</p>
            <div class="price">
            <strong>Category: <span>${userCartItem[i].category}</span></strong>
            <strong>Price: <span>${userCartItem[i].price}$</span></strong>
            <strong>Discounted Price: <span>${userCartItem[i].discountPercentage}$</span></strong>
            <strong>Rating: <span>${userCartItem[i].rating}</span></strong>
                    <strong>Stock: <span>${userCartItem[i].stock}</span></strong>
                    </div>
                    <div class="btn"><button class="purchasebtn">Purchase</button><button class="cartbtn">Cart</button></div>
                    </div>
    `
    cartProducts.append(productCard)
}
}
    displayProducts();