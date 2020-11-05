const router = require('express').Router();
let Comment = require('../models/comments.model');

router.route('/').get((req,res)=>{
    Comment.find()
      .then(comments => res.json(comments))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res)=>{
    const comment = req.body.comment;

    const newComment = new Comment({
        comment
    });

    newComment.save()
     .then(()=> res.json('Comment Added!'))
     .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req,res)=>{
    Comment.findById(req.params.id)
      .then(comment => res.json(comment))
      .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res)=>{
    Comment.findByIdAndDelete(req.params.id)
      .then(()=> res.json('Comment deleted!'))
      .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res)=>{
    Comment.findById(req.params.id)
      .then(comment => {    
          comment.comment = req.body.comment;

          comment.save()
            .then(()=> res.json('Comment update!'))
            .catch(err => res.status(400).json('Error: '+err));
      })
      .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;