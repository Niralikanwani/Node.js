const person = {
    name:'Max',
    age: 29,
    //greet: function() {
    greet() {
        console.log('Hi, I am '+this.name);
    }
};

//console.log(person);
person.greet();