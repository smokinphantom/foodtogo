// Dependencies
var mongoose        = require('mongoose');
var User            = require('./model.js');
var fs              = require('fs');
var multer          = require('multer')
var express         = require('express');

/* Disk Storage engine of multer gives you full control on storing files to disk. 
The options are destination (for determining which folder the file should be saved) 
and filename (name of the file inside the folder) */
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'public/img');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

var upload = multer({storage: storage}).single('file');
// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);

        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });
    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new images
    //Posting the file upload
app.post('/upload', function(request, response) {
  upload(request, response, function(err) {
  if(err) {
    console.log('Error Occured');
    return;
  }
  console.log(request.file);
  response.end('Your File Uploaded');
  console.log('Photo Uploaded');
  })
});
   

};  