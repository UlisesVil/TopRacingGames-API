'use strict'

var Comment = require('../models/comment');
//const{ restart } = require('nodemon');

var controller = {


    saveComment: function(req, res){
        console.log(req.body);
        var comment = new Comment();
        console.log(comment);
        var params = req.body;
        comment.userId = params.userId;
        comment.projectId= params.projectId;
        comment.userName = params.userName;
        comment.userEmail = params.userEmail;
        comment.comment = params.comment;
        

        console.log(comment.userId);

        comment.save((err,commentStored)=>{

           
            if(err) return res.status(500).send({message:'Error al Guardar Comentario'});

            if(!commentStored) return res.status(404).send({message:'No se ha podido guardar el Comentario'});

            return res.status(200).send({comment: commentStored});
            
        });
        
    },


   


    getComments: function (req, res){
        var projectId = req.params.id;
        console.log (projectId);

        if(projectId==null) return res.status(404).send({message: 'No se recibio el ID del documento'});

        Comment.find({projectId:projectId},(err, comment)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!comment) return res.status(404).send({message: 'no hay commentarios para esta entrada'});

            return res.status(200).send({comment});
        }).sort('-date_comment');

    },


    getComment: function (req, res){
        var commentId = req.params.id;
        console.log (commentId+'este es el id del comentario');

        if(commentId==null) return res.status(404).send({message: 'No se recibio el ID del documento'});

        Comment.findOne({_id:commentId},(err, comment)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!comment) return res.status(404).send({message: 'no hay commentarios para esta entrada'});

            return res.status(200).send({comment});
        }).sort('-date_comment');
    },



    editComment: function(req, res){
        console.log(req.body);
        var comment=req.body.comment;
        var commentId= req.body._id;
        console.log(comment);
        console.log(commentId);

        if(commentId==null) return res.status(404).send({message: 'No se recibio el commentario a Editar'});

        Comment.findByIdAndUpdate({_id:commentId},{comment:comment},(err,comment)=>{
            if(err) return res.status(500).send({message:'Error al devolver los datos'});

            if(!comment) return res.status(404).send({message: 'No existe el comentario'});

            return res.status(200).send({comment});
        });
        
    },


    deleteComment:function(req, res){
        console.log(req.params.id);
        var commentId=req.params.id;

        Comment.findByIdAndDelete(commentId,(err, commentRemoved)=>{
            if(err) return res.status(500).send({message:'No se puede eliminar este Comentario'});

            if(!commentRemoved) return res.status(404).send({message:'No hay ningun commentario con el id solicitado'});

            return res.status(200).send({
                comment: commentRemoved
            });
        });
    }
   

    

};



module.exports = controller;