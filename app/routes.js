// Dependencies
var mongoose        = require('mongoose');
var User            = require('./model.js');
var fs              = require('fs');
var multer          = require('multer')
var express         = require('express');
var formidable      = require('formidable');
var util            = require('util');
var mime            = require("mime");
var path            = require('path');


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

    //construct a new empty schema  
    var newuser = new User();

    //parse a form
    var form = new formidable.IncomingForm();
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../public/uploads');

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      console.log(fields.data);
      res.end(util.inspect({fields: fields, files: files}));
    });

    //Encounters a file in the form, rename in sync generate a base64 string and use it in the schema
    form.on('file', function(name, file) {
      fs.renameSync(file.path, path.join(form.uploadDir, file.name));
      var dataUri = base64Image(form.uploadDir+"/"+file.name);
      newuser.img = dataUri;
      fs.unlinkSync(path.join(form.uploadDir, file.name));

      function base64Image(src) {
        var data = fs.readFileSync(src).toString("base64");
        console.log("data is this"+data);
        return util.format("data:%s;base64,%s", mime.lookup(src), data);
      }
      
    });

    //Encounter a form field object, parse it and use it in the schema
    form.on('field', function(name, value) {
      var obj = JSON.parse(value);
      console.log(obj.username);
      newuser.username = obj.username;
      newuser.email = obj.email;
      newuser.phone = parseInt(obj.phone);
      newuser.cuisine = obj.cuisine;
      newuser.desc = obj.desc;
      newuser.country = obj.country;
      newuser.state = obj.state;
      newuser.location = obj.location;
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      newuser.save(function(err){
        if(err)
          res.send(err);

            // If no errors are found, it responds with a JSON of the new user
          });
      res.end('success');
    });

    return;
  //}

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    );
});

};  