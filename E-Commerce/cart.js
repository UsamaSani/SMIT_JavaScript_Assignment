let allProductsContainer = document.getElementById("allProducts")
let cartProducts = document.getElementById("cartProducts")
let searchInput = document.getElementById("search")
let searchbtn = document.getElementById("searchbtn")
let loginbtn = document.getElementById("loginbtn")
let dashboardBtn = document.getElementById("dashboardBtn")
let homebtn = document.getElementById("home")
let cartbtn = document.getElementById("cart")
let contactbtn = document.getElementById("contact")
let aboutbtn = document.getElementById("about")
let contactsection = document.getElementById("contact-section")
let aboutsection = document.getElementById("about-section")
let userCartItem = JSON.parse(localStorage.getItem("userCart"))
homebtn.addEventListener('click',()=>{
    location.href = './index.html';
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

dashboardBtn.addEventListener('click',()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    let currentNewUser = JSON.parse(localStorage.getItem("currentNewUser"))
    let cnewUser = false
    if(currentNewUser){
        window.location.href = './dashboard.html'
        cnewUser = true
    }
    if(cnewUser == false){
        if(user){
            window.location.href = './dashboard.html'
        }
    }

})


let displayProducts = ()=>{
    if(userCartItem){
        // for(i=0;i<userCartItem.length;i++){
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
                        <strong>Stock: <span class="itemStock">${userCartItem[i].stock}</span></strong>
                        </div>
                        <div class="btn"><button class="purchasebtn">Purchase</button><button class="removeCartItem">Remove</button><span class="ItemWarning"></span></div>
                        </div>
        `
        cartProducts.append(productCard)
        let removeCartItem  = productCard.querySelector(".removeCartItem")
        let itemPurchasebtn = productCard.querySelector(".purchasebtn")
        let ItemWarning = productCard.querySelector(".ItemWarning")
        let itemStock = productCard.querySelector(".itemStock")
        itemPurchasebtn.addEventListener('click',()=>{
            let iStv = itemStock.innerText
            itemStock.innerText = `${iStv - 1}`
            ItemWarning.innerText = "Purchase SuccessFull!"
            setTimeout(()=>{
              ItemWarning.innerText = ""
          },2000)
            if(iStv == 0 ){
                itemStock.innerText = "0"
                ItemWarning.innerText = "Out of Stock!"
                setTimeout(()=>{
                    ItemWarning.innerText = ""
                },2000)
            }
        })
        removeCartItem.addEventListener("click", (event) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let curtNewUser = JSON.parse(localStorage.getItem("currentNewUser"));
    let cUserNew = false;
    if (curtNewUser) {
      let card = event.target.closest(".card");
      let titleValue = card.querySelector(".ph").innerText;
      let descriptionValue = card.querySelector(".pp").innerText;
      for (i = 0; i < userCartItem.length; i++) {
        if (
          titleValue.toLowerCase().trim() ==
          userCartItem[i].title.toLowerCase().trim() &&
          descriptionValue.toLowerCase().trim() ==
            userCartItem[i].description.toLowerCase().trim()
        ) {
        userCartItem.splice(i,1)
        localStorage.removeItem("userCart")
        localStorage.setItem("userCart", JSON.stringify(userCartItem));
        card.remove()
        }
      }
      cUserNew = true;
    }
    if (cUserNew == false) {
      if (user) {
        let card = event.target.closest(".card");
        let titleValue = card.querySelector(".ph").innerText;
        let descriptionValue = card.querySelector(".pp").innerText;
        for (i = 0; i < userCartItem.length; i++) {
          if (
            titleValue.toLowerCase().trim() ==
            userCartItem[i].title.toLowerCase().trim() &&
            descriptionValue.toLowerCase().trim() ==
              userCartItem[i].description.toLowerCase().trim()
          ) {
          userCartItem.splice(i,1)
          localStorage.removeItem("userCart")
          localStorage.setItem("userCart", JSON.stringify(userCartItem));
          card.remove()
          }
        }
      } else {
        alert("Hhmm! Something Went Wrong");
      }
    }
       });
    // }
    }
}
    // displayProducts()


    let currentUser = ()=>{
        let user = JSON.parse(localStorage.getItem("user"))
        let currentNewUser = JSON.parse(localStorage.getItem("currentNewUser"))
        let cnewUser = false
        if(currentNewUser){
            dashboardBtn.style.display = "flex"
            dashboardBtn.innerHTML= `
            ${currentNewUser[0].firstName}
            `
            // signOutbtn.style.display = "flex"
            loginbtn.style.display = "none"
            cnewUser = true
            for(i = 0 ; i < userCartItem.length ; i++){
                if(currentNewUser[0].username == userCartItem[i].username){
                    displayProducts()
                }
            }
        }
        if(cnewUser == false){
            if(user){
                dashboardBtn.style.display = "flex"
                dashboardBtn.innerHTML= `
                ${user.username}
                <img src="${user.image}" alt="">
                `
                // signOutbtn.style.display = "flex"
                loginbtn.style.display = "none"
                for(i = 0 ; i < userCartItem.length ; i++){
                    if(user.id == userCartItem[i].userid){
                        displayProducts()
                    }
                }
            }else{
                loginbtn.style.display = "flex"
            }
        }
    }
    currentUser()