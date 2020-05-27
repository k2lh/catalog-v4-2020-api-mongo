import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema({
  uniqueID: { type: String, required: true },
  updated: { type: Date, required: true, default: Date.now },
  displayTitle: String,
  description: String,
  linkurl: String,
  tags: [],
  section: String,
  useFrame: Boolean,
  inCatalog: Boolean,
  inProduction: Boolean,
  isCore: Boolean,
  icon: String,
  environment: [],
  owner: String,
  team: {
    lead: String,
    developer: String,
    database: String
  },
  seed: String
}, {timestamps: true})

const Card = mongoose.model('Card', cardSchema)

export default Card
