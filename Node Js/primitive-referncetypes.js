const person = {
    name:'Max',
    age: 29,
    greet() {
        console.log('Hi, I am '+this.name);
    }
};

const hobbies = ['Sports' , 'Cooking'];
// for(let hobby of hobbies) {
//     console.log(hobby);
// }
//console.log(hobbies.map(hobby => 'Hobby: '+hobby;));

// console.log(hobbies.map(hobby => {
//     return 'Hobby: '+hobby;
// }));
// console.log(hobbies);

// arrays only stores address not the value its pointing at so if its changed the const remains the same and it does not violate the constant rule.
hobbies.push('Programming');
console.log(hobbies);