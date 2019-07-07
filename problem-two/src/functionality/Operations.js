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
    if (b === 0) { throw Object.assign(new Error("undefined"));}
    return (a/b).toString();
}

function sign (a) {
    a = parseFloat(a);
    return (a*(-1)).toString();
}

function percent (a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (op === null) {
        if (b === 0) {
            return (a/100).toString();
        }
    }
    else {
        let percentage = (b/100);
        switch (op) {
            default: break;
            case "+":
                return addition(a, a*percentage).toString();
            case "-":
                return subtract(a, a*percentage).toString();
            case 'x':
                return multiply(a, percentage).toString();
            case '÷':
                return divide(a, percentage).toString();
        }
    }
}

export {addition, divide, multiply, percent, sign, subtract};
