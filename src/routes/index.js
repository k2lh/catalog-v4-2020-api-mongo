import event from './event'
import card from './card'
import release from './release'
import review from './review'
import Router from 'express'
let routes = Router()

routes.use('/events', event)
routes.use('/cards', card)
routes.use('/releases', release)
routes.use('/reviews', review)

export default routes
