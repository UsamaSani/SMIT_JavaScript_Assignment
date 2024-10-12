const postsParentDiv = document.getElementById('posts');
let createPostForm = document.getElementById("create-post")
let editPostForm = document.getElementById("update-post")
const apiURL = 'https://67097283af1a3998baa18931.mockapi.io/crudOperation/api/POST/POST'



function fetchPosts() {
    fetch(apiURL)
        .then(response => response.json())
        .then( (data)=>{
            data.forEach(posts =>{
                displayData(posts)
            })
        })
        .catch(error => console.log('error', error))
}
fetchPosts();

function displayData(post) {
        // console.log(post)
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
                        <div class="post-header">
                            <img class="postAvatar" src="${post.avatar}" alt="Avatar">
                            <div>
                                <h3 class="postName">${post.name}</h3>
                                <small class="postCreateAt">${post.createdAt}</small>
                            </div>
                        </div>
                        <h3 class="postTitle">${post.title}</h3>
                        <p class="postBody">${post.body}</p>
                        <div class="actions">
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </div>
                        `
        postsParentDiv.prepend(postDiv)
        let editBtn = postDiv.querySelector(".edit-btn")
        let deleteBtn = postDiv.querySelector(".delete-btn")
        editBtn.addEventListener('click',(e)=>{
             editPost(post.id,e)
        } )
        deleteBtn.addEventListener('click',(e)=> deletePost(post.id,e))
}


// =======Create Post=============

document.getElementById("createPostForm").addEventListener('submit', function (e) {
    e.preventDefault()
    const name = document.getElementById('name').value
    const title = document.getElementById('title').value
    const avatar = document.getElementById('avatar').value
    const body = document.getElementById('body').value

    const newPost = {
        name: name,
        title: title,
        avatar: avatar,
        body: body,
        createdAt: new Date().toISOString()
    }
    // console.log(newPost)
    if(
         name == "" ||
         title == "" ||
         avatar == "" ||
         body == ""
    ){
        // alert("please fill the input fields")
    }else{
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => response.json())
            .then((data)=>{
                displayData(data)
                // console.log(data)
            } )
            .catch(error => console.log(error))

            document.getElementById('name').value = "" 
            document.getElementById('title').value = "" 
            document.getElementById('avatar').value= "" 
            document.getElementById('body').value= ""
    }
})


let deletePost = (id,e)=>{
    let deleteDiv = e.target.closest(".post")
    if(id == 1){
        alert("you cannot Delete this Post")
    }else{
        fetch(`https://67097283af1a3998baa18931.mockapi.io/crudOperation/api/POST/POST/${id}`, {
            method: 'DELETE',
          })
          .then(res => res.json())
          .then(deletedData => console.log(deletedData))
          .catch(error => console.log(error))
          deleteDiv.remove()
    }
}

let editPost = (id,e)=>{
    if(id == 1){
        alert("you cannot edit this post")
    }else{
        createPostForm.style.display ="none"
        editPostForm.style.display="block"
        let editPost = e.target.closest(".post")
        let postAvatar = editPost.querySelector(".postAvatar")
        let postName = editPost.querySelector(".postName")
        let postTitle = editPost.querySelector(".postTitle")
        let postBody = editPost.querySelector(".postBody")
        let postCreateAt = editPost.querySelector(".postCreateAt")
    
        document.getElementById('editname').value = `${postName.innerText}`
        document.getElementById('edittitle').value = `${postTitle.innerText}`
        document.getElementById('editavatar').value = `${postAvatar.getAttribute("src")}`
        document.getElementById('editbody').value = `${postBody.innerText}`
        let editname = document.getElementById('editname')
        let edittitle = document.getElementById('edittitle')
        let editavatar= document.getElementById('editavatar')
        let editbody = document.getElementById('editbody')
    
    
    
        document.getElementById("updatePostForm").addEventListener('submit', function (e) {
            e.preventDefault()
            if(
                editname.value == ""||
                edittitle.value == ""||
                editavatar.value == ""||
                editbody.value == ""
            ){
                // alert("please fill the input fields")
            }else{
                console.log(id)                
                    fetch(`https://67097283af1a3998baa18931.mockapi.io/crudOperation/api/POST/POST/${id}`, {
                        method: 'PUT', 
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                        name: `${editname.value}`,
                        title:`${edittitle.value}`,
                        avatar:`${editavatar.value}`,
                        body:`${editbody.value}`,
                        createdAt: new Date().toISOString()
                        })
                      })
                      .then(res => res.json())
                      .then(data => console.log(data))
                      .catch(error => console.log(error))
            
                      postAvatar.setAttribute(`src`,`${editavatar.value}`)
                      postName.innerText = `${editname.value}`
                      postTitle.innerText = `${edittitle.value}`
                      postBody.innerText = `${editbody.value}`
                      postCreateAt.innerText = `${new Date().toISOString()}`
                      editavatar.value = ""
                      editname.value = ""
                      edittitle.value = ""
                      editbody.value = ""
                      editPostForm.style.display="none"
                      createPostForm.style.display ="block"
            }
        })
    }
    // console.log(`
    //     ${id}
    //     this is Post Avatar : ${postAvatar.getAttribute("src")}
    //     this is User Name   : ${postName.innerText}
    //     this is post Title   : ${postTitle.innerText}
    //     this is post Body   : ${postBody.innerText}
    //     `)
}