import mongoose from 'mongoose';

const { Schema } = mongoose;

const settingSchema = new Schema({
  firstName: {type: String, required: false},
  username: {type: String, required: true},
  password: {type: String, required: true},
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const settingsModel =  mongoose.model('Settings', settingSchema);
export default settingsModel;