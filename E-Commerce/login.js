let loginbtn = document.getElementById("loginbtn")
let homebtn = document.getElementById("home")
let cartbtn = document.getElementById("cart")
let contactbtn = document.getElementById("contact")
let aboutbtn = document.getElementById("about")
let loginUserBtn = document.getElementById("loginUserBtn")
let contactsection = document.getElementById("contact-section")
let aboutsection = document.getElementById("about-section")
let registerbtn = document.getElementById("register")
let registerationForm = document.getElementById("registerationForm")
let loginForm = document.getElementById("loginForm")
let rloginbtn = document.getElementById("rlogin")
let rUserName = document.getElementById("rUserName")
let rFirstName = document.getElementById("rFirstName")
let rLastName = document.getElementById("rLastName")
let rUserGender = document.getElementById("rUserGender")
let rUserEmail = document.getElementById("rUserEmail")
let rPassword = document.getElementById("rPassword")
let rConfirmPassword = document.getElementById("rConfirmPassword")
let RegisterWarning = document.getElementById("RegisterWarning")
let registerUserBtn = document.getElementById("registerUserBtn")
let rUserAge = document.getElementById("rUserAge")
let newUser = []
const UserFirstAndLastnameRegex = /^[a-zA-Z\s]{1,20}$/
const UsernameRegex = /^.{1,20}$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const ageRegex = /^\d+$/
let firstNameField = false
let lastNameField = false
let emailField = false
let genderField = false
let userNameField = false
let passwordField = false
let confirmPasswordField = false
let ageField = false
function rePopulateNewUser(){
    let tempU = JSON.parse(localStorage.getItem("newUser"))
    if(tempU){
        for(i = 0 ; i < tempU.length ; i++){
            newUser.push(tempU[i])
        }
    }
}
rePopulateNewUser()
rloginbtn.addEventListener('click',()=>{
    registerationForm.style.display = "none"
    loginForm.style.display = "flex"
})
registerbtn.addEventListener('click',()=>{
    loginForm.style.display = "none"
    registerationForm.style.display = "flex"
})
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
    let newUserisFound = false
    let username     = document.getElementById('username').value;
    let password     = document.getElementById('password').value;
    let loginWarning = document.getElementById('loginWarning');
    if(username == "" || password == ""){
        loginWarning.innerText = "Input Field Cannot be Empty"
}else{
    loginWarning.innerText = ""
    try {
        if(newUser.length >= 0){
            for(i = 0 ; i < newUser.length ; i++){
                if(username == newUser[i].username && password == newUser[i].password){
                    let matchUser    = []
                    matchUser.push(username)
                    matchUser.push(password)
                    localStorage.removeItem("matchUser")
                    localStorage.setItem("matchUser",JSON.stringify(matchUser))
                    newUserisFound = true
                    window.location.href = './index.html'
                    break
                }
            }
        }
        if(newUserisFound == false){
            const userLoginResponse = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            const userLoginData = await userLoginResponse.json()
            if(userLoginResponse.ok){
                localStorage.setItem("user", JSON.stringify(userLoginData))
                window.location.href = './index.html'
            }else{
                loginWarning.innerText = "Incorrect Credentials"
            }
        }


    } catch (error) {
        console.error('Error:', error);
    }
}

}
loginUserBtn.addEventListener('click',loginUser)

rFirstName.addEventListener('keyup',()=>{
    let ufn = rFirstName.value
    if(UserFirstAndLastnameRegex.test(ufn)){
        RegisterWarning.innerText=""
        firstNameField = true
    }else{
        firstNameField = false
        RegisterWarning.innerText="Don't use special Characters or Numbers in your name and Name Cannot be more than 20 Alphabets"
    }
})
rLastName.addEventListener('keyup',()=>{
    let uln = rLastName.value
    if(UserFirstAndLastnameRegex.test(uln)){
        RegisterWarning.innerText=""
        lastNameField = true
    }else{
        lastNameField = false
        RegisterWarning.innerText="Don't use special Characters or Numbers in your name and Name Cannot be more than 20 Alphabets"
    }
})

