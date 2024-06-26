import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  userScore: {type: Number, default: 0}
}, { timestamps: true });

// Hash user password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) { // Check for when pw modified or not yet saved
    try {
      this.password = await bcrypt.hash(this.password, 12); // Async hash of pw with salt round of 12
    } catch (err) {
      console.error('Error hashing password', err);
      return next(err);
    }
  }
  next();
});

const userModel =  mongoose.model('User', userSchema);
export default userModel;