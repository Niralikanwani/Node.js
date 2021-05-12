const name = "Nirali";
let age = 20;
var hasHobbies = true;

//name = "Max";
age = "30"

//const summarizeUser = function(hasName , hasAge, hasHobby){
//const summarizeUser = (hasName , hasAge, hasHobby) => {
    //this
const summarizeUser = function(hasName , hasAge, hasHobby){
    return (
        'Name : ' + hasName +
        ' Age : ' + hasAge +
        ' Hobby : ' + hasHobby
    );
}
//const add = (a,b) => a+b;
//const addOne = a => a + 1;

const addRandom = () => 1+2;
console.log(addRandom());

const addOne = (a) => a+1;
console.log(addOne(1));

const add = (a,b) => {
    return a+b;
};
console.log(add(1,2));
console.log(summarizeUser(name,age,hasHobbies));