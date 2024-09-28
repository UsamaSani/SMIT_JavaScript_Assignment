let loginbtn = document.getElementById("loginbtn")
let homebtn = document.getElementById("home")
let cartbtn = document.getElementById("cart")
let contactbtn = document.getElementById("contact")
let aboutbtn = document.getElementById("about")
let loginUserBtn = document.getElementById("loginUserBtn")
let contactsection = document.getElementById("contact-section")
let aboutsection = document.getElementById("about-section")
homebtn.addEventListener('click',()=>{
    window.location.href = './index.html'
})
cartbtn.addEventListener('click',()=>{
    window.location.href = './cart.html'
})
loginbtn.addEventListener('click',()=>{
    window.location.href = './login.html'
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
let loginUser = async()=>{
    let username     = document.getElementById('username').value;
    let password     = document.getElementById('password').value;
    let loginWarning = document.getElementById('loginWarning');
    if(username == "" || password == ""){
        loginWarning.innerText = "Input Field Cannot be Empty"
}else{
    loginWarning.innerText = ""
    try {
        const userLoginResponse = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const userLoginData = await userLoginResponse.json();
        if(userLoginResponse.ok){
            localStorage.setItem("user", JSON.stringify(userLoginData));
            window.location.href = './index.html'
        }else{
            loginWarning.innerText = "Incorrect Credentials"
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

}
loginUserBtn.addEventListener('click',loginUser)