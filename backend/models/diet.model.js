import mongoose from 'mongoose';

const dietSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal: String,
  age: Number,
  weight: Number,
  height: Number,
  gender: String,
  activity: String,
  plan: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Diet', dietSchema);
