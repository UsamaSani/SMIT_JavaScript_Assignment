let num1 = parseFloat(prompt("Enter first number"));
let operator = prompt("Select Operator +,-,*,/,%");
let num2 = parseFloat(prompt("Enter second number"));
let result;

if (operator === "+") {
    result = num1 + num2;
} else if (operator === "-") {
    result = num1 - num2;
} else if (operator === "/") {
    result = num1 / num2;
} else if (operator === "*") {
    result = num1 * num2;
} else if (operator === "%") {
    result = num1 % num2;
} else {
    alert("Invalid operator");
}

if (result !== undefined) {
    document.getElementById("num1").innerHTML = num1;
    document.getElementById("operator").innerHTML = operator;
    document.getElementById("num2").innerHTML = num2;
    document.getElementById("equal").innerHTML = "=";
    document.getElementById("result").innerHTML = result;
}
