// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    cuisine: {type: String, required: true},
    desc: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    img: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
// scotch-users is the collection name
module.exports = mongoose.model('scotch-user', UserSchema);