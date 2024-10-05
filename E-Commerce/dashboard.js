let loginbtn = document.getElementById("loginbtn")
let signOutBtn = document.getElementById("signOutBtn")
let dashboardBtn = document.getElementById("dashboardBtn")
let homebtn = document.getElementById("home")
let cartbtn = document.getElementById("cart")
let contactbtn = document.getElementById("contact")
let aboutbtn = document.getElementById("about")
let contactsection = document.getElementById("contact-section")
let aboutsection = document.getElementById("about-section")
let firstCharater = document.getElementById("firstCharacter")
let fullName = document.getElementById("fullName")
let userName = document.getElementById("userName")
let userEmail = document.getElementById("userEmail")
let userId = document.getElementById("userId")
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let userGender = document.getElementById("userGender")
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
    window.location.href = './login.html'
})
signOutBtn.addEventListener('click',()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    let currentNewUser = JSON.parse(localStorage.getItem("currentNewUser"))
    let cnewUserIsFound =  false
    if(currentNewUser){
        loginbtn.style.display = "flex"
        localStorage.removeItem("currentNewUser");
        // localStorage.removeItem("userCart")
        localStorage.removeItem("matchUser")
        window.location.href = './login.html'
        cnewUserIsFound = true
    }
    if(cnewUserIsFound ==  false){
        if(user){
            loginbtn.style.display = "flex"
            localStorage.removeItem("user");
            // localStorage.removeItem("userCart")
            window.location.href = './login.html'
        }
    }

})
let currentUser = ()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    let currentNewUser = JSON.parse(localStorage.getItem("currentNewUser"))
    let cnewUserIsFound =  false
    if(currentNewUser){
        let userFirstChar = currentNewUser[0].firstName.charAt(0).toUpperCase()
        firstCharater.innerText = userFirstChar
        userName.innerText = currentNewUser[0].username
        userEmail.innerText = currentNewUser[0].email
        fullName.innerText = `${currentNewUser[0].firstName} ${currentNewUser[0].lastName}`
        userId.innerText = currentNewUser[0].id
        firstName.innerText = currentNewUser[0].firstName
        lastName.innerText = currentNewUser[0].lastName
        userGender.innerText = currentNewUser[0].gender
        dashboardBtn.style.display = "flex"
        dashboardBtn.innerHTML= `
        ${currentNewUser[0].firstName}
        `
        dashboardBtn.style.display = "flex"
        loginbtn.style.display = "none"
        cnewUserIsFound = true
    }
    if(cnewUserIsFound == false){
    if(user){
        let userFirstChar = user.firstName.charAt(0).toUpperCase()
        firstCharater.innerText = userFirstChar
        userName.innerText = user.username
        userEmail.innerText = user.email
        fullName.innerText = `${user.firstName} ${user.lastName}`
        userId.innerText = user.id
        firstName.innerText = user.firstName
        lastName.innerText = user.lastName
        userGender.innerText = user.gender
        dashboardBtn.style.display = "flex"
        dashboardBtn.innerHTML= `
        ${user.username}
        <img src="${user.image}" alt="">
        `
        dashboardBtn.style.display = "flex"
        loginbtn.style.display = "none"
    }else{
        loginbtn.style.display = "flex"
    }
}
}
currentUser()