document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('calcBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
        const n1 = parseFloat(document.getElementById('num1').value);
        const n2 = parseFloat(document.getElementById('num2').value);
        const res = document.getElementById('calcResult');
        if (Number.isFinite(n1) && Number.isFinite(n2)) {
            res.textContent = 'Result: ' + (n1 + n2);
        } else {
            res.textContent = 'Please enter valid numbers.';
        }
    });
});

//This file contains basic calculator function
function add(a, b, c, d, e) {
    return a + b + c + d + e;
}

function subtract(a, b) {
    return a - b;
}
function square(a) {
    return a * a;
}
//function to divide two numbers
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}
// Example usage

console.log(add(5, 3));
console.log(subtract(10, 4));
console.log(square(7));
console.log(divide(20, 4));

