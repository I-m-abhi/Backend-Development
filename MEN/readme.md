// Creating a server through Node.js

const http = require("http");

const server = http.createServer((req, res)=> {
  if(req.url == "/about"){
    res.end("The About page");
  }
  if(req.url == "/profile"){
    res.end("The Profile page");
  }
  if(req.url == "/"){
    res.end("The Home page");
  }
});

server.listen(3000);


// Creating Server through express.js

const express = require("express");

const app = express();

// Adding HTML file
app.set("view engine", "ejs");

// Adding a Custom Middleware
app.use((req, res, next)=> {
  console.log("This is custom middleware");
  // res.send('This is custom middleware');
  return next();
})

app.get('/', (req, res)=> {
  res.send('Hello Home page');
})
app.get('/about', (req, res)=> {
  res.send('Hello about page');
})

app.listen(3000);