'use strict'

var Comment = require('../models/comment');

var controller = {

    saveComment: function(req, res){
        var comment = new Comment();
        var params = req.body;
        comment.userId = params.userId;
        comment.projectId= params.projectId;
        comment.userName = params.userName;
        comment.userEmail = params.userEmail;
        comment.comment = params.comment;
        comment.save((err,commentStored)=>{
            if(err) return res.status(500).send({message:'Error Saving Comment'});
            if(!commentStored) return res.status(404).send({message:'Comment could not be saved'});
            return res.status(200).send({comment: commentStored});
        }); 
    },

    getComments: function (req, res){
        var projectId = req.params.id;
        if(projectId==null) return res.status(404).send({message: 'Document ID not received'});
        Comment.find({projectId:projectId},(err, comment)=>{
            if(err) return res.status(500).send({message: 'Error returning data'});
            if(!comment) return res.status(404).send({message: 'There are no comments for this entry'});
            return res.status(200).send({comment});
        }).sort('-date_comment');
    },

    getComment: function (req, res){
        var commentId = req.params.id;
        if(commentId==null) return res.status(404).send({message: 'Document ID not received'});
        Comment.findOne({_id:commentId},(err, comment)=>{
            if(err) return res.status(500).send({message: 'Error returning data'});
            if(!comment) return res.status(404).send({message: 'There are no comments for this entry'});
            return res.status(200).send({comment});
        }).sort('-date_comment');
    },

    editComment: function(req, res){
        var comment=req.body.comment;
        var commentId= req.body._id;
        if(commentId==null) return res.status(404).send({message: 'The comment to Edit was not received'});
        Comment.findByIdAndUpdate({_id:commentId},{comment:comment},(err,comment)=>{
            if(err) return res.status(500).send({message:'Error returning data'});
            if(!comment) return res.status(404).send({message: 'The comment does not exist'});
            return res.status(200).send({comment});
        });
    },


    deleteComment:function(req, res){
        var commentId=req.params.id;
        Comment.findByIdAndDelete(commentId,(err, commentRemoved)=>{
            if(err) return res.status(500).send({message:'Can\'t delete this Comment'});
            if(!commentRemoved) return res.status(404).send({message:'There is no comment with the requested id'});
            return res.status(200).send({
                comment: commentRemoved
            });
        });
    }
};

module.exports = controller;