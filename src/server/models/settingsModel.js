import mongoose from 'mongoose';

const { Schema } = mongoose;

const settingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    unique: true,
    required: true
  },
  maxGuessCount: {type: Number, default: 10},
  minNum: {type: Number, default: 0},
  maxNum: {type: Number, default: 7},
  answerSize: {type: Number, default: 4}
}, { timestamps: true });

const settingsModel =  mongoose.model('Settings', settingSchema);
export default settingsModel;