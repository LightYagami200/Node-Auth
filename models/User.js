// Dependencies
const { model, Schema } = require('mongoose');

// Schema
const UserSchema = new Schema({
  username: {
    unique: true,
    type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  password: String,
});

// Model
model('User', UserSchema);