rUserName.addEventListener('keyup',()=>{
    let efound = false
    let newUserObj  = JSON.parse(localStorage.getItem("newUser")) 
    let run = rUserName.value
    if(UsernameRegex.test(run)){
        if (!(newUserObj==null)) {
        for(i=0 ; i < newUserObj.length ;i++){
            if (!(newUserObj[i]==null)) {
            if(run == newUserObj[i].username){
                RegisterWarning.innerText = "This username is Already Exist"
                efound = true
                break
            }
        }
        }
    }
        if(efound == false){
        userNameField = true
        RegisterWarning.innerText = ""
        }
    }else{
        userNameField = false
        RegisterWarning.innerText = "UserName Cannot be more than 20 Character"
    }
})
rUserGender.addEventListener('keyup',()=>{
    let ug = rUserGender.value
    if(ug.toLowerCase().trim() == "female" || ug.toLowerCase().trim() == "male"){
        RegisterWarning.innerText = ""
        genderField = true
    }else{
        genderField = false
        RegisterWarning.innerText = "Gender can Only be Male or Female"
    }
})
rUserEmail.addEventListener('keyup',()=>{
    let efound = false
    let newUserObj = JSON.parse(localStorage.getItem("newUser"))
    let ue = rUserEmail.value
    if(emailRegex.test(ue)){
        if (!(newUserObj==null)) {
        for(i=0 ; i < newUserObj.length ;i++){
            if (!(newUserObj[i]==null)) {
            if(ue == newUserObj[i].email){
                RegisterWarning.innerText = "This Email is Already Exist"
                efound = true
                break
            }
        }
        }
    }
        if(efound == false){
            RegisterWarning.innerText = ""
            emailField = true
        }
        
    }else{
        emailField = false
        RegisterWarning.innerText = "This Email is not Valid"
    }
})
rUserAge.addEventListener('keyup',()=>{
    let ua = rUserAge.value
    if(ageRegex.test(ua)){
        if(Number(ua)>17 && Number(ua) < 101){
            RegisterWarning.innerText = ""
            ageField = true
        }else{
            RegisterWarning.innerText = "Under 18 Cannot Register!"
        }
    }else{
        ageField = false
        RegisterWarning.innerText = "Enter only Number!"
    }
})
rPassword.addEventListener('keyup',()=>{
    let up = rPassword.value
    if(passwordRegex.test(up)){
        RegisterWarning.innerText = ""
        passwordField = true
    }else{
        passwordField = false
        RegisterWarning.innerText = "Your password must be at least 8 characters long and include a special character, a number, and an uppercase letter"
    }
})

rConfirmPassword.addEventListener('keyup',()=>{
    if(rPassword.value == ""){
        RegisterWarning.innerText = "Fill New Password field Correctly"
    }else{
        if(rPassword.value == rConfirmPassword.value){
            RegisterWarning.innerText = ""
            confirmPasswordField = true
        }else{
            confirmPasswordField = false
            RegisterWarning.innerText = "Password Didnot Match!"
        }
    }
})



let RegisterNewUser = async ()=>{
    let ucp = rConfirmPassword.value
    let up = rPassword.value
    let ue = rUserEmail.value
    let ug = rUserGender.value
    let run = rUserName.value
    let uln = rLastName.value
    let ufn = rFirstName.value
    let ua = rUserAge.value
    if(
        ucp == ""  ||
        up  == ""  ||
        ue  == ""  ||
        ug  == ""  ||
        run == ""  ||
        uln == ""  ||
        ufn == ""  ||
        ua  == ""
    ){
        RegisterWarning.innerText = "Input Field Cannot be Empty!"
    }else{
        if(
        firstNameField       == false ||
        lastNameField        == false ||
        emailField           == false ||
        genderField          == false ||
        userNameField        == false ||
        passwordField        == false ||
        confirmPasswordField == false ||
        ageField             == false
        ){
            RegisterWarning.innerText = "Please fill Information Field Correctly"
            if(firstNameField == false){
                rFirstName.style.borderBottom = "1px solid  red"
            }
            if(lastNameField == false){
                rLastName.style.borderBottom = "1px solid  red"
            }
            if(emailField == false ){
                rUserEmail.style.borderBottom = "1px  solid red"
            }
            if(genderField == false){
                rUserGender.style.borderBottom = "1px solid  red"
            }
            if(userNameField == false){
                rUserName.style.borderBottom = "1px  solid red"
            }
            if(passwordField  == false){
                rPassword.style.borderBottom = "1px solid  red"
            }
            if(confirmPasswordField == false){
                rConfirmPassword.style.borderBottom = "1px solid red"
            }
            if(ageField == false){
                rUserAge.style.borderBottom = " 1px solid red"
            }
        }else{
            try {
                if(!(newUser.length == 0)){
                    console.log(newUser)
                    idCount = (newUser[newUser.length-1].id)+ 1
                    console.log(idCount)
                }
                const userRegisterResponse = await fetch('https://dummyjson.com/users/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      firstName: ufn,
                      lastName: uln,
                      age: ua,
                      email:ue,
                      password: ucp,
                      username: run,
                      gender: ug
                    }),
                  })
                const userRegisterData = await  userRegisterResponse.json()
                if(userRegisterResponse.ok){
                rConfirmPassword.value = ""
                rPassword.value = ""
                rUserEmail.value = ""
                rUserGender.value = ""
                rUserName.value = ""
                rLastName.value = ""
                rFirstName.value = ""
                rUserAge.value = ""
                    localStorage.removeItem("newUser")
                    newUser.push(userRegisterData)
                    localStorage.setItem("newUser", JSON.stringify(newUser))
                    console.log(newUser)
                    RegisterWarning.innerText = "User Registered Successfully"
                    setTimeout(()=>{
                        window.location.href = './login.html'
                    },2000)
                }else{
                    RegisterWarning.innerText = "Hmm! Something Went Wrong try Again"
                }
            } catch (error) {
                console.log("Error for Registering ",error)
            }
        }
    }
}
registerUserBtn.addEventListener('click',RegisterNewUser)