const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog");

const db = mongoose.connection;

db.on("connected", (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`DB connected...`);
});
