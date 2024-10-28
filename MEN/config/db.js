const mongoose = require("mongoose");

const connection = mongoose.connect(`mongodb://0.0.0.0/men`).then(()=> {
  console.log("data base connected");
})

module.exports = connection; 