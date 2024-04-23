import mongoose from 'mongoose';

const { Schema } = mongoose;

const settingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // specifies user field will store ObjectId to ref obj in 'user' collection
    ref: 'User', // Tells mongoose the objectId references docs in 'User' collection. 
    unique: true, // No 2 docs can refer to same user 
    required: true
  },
  maxGuessCount: {type: Number, default: 10},
  minNum: {type: Number, default: 0},
  maxNum: {type: Number, default: 7},
  numCount: {type: Number, default: 4}
}, { timestamps: true });

const settingsModel =  mongoose.model('Settings', settingSchema);
export default settingsModel;