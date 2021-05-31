
const num1Element = document.getElementById('num1') as HTMLInputElement; //Defining as types 
const num2Element = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button')!;

const numResults: Array<number> = []; // arrays defined as generic types
const textResults: string[] = []; // arrays defined using shortcut for typescript

type NumOrString = number | string; // alias type names for union types
type Result = { val: number; timestamp: Date };

interface ResultObj {
    val: number; 
    timestamp: Date; 
} // interfaces for objects and classes

// assigning types
function add(num1: NumOrString, num2: NumOrString){
    if(typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    } else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    } else {
        return +num1 + +num2; // type casting 
    }
    
}

function printResult(resultObj: ResultObj){
    console.log(resultObj.val);
}

buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1,+num2);
    numResults.push(result as number);
    const stringResult= add(num1,num2);
    textResults.push(stringResult as string);
    console.log(numResults,textResults);
    // console.log(result);
    // console.log(stringResult);
    printResult({val: result as number, timestamp: new Date()});
});

// console.log(add(1,6));

const myPromise = new Promise<string>((resolve,reject) => {
    setTimeout(() => {
        resolve('It worked');
    },1000);
});
// Promise is a generic type as it resolves to ifferent type
myPromise.then((result) => {
    console.log(result.split('w'));
});