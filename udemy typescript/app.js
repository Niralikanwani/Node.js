"use strict";
const num1Element = document.getElementById('num1'); //Defining as types 
const num2Element = document.getElementById('num2');
const buttonElement = document.querySelector('button');
const numResults = []; // arrays defined as generic types
const textResults = []; // arrays defined using shortcut for typescript
// assigning types
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    else {
        return +num1 + +num2; // type casting 
    }
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    numResults.push(result);
    const stringResult = add(num1, num2);
    textResults.push(stringResult);
    console.log(numResults, textResults);
    // console.log(result);
    // console.log(stringResult);
    printResult({ val: result, timestamp: new Date() });
});
// console.log(add(1,6));
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('It worked');
    }, 1000);
});
// Promise is a generic type
myPromise.then((result) => {
    console.log(result.split('w'));
});
