let allProductsContainer = document.getElementById("allProducts")
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
let filterBtn = document.getElementById("filterBtn")
let category = document.getElementById("category")
let arrcart = [];
let userCartItem = [];

function populateUserCartItem() {
  let xtemp = JSON.parse(localStorage.getItem("userCart"));
  if (xtemp) {
    for (i = 0; i < xtemp.length; i++) {
      userCartItem.push(xtemp[i]);
    }
  }
}
populateUserCartItem();
homebtn.addEventListener("click", () => {
  location.href = "./index.html";
});
cartbtn.addEventListener("click", () => {
  location.href = "./cart.html";
});
contactbtn.addEventListener("click", () => {
  contactsection.scrollIntoView({
    behavior: "smooth",
  });
});
aboutbtn.addEventListener("click", () => {
  aboutsection.scrollIntoView({
    behavior: "smooth",
  });
});
loginbtn.addEventListener("click", () => {
  window.location.href = "./login.html";
});

let currentUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let newUser = JSON.parse(localStorage.getItem("newUser"));
  let matchUser = JSON.parse(localStorage.getItem("matchUser"));
  let newUserisFound = false;
  if (newUser) {
    for (i = 0; i < newUser.length; i++) {
      if (matchUser) {
        if (
          matchUser[0] == newUser[i].username &&
          matchUser[1] == newUser[i].password
        ) {
          let currentNewUser = [];
          currentNewUser.push(newUser[i]);
          localStorage.removeItem("currentNewUser");
          localStorage.setItem(
            "currentNewUser",
            JSON.stringify(currentNewUser)
          );
          dashboardBtn.innerHTML = `
                      ${newUser[i].firstName}
                      `;
          dashboardBtn.style.display = "flex";
          loginbtn.style.display = "none";
          newUserisFound = true;
          break;
        }
      } else {
        break;
      }
    }
  }
  if (newUserisFound == false) {
    if (user) {
      dashboardBtn.innerHTML = `
            ${user.username}
            <img src="${user.image}" alt="">
            `;
      dashboardBtn.style.display = "flex";
      loginbtn.style.display = "none";
    }
  }
};
currentUser();
dashboardBtn.addEventListener("click", () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let cnewUser = JSON.parse(localStorage.getItem("currentNewUser"));
  let cnewUserIsFound = false;
  if (cnewUser) {
    window.location.href = "./dashboard.html";
    cnewUserIsFound = true;
  }
  if (cnewUserIsFound == false) {
    if (user) {
      window.location.href = "./dashboard.html";
    }
  }
});

