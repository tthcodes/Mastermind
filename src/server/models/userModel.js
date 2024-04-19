import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {type: String, required: false},
  username: {type: String, required: true},
  password: {type: String, required: true},
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const userModel =  mongoose.model('User', userSchema);
export default userModel;