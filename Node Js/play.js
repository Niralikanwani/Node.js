const name = "Nirali";
let age = 20;
var hasHobbies = true;

//name = "Max";
age = "30"

function summarizeUser(hasName , hasAge, hasHobby){
    return (
        'Name : ' + hasName +
        ' Age : ' + hasAge +
        ' Hobby : ' + hasHobby
    );
}


console.log(summarizeUser(name,age,hasHobbies));