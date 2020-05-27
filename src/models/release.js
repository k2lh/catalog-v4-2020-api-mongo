import mongoose from 'mongoose'

const releaseSchema = new mongoose.Schema({
  uniqueID: { type: String, required: true },
  updated: { type: Date, required: true, default: Date.now },
  listUpdates: [String],
  textUpdates: [String],
  noteUpdates: [String],
  seed: String
}, {timestamps: true})

const Release = mongoose.model('Release', releaseSchema)

export default Release
