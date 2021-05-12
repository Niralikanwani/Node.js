const person = {
    name:'Max',
    age: 29,
    greet() {
        console.log('Hi, I am '+this.name);
    }
};

const copiedperson = {...person};
console.log(copiedperson);

const hobbies = ['Sports' , 'Cooking'];
console.log(hobbies);
//copy array using slice
const copiedArray = hobbies.slice();
console.log(copiedArray);
// copy array with first element as an array nested array
const copyArray = [hobbies];
console.log(copyArray);
//Spread operator(Extract argument list)
const Array = [...hobbies];
console.log(Array);


const toArray = (arg1,arg2,arg3) => {
    return[arg1,arg2,arg3];
};
console.log(toArray(1,2,3));
//Rest operator(Add multiple arguments)
const torestArray = (...args) => {
    return args;
};
console.log(torestArray(1,2,3,4,5));