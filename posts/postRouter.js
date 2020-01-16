const express = require('express');
const UseMiddleWare = require("../MiddleWare/UseMiddleWare");
const db = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  db.get().then((users) => {
    res.status(200).json({users})
  })
  .catch((err) => {
    res.json({err})
  })
});

router.get('/:id', UseMiddleWare.validatePostId, (req, res) => {
  const id = req.param.id;
  db.getById(id).then(post => {
    res.status(200).json({post})
  })
  // do your magic!
  .catch(err => {
    res.status(404).json({err})
  })
});

router.delete('/:id', UseMiddleWare.validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  db.remove(id).then(del => {
    res.status(201).json({del})
  })
  .catch(err => {
    res.status(400).json({err})
  })
});

router.put('/:id', UseMiddleWare.validatePostId, UseMiddleWare.validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  db.update(id, body).then((post) => {
    res.status(201).json({post})
  })
  .catch(err => {
    res.status(500).json({err})
  })
});

// custom middleware

module.exports = router;
