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
    await newPost.save();

    const post = await Post.find();
    res.satus(201).json(post);
  } catch (err) {
    res.satus(409).json({
      message: err.message,
    });
  }
};

/***READ ***/

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.satus(200).json(post);
  } catch (err) {
    res.satus(404).json({ message: err.message });
  }
};

export const getUserPosts = async(req,res) => {
    try{
        const {userId} = req.params;
        const post = await Post.findById({userId});
        res.satus(200).json(post);
    }
    catch(err) {
        res.satus(404).json({message: err.message});
    }
};

/****UPDATE*****/
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = await Post.likes.get(userId);

    /**** LIKE DISLIKE ***/
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );

    res.satus(200).json(updatedPost);
  } catch (err) {
    res.satus(404).json({
      message: err.message,
    });
  }
};
