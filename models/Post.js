const mongoose = require("mongoose");
// const PostSchema = mongoose.Schema({
//   _id: Number,
//   name: {
//     type: String,
//     require: true,
//   },
//   image: String,
//   tier:String,
//   rarity: String,
//   efficiency: String,
//   durability: String,
//   luck: String,
//   rate: String,
//   description: {
//     type: String,
//     require: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now(),
//   },
// });

const PostSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    require: true,
  },
  image: String,
  
  description: {
    type: String,
    require: true,
  },
  attributes: {
    type: Array,
    default: [
      {
        trait_type: "Level",
        value: ""
      },
      {
        trait_type: "Rate",
        value: ""
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Posts", PostSchema);
