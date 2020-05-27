import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  cnum: {
    type: String,
    required: true
  },
  currentUrl: {
    type: String,
    required: true
  },
  page: String,
  core: Boolean,
  landk: Boolean,
  tableau: Boolean,
  exec: Boolean,
  day: String,
  seed: String
}, {timestamps: true})

const Event = mongoose.model('Event', eventSchema)

export default Event
