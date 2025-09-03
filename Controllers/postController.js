const Post = require("../models/PostModel");

// CREATE Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, userId: req.user.id });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