let displayProducts = (product) => {
  let productCard = document.createElement("div");
  let odd;
  productCard.className = "card";
  if (i % 2 == 1) {
    odd = "odd";
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
                    <strong>Stock: <span class="itemStock">${product[i].stock}</span></strong>
                </div>
                <div class="btn"><button class="purchasebtn">Purchase</button><button class="cartbtn">Cart</button> <span class="ItemWarning"></span></div>
            </div>
    `;
  allProductsContainer.append(productCard);

  let cartbutton = productCard.querySelector(".cartbtn");
  let ItemWarning = productCard.querySelector(".ItemWarning");
  let itemPurchasebtn = productCard.querySelector(".purchasebtn")
  let userCartMatch = false;
  let userCartMatch1 = false;
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
  cartbutton.addEventListener("click", (event) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let curtNewUser = JSON.parse(localStorage.getItem("currentNewUser"));
    let cUserNew = false;
    if (curtNewUser) {
      let card = event.target.closest(".card");
      let titleValue = card.querySelector(".ph").innerText;
      let descriptionValue = card.querySelector(".pp").innerText;
      for (i = 0; i < arrcart.length; i++) {
        // console.log(arrcart[i].title)
        if (
          titleValue.toLowerCase().trim() ==
            arrcart[i].title.toLowerCase().trim() &&
          descriptionValue.toLowerCase().trim() ==
            arrcart[i].description.toLowerCase().trim()
        ) {
          for (j = 0; j < userCartItem.length; j++) {
            if (userCartItem[j].username) {
              if (curtNewUser[0].username == userCartItem[j].username) {
                if(
                  titleValue.toLowerCase().trim() ==
                  userCartItem[j].title.toLowerCase().trim() &&
                descriptionValue.toLowerCase().trim() ==
                  userCartItem[j].description.toLowerCase().trim()
                ){
                  ItemWarning.innerText = "This Product is already Added!";
                  userCartMatch = true;
                  setTimeout(() => {
                    ItemWarning.innerText = "";
                  }, 2000);
                  break
                }
              }
            }
          }
          if (userCartMatch == false) {
            ItemWarning.innerText = "Product Successfully Added!";
            setTimeout(() => {
              ItemWarning.innerText = "";
            }, 2000);
            let ytemp = Object.assign(arrcart[i], {
              username: curtNewUser[0].username,
            });
            userCartItem.push(ytemp);
            // localStorage.removeItem("userCart")
            localStorage.setItem("userCart", JSON.stringify(userCartItem));
            break;
          }
        }
      }
      cUserNew = true;
    }
    if (cUserNew == false) {
      if (user) {
        let card = event.target.closest(".card");
        let titleValue = card.querySelector(".ph").innerText;
        let descriptionValue = card.querySelector(".pp").innerText;
        for (i = 0; i < arrcart.length; i++) {
          // console.log(arrcart[i].title)
          if (
            titleValue.toLowerCase().trim() ==
              arrcart[i].title.toLowerCase().trim() &&
            descriptionValue.toLowerCase().trim() ==
              arrcart[i].description.toLowerCase().trim()
          ) {
            for (j = 0; j < userCartItem.length; j++) {
              if (userCartItem[j].userid) {
                if (user.id == userCartItem[j].userid) {
                  if(
                    titleValue.toLowerCase().trim() ==
                    userCartItem[j].title.toLowerCase().trim() &&
                  descriptionValue.toLowerCase().trim() ==
                    userCartItem[j].description.toLowerCase().trim()
                  ){
                    ItemWarning.innerText = "This Product is already Added!";
                    setTimeout(() => {
                      ItemWarning.innerText = "";
                    }, 2000);
                    userCartMatch1 = true;
                    break;
                  }
                }
              }
            }
            if (userCartMatch1 == false) {
              ItemWarning.innerText = "Product Successfully Added!";
              setTimeout(() => {
                ItemWarning.innerText = "";
              }, 2000);
              let ztemp = Object.assign(arrcart[i], { userid: user.id });
              userCartItem.push(ztemp);
              // localStorage.removeItem("userCart")
              localStorage.setItem("userCart", JSON.stringify(userCartItem));
              break;
            }
          }
        }
      } else {
        alert("Login To add items in card");
      }
    }
  })
}

let getProduct = async () => {
  try {
    const porductResponse = await fetch(
      "https://dummyjson.com/products?limit=50"
    )
    if (!porductResponse.ok) {
      throw new Error(`link bekaar he: ${porductResponse.status}`)
    } else {
      // console.log(porductResponse)
      const productData = await porductResponse.json();
      // console.log('Achi link he:', productData)
      return productData;
    }
  } catch (error) {
    console.error(
      "Shyd apka net masla ker raha he. ya phir ye:",
      error.message
    )
  }
}
let displayallProducts = () => {
  // getProduct()
  setTimeout(() => {
    getProduct().then((productData) => {
      let product = productData.products;
      if (product) {
        for (i = 0; i < product.length; i++) {
          displayProducts(product);
          arrcart.push(product[i]);
        }
      }
    });
  }, 1000);
}

displayallProducts()

let apiSearchProduct = async (url) => {
  try {
    const searchPorductResponse = await fetch(url);
    if (!searchPorductResponse.ok) {
      throw new Error(`link bekaar he: ${searchPorductResponse.status}`);
    } else {
      // console.log(porductResponse)
      const sproductData = await searchPorductResponse.json();
      // console.log('Achi link he:', productData)
      return sproductData;
    }
  } catch (error) {
    console.error("Shyd apka net masla ker raha he. ya phir ye:",error.message)
  }
};
let searchProduct = () => {
  allProductsContainer.innerHTML = ""
  let url = `https://dummyjson.com/products/search?q=${searchInput.value}`;
  apiSearchProduct(url).then((sproductData) => {
    let sp = sproductData.products;
    for (i = 0; i < sp.length; i++) {
      displayProducts(sp)
      arrcart.push(sp[i])
    }
  })
}
searchbtn.addEventListener("click", searchProduct);


let apiCategoryProduct = async (url) => {
  try {
    const PorductCategoriesResponse = await fetch(url);
    if (!PorductCategoriesResponse.ok) {
      throw new Error(`link bekaar he: ${PorductCategoriesResponse.status}`);
    } else {
      // console.log(porductResponse)
      const cproductData = await PorductCategoriesResponse.json();
      // console.log('Achi link he:', productData)
      return cproductData;
    }
  } catch (error) {
    console.error("Shyd apka net masla ker raha he. ya phir ye:",error.message)
  }
};
let productCategories = (categoryName) => {
  allProductsContainer.innerHTML = ""
  let url = `https://dummyjson.com/products/category/${categoryName}`;
  apiSearchProduct(url).then((cproductData) => {
    let cp = cproductData.products;
    for (i = 0; i < cp.length; i++) {
      displayProducts(cp)
      arrcart.push(cp[i])
    }
  })
}



filterBtn.addEventListener('click',()=>{
  if(category.style.display == "none"){
    category.style.display = "flex"
  }else{
    category.style.display = "none"
  }
})
let getCategoryOfProducts = async()=>{
  try {
    const categoryResponse = await fetch(
      "https://dummyjson.com/products/category-list"
    )
    if (!categoryResponse.ok) {
      throw new Error(`link bekaar he: ${categoryResponse.status}`)
    } else {
      // console.log(porductResponse)
      const categoryName = await categoryResponse.json();
      // console.log('Achi link he:', productData)
      return categoryName
    }
  } catch (error) {
    console.error("Shyd apka net masla ker raha he. ya phir ye:",error.message)
  }
}
let displayCategoryOfProducts = () => {
  // setTimeout(() => {
    getCategoryOfProducts().then((categoryName) => {
      let cN = categoryName
      if (cN) {
        for (i = 0; i < cN.length; i++) {
          // displayProducts(product)
          // arrcart.push(product[i])
          let cas = document.createElement("div")
          cas.className = "cas"
          cas.innerHTML = `
          <a class = "categoryBtn">${cN[i]}</a>
          `
          category.append(cas)
          let categoryBtn = cas.querySelector(".categoryBtn")
          categoryBtn.addEventListener('click',(event)=>{
            let cnBtnc = event.target.closest(".cas")
            let cnBtn = cnBtnc.querySelector('.categoryBtn')
            productCategories(cnBtn.innerText) 
            console.log(cnBtn.innerText)
          })

        }
      }
    })
  // }, 1000)
}
displayCategoryOfProducts()