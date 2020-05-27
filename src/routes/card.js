import Router from 'express'
import Card from '../models/card'
let router = Router()

router.get('/fetch', (req, res) => {
  Card.find({}, function(err, card) {
    if (err) {
      res.send({message: err})
    }
    res.json(card)
  });
});

router.get('/core', (req, res) => {
  // for viewing list of cards for core team management
  Card.find({}, function(err, data) {
    if (err) {
      res.send({message: err})
    } else {
      var output = [];
      data.forEach(function(val) {
        if (val.inCore === true) {
          console.log(val.displayTitle);
          output.push(val);
        }
      });
      res.json(output)
    };
  });
});

router.get('/list/:id', (req, res) => {
  // for viewing list of cards by owner
  Card.find({}, function(err, data) {
    if (err) {
      res.send({message: err})
    } else {
      var output = [];
      data.forEach(function(val) {
        if (val.owner === req.params.id) {
          output.push(val);
        }
      });
      res.json(output)
    };
  });
});

router.get('/fetch/:id', (req, res) => {
  // for viewing specific card by uniqueID
  console.log(req.params.id);
  Card.find({ uniqueID: req.params.id }, function(err, data) {
    if (err) {
      res.send({message: err})
    } else {
      res.json(data)
    };
  });
});

router.post('/new', (req, res) => {
  let card = new Card(req.body);
  card.save().then(function(err, data){
    if (err) {
      res.send({message: err.message});
    }
    res.json(data);
  }).catch(err => {
    res.send({message: err.message});
  });
});

router.post('/edit/:id', (req, res) => {
  console.log(req.params.id);
  var newvalues = req.body;
  Card.updateOne({ _id: req.params.id }, newvalues, function(err, data) {
    console.log(data);
    if (err) {
      res.send({message: err.message})
    }
    res.json(data)
  }).catch(err => {
    res.send({message: err.message})
  });
});

router.delete('/delete/:id', (req, res) => {
  var query = { uniqueID: req.param.id };
  Card.deleteOne(query, function(err, data) {
    if (err) {
      res.send({message: err.message})
    }
    res.json(data)
  }).catch(err => {
    res.send({message: err.message})
  });
});

export default router
