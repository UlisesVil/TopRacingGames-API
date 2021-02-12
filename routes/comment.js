'use strict'

var express = require('express');
var CommentController = require('../controllers/commentController');

var router = express.Router();

router.post('/save-comment', CommentController.saveComment);
router.get('/comments/:id', CommentController.getComments);
router.get('/comment/:id', CommentController.getComment);
router.put('/edit-comment', CommentController.editComment);
router.delete('/comment/:id', CommentController.deleteComment);

module.exports = router;