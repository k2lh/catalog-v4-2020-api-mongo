import Router from 'express'
import Release from '../models/release'
let router = Router()

router.get('/fetch', (req, res) => {
  Release.find({}, function(err, release) {
    if (err) {
      res.send({message: err})
    }
    res.json(release)
  });
})

router.post('/new', (req, res) => {
  var obj = req.body;
  dbo.collection("releases").insertOne(obj, function(err, res) {
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
  dbo.collection("releases").updateOne(query, newvalues, function(err, res) {
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
  release.deleteOne(query, function(err, obj) {
    if (err) {
      res.send({message: err.message})
    }
    res.json(data)
  }).catch(err => {
    res.send({message: err.message})
  });
})

export default router
