let usersInfo  = []
let usersPost  = []
let found      = false
let getUsers = async () => {
    let apiResponse = await fetch("https://jsonplaceholder.typicode.com/users")
    if(!apiResponse.ok){
        console.log("bekaar Link he")
    }else{
        let usersData   = await apiResponse.json()
        return usersData
    }
}
let getUsersPost = async () =>{
    let apiResponse = await fetch("https://jsonplaceholder.typicode.com/posts")
    if(!apiResponse.ok){
        console.log("link me kuch masla he")
    }else{
        let usersData   = await apiResponse.json()
        return usersData
    }
}

let fetchUsers = async () =>{
    let users = await getUsers()
    if(users){
        for(i = 0 ; i < users.length ; i++){
            usersInfo.push(users[i])
        }
        cards()
    }
}
let fetchUsersPost = async () =>{
    let post = await getUsersPost()
    if(post){
        for(i = 0 ; i < post.length ; i++){
            usersPost.push(post[i])
        }
    }
}

fetchUsers().catch(()=>{
    console.log("User not Found")
})
fetchUsersPost().catch(()=>{
    console.log("User Post not Found")
})
console.log(usersInfo)
console.log(usersPost)



let fullName             = document.getElementById("name")
let userName             = document.getElementById("userName")
let companyName          = document.getElementById("companyName")
let email                = document.getElementById("email")
let website              = document.getElementById("website")
let phoneNumber          = document.getElementById("phone")
let zipCode              = document.getElementById("zipcode")
let street               = document.getElementById("street")
let suite                = document.getElementById("suite")
let city                 = document.getElementById("city")
let cardsContainer       = document.getElementById("cardsContainer")
let postCardsContainer   = document.getElementById("postCardsContainer")
let backBtnDiv           = document.getElementById("backBtn")
let backbutton           = document.getElementById("backbutton")
let femaleImage          = document.getElementById("fp")


let printUser = async () =>{
    let randomNumber = Math.floor(Math.random() * 10);
    setTimeout(()=>{
        for(i = 0 ; i <= usersInfo.length ; i++){
            let temp = usersInfo[i]
            fullName.innerText    = `${temp.name}`
            userName.innerText    = `${temp.username}`
            companyName.innerText = `${temp.company.name}`
            email.innerText       = `${temp.email}`
            website.innerText     = `${temp.website}`
            phoneNumber.innerText = `${temp.phone}`
            zipCode.innerText     = `${temp.address.zipcode}`
            street.innerText      = `${temp.address.street}`
            suite.innerText       = `${temp.address.suite}`
            city.innerText        = `${temp.address.city}`
            if(i == 2 || i == 3 || i == 5 || i == 8 || i == 9){
                document.getElementById("fp").setAttribute("src", "./Images/FemaleProfile.png")
            }else{
                document.getElementById("fp").setAttribute("src", "./Images/MaleProfile.png")
            }
            if(i == randomNumber){
                break;
            }
        }
    },1000)
}
function ifTrue (){
    if(found == false){
            printUser()    
    }
}

setInterval(()=>{
    ifTrue()
},10000)

let cards = async () => {
    cardsContainer.style.display = "flex"
    cardsContainer.innerHTML     = ""
    setTimeout(()=>{
        for(let i = 0 ; i < usersInfo.length ; i++){
            let temp = usersInfo[i]
            let cards = document.createElement("div")
            cards.className = "sameCards"
            cards.innerHTML = `
            <div><img src="./Images/MaleProfile.png" alt="" class="Setimage"></div>
            <div>                
                <p>Name : <span class="cname">${temp.name}</span></p>
                <p>Company Name : <span class="ccompanyName">${temp.company.name}</span></p>
                <p>Website : <span class="cwebsite">${temp.website}</span></p>
                <p>Phone : <span class="cphone">${temp.phone}</span></p>
                <div class = "additionalInfo">
                <p>UserName : <span class="cUserName">${temp.username}</span></p>
                <p>Email : <span class="cEmail">${temp.email}</span></p>
                <p>Adress : <span class="cAdress">${temp.address.street}</span></p>
                <p>Suite : <span class="cSuite">${temp.address.suite}</span></p>
                <p>City : <span class="cCity">${temp.address.city}</span></p>
                <p>Zipcode : <span class="cZipcode">${temp.address.zipcode}</span></p>
                </div>
            </div>
            `
            cardsContainer.append(cards)
            cards.addEventListener('click',showUserPost)
            if(i == 2 || i == 3 || i == 5 || i == 8 || i == 9){
                cards.style.backgroundColor = "#d3aab8"
                let image = cards.querySelector(".Setimage")
                image.setAttribute("src", "./Images/FemaleProfile.png")
            }
        }

    },1000)
}

let showUserPost = async (event) => {
    let fullname     = event.target.closest(".sameCards")
    let fn           = fullname.querySelector(".cUserName").innerText
    let foundUserId
    for(let i = 0 ; i < usersInfo.length ; i++){
        let temp = usersInfo[i]
        if(temp.username == fn){
            foundUserId = temp.id
            console.log("user ki post mil gae" , foundUserId)
            backBtnDiv.style.display = "flex"
            cardsContainer.style.display = "none"
            postCardsContainer.style.display = "flex"
            postCardsContainer.innerHTML = ""
            found = true
            fullName.innerText    = `${temp.name}`
            userName.innerText    = `${temp.username}`
            companyName.innerText = `${temp.company.name}`
            email.innerText       = `${temp.email}`
            website.innerText     = `${temp.website}`
            phoneNumber.innerText = `${temp.phone}`
            zipCode.innerText     = `${temp.address.zipcode}`
            street.innerText      = `${temp.address.street}`
            suite.innerText       = `${temp.address.suite}`
            city.innerText        = `${temp.address.city}`
            if (fullname.style.backgroundColor === "rgb(211, 170, 184)") { 
                document.getElementById("fp").setAttribute("src", "./Images/FemaleProfile.png")
            } else {
                document.getElementById("fp").setAttribute("src", "./Images/MaleProfile.png")
            }
            
        }
    }
    // if(found == true && fullName.style.backgroundColor == "#d3aab8"){
    //     femaleImage.setAttribute("src", "./Images/FemaleProfile.png")
    // }
        if(found == true){
            console.log("found true hogaya")
            setTimeout(()=>{
                for(let j = 0 ; j < usersPost.length ; j++){
                    let temp1 = usersPost[j]                 
                    if(foundUserId == temp1.userId){
                        let post = document.createElement("div")
                        post.className = "samePost"
                        post.innerHTML = `
                        <div>                
                            <p>TITLE : <span class="ptitle">${temp1.title}</span></p>
                            <p><span class="pbody">${temp1.body}</span></p>
                            <div class="btn">
                            <button>Like</button>
                            <button>Coments</button>
                            <button>Share</button>
                            </div>
                        </div>
                        `
                        postCardsContainer.append(post)
                    }
  
                }
        
            },1000)
        }

            
}

let backToUsers = async () => {
    found = false
    postCardsContainer.style.display = "none"
    cards()
    backBtnDiv.style.display = "none"
}
backbutton.addEventListener('click',backToUsers)