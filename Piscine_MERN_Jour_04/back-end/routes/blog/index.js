const express = require('express');
const {Blog, Validate} = require('../../models/blog');
const {User} = require('../../models/user');
// const {Comment, ValidateComment} = require('../../models/comment');
const router = express.Router();

// read all my blog
router.get('/:login', async (req, res) => {
  const user = await User.findOne({login: req.params.login});
  const blogs = await Blog.find({user: user._id}).populate('user').populate('comments');
  res.json(blogs);
});

// read one
router.get('/:login/:id', async (req, res) => {
  const _id = req.params.id;
  const blog = await Blog.findOne({_id}).populate('user').populate('comments.user');
  res.json(blog);
});

// create
router.post('/:login', async (req, res) => {
  const _id = req.user._id;

  const {error} = Validate(req.body);

  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }

  const blog = await Blog.findOne({'title': req.body.title}).populate('user');

  if (blog) {
    return res.status(400).json({
      message: 'Ce blog existe déjà …',
    });
  }

  const blogNew = new Blog({
    title: req.body.title,
    resum: req.body.resum,
    user: _id
  });

  await blogNew.save();

  res.json(blogNew);
});

//update
router.put('/:login/:id', async (req, res) => {
  const _id = req.params.id;

  const blog = await Blog.findOne({_id}).populate('user');

  const {error} = Validate(req.body);

  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }

  if (!blog) {
    return res.status(400).json({
      message: 'Ce blog n\'existe pas …',
    });
  }

  await Blog.findOneAndUpdate({_id}, {
    title: req.body.title,
    resum: req.body.resum,
  });

  res.json({message: 'Le blog a été modifié'});
});

// delete
router.delete('/:login/:id', async (req, res) => {

  const _id =  req.params.id;
  const blog = await Blog.findOne({_id});

  if (!blog) {
    return res.status(400).json({
      message: 'Le blog n\'existe pas',
    });
  } else {
    await Blog.findOneAndDelete({_id});

    return res.status(200).json({
      message: 'Le blog a bien été supprimé'
    });
  }
});

// -------------COMMENTS---------------

// read one
router.get('/:login/:id/comment/:commentId', async (req, res) => {
  const blog_id = req.params.id;
  const comment_id = req.params.commentId;

  const blog = await Blog.findOne({_id: blog_id}).populate('comments.user');

  const comment = blog.comments.find((element) => {
    return (element._id == comment_id);
  });

  res.json(comment);
});


// create
router.post('/:login/:id/comment', async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.id;

  const blog = await Blog.findOne({_id: blogId}).populate('user').populate('comments');

  blog.comments.push({
    body: req.body.body,
    user: userId,
  });

  await blog.save();

  res.json(await Blog.findOne({_id: blogId}).populate('user').populate('comments.user'));
});

//update
router.put('/:login/:id/comment/:commentId', async (req, res) => {
  // const userId = req.user._id;
  const blogId = req.params.id;
  const commentId = req.params.commentId;

  const blog = await Blog.findOne({_id: blogId}).populate('user').populate('comments');

  if (!blog) {
    return res.status(400).json({
      message: 'Ce Blog n\'existe pas …',
    });
  }
  
  const comments = blog.comments.map((element) => {
    if (element._id == commentId) {
      element.body = req.body.body;
    }

    return element;
  });

  await Blog.findOneAndUpdate({_id: blogId}, {
    comments: comments,
  });

  res.json({message: 'Le Commentaire a été modifié'});
});

// delete comment
router.delete('/:login/:id/comment/:commentId', async (req, res) => {
  const blogId = req.params.id;
  const commentId = req.params.commentId;

  // const userId = req.user._id;
  const blog = await Blog.findOne({_id: blogId}).populate('user').populate('comments');

  if (!blog) {
    return res.status(400).json({
      message: 'Ce Blog n\'existe pas …',
    });
  }

  const comments = blog.comments.filter((element) => {
    return (element._id != commentId);
  });

  await Blog.findOneAndUpdate({_id: blogId}, {
    comments: comments,
  });

  const blogDelete = await Blog.findOne({_id: blogId}).populate('user').populate('comments');


  res.json(blogDelete);
});

module.exports = router;
