const mongoose = require("mongoose");


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
module.exports = mongoose.model("Ftm", PostSchema);
