const currentDate = new Date();
const currentTime = currentDate.toLocaleTimeString();
document.getElementById("time").innerHTML = currentTime;

const sevenbtn = document.getElementById('seven');
sevenbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += sevenbtn.textContent;
});
const eightbtn = document.getElementById('eight');
eightbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += eightbtn.textContent;
});
const ninebtn = document.getElementById('nine');
ninebtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += ninebtn.textContent;
});
const fourbtn = document.getElementById('four');
fourbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += fourbtn.textContent;
});
const fivebtn = document.getElementById('five');
fivebtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += fivebtn.textContent;
});
const sixbtn = document.getElementById('six');
sixbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += sixbtn.textContent;
});
const onebtn = document.getElementById('one');
onebtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += onebtn.textContent;
});
const twobtn = document.getElementById('two');
twobtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += twobtn.textContent;
});
const threebtn = document.getElementById('three');
threebtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += threebtn.textContent;
});
const zerobtn = document.getElementById('zero');
zerobtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += zerobtn.textContent;
});
const modulusbtn = document.getElementById('modulus');
modulusbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += modulusbtn.textContent;
});
const dividebtn = document.getElementById('divide');
dividebtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += dividebtn.textContent;
});
const multiplybtn = document.getElementById('multiply');
multiplybtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += multiplybtn.textContent;
});
const minusbtn = document.getElementById('minus');
minusbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += minusbtn.textContent;
});
const plusbtn = document.getElementById('plus');
plusbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += plusbtn.textContent;
});
const rbracketbtn = document.getElementById('right-bracket');
rbracketbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += rbracketbtn.textContent;
});
const lbracketbtn = document.getElementById('left-bracket');
lbracketbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML += lbracketbtn.textContent;
});
const clearbtn = document.getElementById('clear');
clearbtn.addEventListener('click', () => {
    const currentText = document.getElementById("opt").innerHTML;
    if (currentText.length > 0) {
        document.getElementById("opt").innerHTML = currentText.slice(0, -1);
    }
});
const resetbtn = document.getElementById('reset');
resetbtn.addEventListener('click', () => {
    document.getElementById("opt").innerHTML = '';
    document.getElementById("result").innerHTML = '';
});
const resultbtn = document.getElementById('equal');
resultbtn.addEventListener('click', () => {
    try {
     const result = eval( document.getElementById("opt").innerHTML)
     document.getElementById("result").innerHTML = result; 
    } catch(error){
        document.getElementById("result").innerHTML = "SyntaxError"; 
    }
});

let themeToggle = document.querySelector('.theme');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    let moonIcon = document.querySelector('.moon');
    let sunIcon = document.querySelector('.sun');
    if (document.body.classList.contains('dark-mode')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
});