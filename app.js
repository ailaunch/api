const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv/config");
//Import router
const postsRoute = require("./routes/posts");
app.get("/", (req, res) => {
  res.json("API-TEST");
});

app.use("/nft", postsRoute);



//Connect to DB
try {
  mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("Connect to Mongoose");
  });
} catch (error) {
  console.log(error);
}
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('PORT:' + `http://localhost:${PORT}`);
});
