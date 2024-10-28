const express = require("express");
const morgan = require("morgan");

const dbConnection = require("./config/db");
const userModel = require("./models/user");

const app = express();


// Add these two line of code for getting post result in console
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// **
app.use(express.static("public"));

app.use(morgan("dev"));

app.set("view engine", "ejs");

// Adding a midleware for seprate http
app.get('/', (req, res, next)=>{
  console.log('heloo septarte')
  return next();
}, (req, res)=> {
  res.render('index');
})
app.get('/about', (req, res)=> {
  res.send('Hello About page');
})
app.get('/profile', (req, res)=> {
  res.send('Hello Profile page');
})
// app.get("/get-form-data", (req, res)=>{
//   console.log(req.query);
//   res.send("Data Received");
// })
app.post("/get-form-data", async (req, res)=>{
  const {username, email, password} = req.body;
  await userModel.create({
    username: username,
    email: email,
    password: password,
  })
  res.send("Data Received");
})

// Read Data from mongodb
app.get("/user-data", (req, res)=> {
  userModel.find({
    username: 'imabhi'
  }).then((users)=> {
    res.send(users);
  })
  // userModel.findOne({
  //   username: 'imabhi'
  // }).then((users)=> {
  //   res.send(users);
  // })
})

// Update Data from mongodb
app.get("/update-user", async (req, res)=> {
  await userModel.findOneAndUpdate(
    {username: 'testing'},
    {email: 'update@gmail.com'}
  )
  res.send('user updated')
})

// Delete Data from mongodb
app.get("/delete-user", async (req, res)=> {
  await userModel.findOneAndDelete(
    {username: 'testing'}
  )
  res.send('user deleted')
})

app.listen(3000);