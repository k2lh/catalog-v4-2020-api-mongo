import Router from 'express'
import Review from '../models/review'
let router = Router()

router.get('/fetch', (req, res) => {
  Review.find({}, function(err, review) {
    if (err) {
      res.send({message: err})
    }
    res.json(review)
  });
})

router.post('/new', (req, res) => {
  var obj = req.body;
  dbo.collection("reviews").insertOne(obj, function(err, res) {
    if (err) {
      res.send({message: err.message})
    }
    res.json(data)
  }).catch(err => {
    res.send({message: err.message})
  });
})

router.post('/edit/:id', (req, res) => {
  var query = { uniqueID: req.param.id };
  var newvalues = req.body;
  dbo.collection("reviews").updateOne(query, newvalues, function(err, res) {
    if (err) {
      res.send({message: err.message})
    }
    res.json(data)
  }).catch(err => {
    res.send({message: err.message})
  });
})

router.delete('/delete/:id', (req, res) => {
  var query = { uniqueID: req.param.id };
  review.deleteOne(query, function(err, obj) {
    if (err) {
      res.send({message: err.message})
    }
    res.json(data)
  }).catch(err => {
    res.send({message: err.message})
  });
})

export default router
