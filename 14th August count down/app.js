let dy = document.getElementById("dy").getElementsByTagName("span")[0];
let hr = document.getElementById("hr").getElementsByTagName("span")[0];
let mint = document.getElementById("mint").getElementsByTagName("span")[0];
let sec = document.getElementById("sec").getElementsByTagName("span")[0];
let targetDate = new Date('August 14, 2024 00:00:00').getTime();

let countdown = setInterval(function() {

    let now = new Date().getTime();

    let timeLeft = targetDate - now;

    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    dy.innerHTML = days;
    hr.innerHTML = hours;
    mint.innerHTML = minutes;
    sec.innerHTML = seconds;

    if (timeLeft < 0) {
        clearInterval(countdown);
        dy.innerHTML = "00";
        hr.innerHTML = "00";
        mint.innerHTML = "00";
        sec.innerHTML = "00";
        alert("Happy Independence Day, Pakistan!");
    }
}, 1000);