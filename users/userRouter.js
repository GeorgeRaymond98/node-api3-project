const express = require('express');

const db = require('./userDb');
const postdb = require('../posts/postDb');
const UseMiddleWare = require('../MiddleWare/UseMiddleWare');

const router = express.Router();

router.post('/', UseMiddleWare.validateUser,(req, res) => {
  // do your magic!
  const user = req.body;
  db.insert(user).then((user) => {
    res.status(200).json({user})
  })
  .catch(err => {
    res.status(500).json({err})
  })
});

router.post('/:id/posts', UseMiddleWare.validateUserId,UseMiddleWare.validatePost,(req, res) => {
  // do your magic!
  const id = req.params.id;
  const post = req.body;

  postdb.insert(post)
  .then(post => {
    db.getUserPosts(id)
    .then(posts => {
      res.status(200).json({posts})
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then((users) => {
    res.status(500).json({users})
  })
  .catch(err => {
    res.status(500).json({err})
  })
});

router.get('/:id', UseMiddleWare.validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  db.getById(id)
  .then((user) => {
    res.status(200).json({user})
  })
  .catch((err) => {
    res.status(500).json({err})
  })
});

router.get('/:id/posts', UseMiddleWare.validateUserId, (req, res) => {
  const id = req.params.id;
  db.getUserPosts(id)
  .then((posts) => {
    res.status(200).json({posts})
  })
  .catch((err) => {
    res.status(500).json({err})
  })
  // do your magic!
});

router.delete('/:id', UseMiddleWare.validateUserId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
  .then(del => {
    res.status(200).json({message:"User Deleted"})
  })
  .catch((err) => {
    res.status(500).json({err})
  })
  // do your magic!
});

router.put('/:id', UseMiddleWare.validateUserId, UseMiddleWare.validateUser, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const user = req.body;
  db.update(id,user)
  .then((user) => {
    res.status(200).json({user})
  })
  .catch((err) => {
    res.status(500).json({err})
  })
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
