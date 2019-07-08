// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Event = require("../models/Event");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/up2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    name: "Alican",
    lastname: "Torun",
    username: "alican@torun.com",
    password: bcrypt.hashSync("alican", bcrypt.genSaltSync(bcryptSalt)),
    age: 28,
    languages: ["turkish", "english", "spanish"],
    keyInterests: "funny business",
    userType: "Admin",
    bio: "i am a cheerful person, who want`s"

  },
 {
    name: "Alex",
    lastname: "Moebius",
    username: "alexmoebius13@gmail.com",
    password: bcrypt.hashSync("alex", bcrypt.genSaltSync(bcryptSalt)),
    age: 38,
    languages: ["german", "english", "latin"],
    keyInterests: "small stuff",
    userType: "Admin",
    bio: "what the what the what the"
  },
  {
    name: "Devan",
    lastname: "Pellow",
    username: "devan@pellow.com",
    password: bcrypt.hashSync("devan", bcrypt.genSaltSync(bcryptSalt)),
    age: 27,
    languages: ["english", "aboutish", "germanish"],
    keyInterests: "Pellowtalk",
    userType: "User",
    bio: "ich muß uben"
    },
    {
    name: "Paul",
    lastname: "Hellweg",
    username: "paul@hellweg.com",
    password: bcrypt.hashSync("paul", bcrypt.genSaltSync(bcryptSalt)),
    age: 27,
    languages: ["english", "german"],
    keyInterests: "Devan",
    userType: "User",
    bio: "i live my life husteling"
    }
]

// let events = 
//   {
//     creator: "Alex"
//     attendees: ["Alex", "Paul", "Devan", "Alican"],
//     category: "Sports",
//     name: "Ball"
//     description: "we play with balls"
//     date: new Date (2019, 07, 12)
//     // startTime: 
//     // endTime:
//     location:{
//       type: {
//         type: String, 
//         enum: ['Point'],
//         default: 'Point', 
//         required: true
//       },
//       coordinates: {
//         type: [10, 10],
//         required: true
//       }  

//   }



User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})