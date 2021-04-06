'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: 'Welcome to the API REST of the Top Racing Games Site',
        });
    },

    test: function(req, res){
         return res.status(200).send({
            message: "This is the test method or action of the project controller"
         });
    },

    saveProject: function(req, res) {
        var project = new Project();
        var params = req.body;
        project.name=params.name;
        project.description=params.description;
        project.category=params.category;
        project.year=params.year;
        project.langs=params.langs;
        project.image=null;

        project.save((err,projectStored)=> {
            if(err) return res.status(500).send({message: 'Error saving document.'});
            if(!projectStored) return res.status(404).send({message: 'Project could not be saved.'});
            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function (req, res){
        var projectId = req.params.id;
        if(projectId==null) return res.status(404).send({message:'The project does not exist'});
        
        Project.findById(projectId,(err, project)=>{
            if (err) return res.status(500).send({message: 'Error returning data.'});
            if(!project) return res.status(404).send({message:'The project does not exist'});
            return res.status(200).send({
                project
            });
        });
    },

    getProjects: function(req, res){
        Project.find({}).sort('-year').exec((err,projects)=>{
            if (err) return res.status(500).send({message:'Error returning data'});
            if(!projects) return res.status(404).send({message:'There are no projects to show'});
            return res.status(200).send({projects});
        });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true},(err,projectUpdated)=>{
            if(err) return res.status(505).send({message:'Update failed'});
            if(!projectUpdated) return res.status(404).send({message:'The project does not exist to be updated'});
            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function(req, res){
        var projectID = req.params.id;
        Project.findByIdAndRemove(projectID, (err, projectRemoved)=> {
            if(err) return res.status(500).send({message:"The project cannot be deleted"});
            if(!projectRemoved) return res.status(404).send({message:"The project cannot be deleted"});
            return res.status(200).send({
                project: projectRemoved
            });
        });
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Image has not been uploaded...';
        if(req.files){
            var filePath = req.files.image.path; 
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt =='png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt =='gif'){
                Project.findByIdAndUpdate(projectId,{image:fileName}, {new:true}, (err, projectUpdated)=>{
                    if(err) return res.status(500).send({message:'Image has not been uploaded'});
                    if(!projectUpdated) return res.status(404).send({message:'The project does not exist'});
                    return res.status(200).send({
                        files: projectUpdated
                    });
                });
            }else{
                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({message: 'The extension is not valid'});      
                });
            }   
        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    },

    getImageFile: function(req,res){
        var file = req.params.image;
        var path_file ='./uploads/'+ file;
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "Image does not exist..."
                });
            }
        });
    }
};

module.exports = controller;