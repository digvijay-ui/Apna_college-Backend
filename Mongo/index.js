const mongoose = require('mongoose');
main()
.then(()  =>{
    console.log("connection succesfull");
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
});

const User = mongoose.model("User",userSchema);
User.insertMany([
    {name:"urmil",email:"urmil@gmail.com",age:21},
        {name:"bhavya",email:"bhavya@gmail.com",age:22},
            {name:"bhavya",email:"bhavya@gmail.com",age:23},
]).then((res) =>{
    console.log(res);
});
//const user1 = new User({
    //name : "Digvijay",
    //email : "sky@gmail.com",
   // age : 20,

//});
//user1
//.save()
//.then((res) =>{
    //console.log(res);
//})
//.catch((err) =>{
//console.log(err);
//});