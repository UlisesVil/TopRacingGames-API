'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
    
    userId:{
        type: String,
        required: true
    },
    projectId:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    date_comment:{
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Comment', CommentSchema);