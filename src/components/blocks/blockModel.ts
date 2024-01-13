import mongoose, { Schema } from 'mongoose';

const blockSchema = new Schema({
  contract: { type: String, required: true },
  lastBlock: { type: Number, required: true },
  chainType: { type: String, required: true },
  cronInProcess: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

let blocksModel = mongoose.model('blocks',blockSchema)

export default blocksModel;
