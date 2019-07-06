function addition(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (a === 0) { return b.toString(); }
    if (b === 0) { return a.toString();}
    else { return (a + b).toString(); }
}

function subtract(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return (a - b).toString();
}

function multiply(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return (a*b).toString();
}

function divide(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (b === 0) {return "don't do this";}
    return (a/b).toString();
}

function sign (a) {
    a = parseFloat(a);
    return (a*(-1)).toString();
}

function percent (a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
}

export {addition, divide, multiply, percent, sign, subtract};
