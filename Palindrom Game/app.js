let inputtext = document.querySelector(".inpt");
let checkbtn = document.querySelector(".btn");
let result = document.querySelector(".result");
let filterinput;

inputtext.addEventListener('input', () => {
    filterinput = inputtext.value.toLowerCase().replace(/[^a-z0-9]/ig, "");
    if (filterinput) {
        checkbtn.classList.add("active");
    } else {
        checkbtn.classList.remove("active");
        result.style.display = "none";
    }
});

checkbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let reverseinput = filterinput.split("").reverse().join("");
    result.style.display = "block";
    if (filterinput != reverseinput) {
        result.innerHTML = `No, <span>'${inputtext.value}'</span> isn't a palindrome!`;
    } else {
        result.innerHTML = `Yes, <span>'${inputtext.value}'</span> is a palindrome!`;
    }
    inputtext.value = "";
    checkbtn.classList.remove("active");
});
