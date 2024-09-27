let allProductsContainer = document.getElementById("allProducts")
let searchInput = document.getElementById("search")
let searchbtn = document.getElementById("searchbtn")

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
                <div class="btn"><button>Purchase</button><button>Cart</button></div>
            </div>
    `
    allProductsContainer.append(productCard)
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
        }
    })
}
searchbtn.addEventListener('click',searchProduct)