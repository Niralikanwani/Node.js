const person = {
    name:'Max',
    age: 29,
    greet() {
        console.log('Hi, I am '+this.name);
    }
};

// const printName = (personData) => {
//     console.log(personData.name);
// }

// printName(person);

// const printName = ({ name }) => {
//         console.log(name);
//     }

//     printName(person);
//Destructuring objects
const { name, age} = person;
console.log(name,age);
//Destructuring arrays
const hobbies = ['Sports' , 'Cooking'];
const [hobby1,hobby2] = hobbies;
console.log(hobby1,hobby2);