import User from "../models/User.js";
import Post from "../models/Post.js";

/***CREATE***/
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = await Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      picturePath,
      likes: {},
      comment: [],
    });
    const savedPost = await newPost.save();
    return res.satus(201).json(savedPost);
  } catch (error) {
    return res.status(409).json({
      message: error.message,
    });
  }
};

/***READ ***/

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.findById(userId);
    return res.satus(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

/****UPDATE*****/
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
