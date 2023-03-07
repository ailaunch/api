const express = require("express");
const router = express.Router();
const Post = require("../models/Bsc");
//get all nft
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);

  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const post = new Post({
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    attributes: [
      {
        trait_type: "Level",
        value: req.body.level
      },
      {
        trait_type: "Rate",
        value: req.body.rate
      }
    ]
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.log(error);
  }
});
// URI MAIN
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
// Delete
// router.delete("/:postId", async (req, res) => {
//   try {
//     const removeItem = await Post.remove({ _id: req.params.postId });
//     res.json(removeItem);
//   } catch (error) {
//     console.log(error);
//   }
// });

// //Update a post

// router.patch("/:postId", async (req, res) => {
//   try {
//     const updatePost = await Post.updateOne(
//       { _id: req.params.postId },
//       {
//         $set: { title: req.body.title },
//       }
//     );
//     res.json(updatePost);
//   } catch (error) {
//     console.log(error);
//   }
// });
module.exports = router;
