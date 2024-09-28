let allProductsContainer = document.getElementById("allProducts")
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
let arrcart = []
let userCartItem = []
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
aboutbtn.addEventListener('click',()=>{
    aboutsection.scrollIntoView({
        behavior: 'smooth'
    });
})
loginbtn.addEventListener('click',()=>{
    window.location.href = './login.html';
})

let currentUser = ()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if(user){
        signOutbtn.innerHTML= `
        ${user.username}
        <img src="${user.image}" alt="">
        `
        signOutbtn.style.display = "flex"
        loginbtn.style.display = "none"
    }
}
currentUser()
signOutbtn.addEventListener('click',()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if(user){
        loginbtn.style.display = "flex"
        localStorage.removeItem("user");
        window.location.reload();
    }

})

let displayProducts = (product)=>{
    let productCard = document.createElement("div")
    let odd
    productCard.className = "card"
    if(i%2==1){
        odd = "odd"
    }
    productCard.innerHTML = `
                <div class="pimg ${odd}"><img src="${product[i].images[0]}" alt=""></div>
            <div class="pabout">
                <h1 class="ph">${product[i].title}</h1>
                <p class="pp">${product[i].description}</p>
                <div class="price">
                <strong>Category: <span>${product[i].category}</span></strong>
                    <strong>Price: <span>${product[i].price}$</span></strong>
                    <strong>Discounted Price: <span>${product[i].discountPercentage}$</span></strong>
                    <strong>Rating: <span>${product[i].rating}</span></strong>
                    <strong>Stock: <span>${product[i].stock}</span></strong>
                </div>
                <div class="btn"><button class="purchasebtn">Purchase</button><button class="cartbtn">Cart</button></div>
            </div>
    `
    allProductsContainer.append(productCard)
    
    let cartbutton = productCard.querySelector(".cartbtn")
    cartbutton.addEventListener('click',(event)=>{
        let user = JSON.parse(localStorage.getItem("user"))
        if(user){
            let card = event.target.closest(".card")
            let titleValue = card.querySelector(".ph").innerText
        let descriptionValue = card.querySelector(".pp").innerText
        for(i =0;i<arrcart.length ;i++){
            // console.log(arrcart[i].title)
            if(
            titleValue.toLowerCase().trim() == arrcart[i].title.toLowerCase().trim() &&
            descriptionValue.toLowerCase().trim() == arrcart[i].description.toLowerCase().trim()
        ){
            localStorage.removeItem("userCart");
            userCartItem.push(arrcart[i])
            localStorage.setItem("userCart",JSON.stringify(userCartItem) );
        }
    }
}else{
    alert("Login To add items in card")
}
})
}

let getProduct = async () => {
    try {
        const porductResponse = await fetch("https://dummyjson.com/products?limit=50")
        if (!porductResponse.ok) {
            throw new Error(`link bekaar he: ${porductResponse.status}`)
        }else{
            // console.log(porductResponse)
            const productData = await porductResponse.json()
            // console.log('Achi link he:', productData)
            return productData
        }
    } catch (error) {
        console.error('Shyd apka net masla ker raha he. ya phir ye:', error.message);
    }
}
let displayallProducts = ()=>{
    getProduct()
    setTimeout(()=>{
        getProduct().then ((productData)=>{
            let product = productData.products
            if(product){
                for(i = 0 ; i < product.length ; i++){
                    displayProducts(product)
                    arrcart.push(product[i])
                }
            }
        })
    },1000)
    
}
displayallProducts()
// all.addEventListener('click',displayallProducts)
// let getUsers = async () => {
//     try {
//         const porductResponse = await fetch("https://dummyjson.com/products")
//         if (!porductResponse.ok) {
//             throw new Error(`link bekaar he: ${porductResponse.status}`)
//         }else{
//             // console.log(porductResponse)
//             const productData = await porductResponse.json()
//             console.log('Achi link he:', productData)
//             return productData
//         }
//     } catch (error) {
//         console.error('Shyd apka net masla ker raha he. ya phir ye:', error.message);
//     }
// }

let apiSearchProduct = async (url) => {
    try {
        const searchPorductResponse = await fetch(url)
        if (!searchPorductResponse.ok) {
            throw new Error(`link bekaar he: ${searchPorductResponse.status}`)
        }else{
            // console.log(porductResponse)
            const sproductData = await searchPorductResponse.json()
            // console.log('Achi link he:', productData)
            return sproductData
        }
    } catch (error) {
        console.error('Shyd apka net masla ker raha he. ya phir ye:', error.message);
    }
}
let searchProduct = ()=>{
    allProductsContainer.innerHTML = ""
    let url = `https://dummyjson.com/products/search?q=${searchInput.value}`
    apiSearchProduct(url).then((sproductData)=>{
        let sp = sproductData.products
        for(i = 0; i<sp.length;i++){
            displayProducts(sp)
            arrcart.push(sp[i])
        }
    })
}
searchbtn.addEventListener('click',searchProduct)