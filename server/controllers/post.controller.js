const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const { validateToken } = require('../utils/token');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns request promise
 */
addPost = async (req, res) => {
  if (!req.body.post.title || !req.body.post.content) {
    return res.status(403).send({ message : 'Information missing' }).end();
  }

  try {
    const validate = validateToken(req.headers.authorization)
  
    const newPost = new Post(req.body.post);
  
    // Let's sanitize inputs
    newPost.name = sanitizeHtml(validate.name);
    newPost.title = sanitizeHtml(newPost.title);
    newPost.content = sanitizeHtml(newPost.content);
  
    newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
    newPost.cuid = cuid();
    newPost.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ post: saved });
    });
  } catch(e) {
    return res.status(403).send({ message : 'Not Allowed' }).end();
  }
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns request promise
 */
deletePost = async (req, res) => {
  try {
    const validate = validateToken(req.headers.authorization);

    const post = await Post.findOne({ cuid: req.params.cuid });

    if(!post) {
      return res.status(404).send({ message: "Not Found" }).end();
    } else if(post.name !== validate.name) {
      return res.status(403).send({ message: "Not Allowed" }).end();
    } else {
      await post.delete();
      return res.status(200).end();
    }
  } catch(e) {
    return res.status(403).send({ message: "Not Allowed" }).end();
  }
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
