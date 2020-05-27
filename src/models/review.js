import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  uniqueID: { type: String, required: true },
  updated: { type: Date, required: true, default: Date.now },
  review: String,
  author: String,
  seed: String
}, {timestamps: true})

const Review = mongoose.model('Review', reviewSchema)

export default Review
