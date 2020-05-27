import Router from 'express'
import Event from '../models/event'
let router = Router()

router.get('/', (req, res) => {
  Event.find({}, function(err, event) {
    if (err) {
      res.send({message: err})
    }
    res.json(event)
  });
})

router.get('/dates', (req, res) => {
  Event.find({}, function(err, event) {
    if (err) {
      res.send({message: err})
    } else {
      var map = {};
      event.forEach(function(val) {
        map[val.day] = map[val.day] || {};
        map[val.day][val.currentUrl] = map[val.day][val.currentUrl] || 0;
        map[val.day][val.currentUrl]++;
      });
      var output = Object.keys(map).map(function(key){
        var tmpArr = [];
        for (var type in map[key]) {
          tmpArr.push([type, map[key][type]]);
        }
        return {
          dateDate: key,
          urlVisited: tmpArr
        };
      })
      res.json(output)
    };
  });
})

// router.get('/dates', (req, res) => {
//   Event.find({}, function(err, event) {
//     if (err) {
//       res.send({message: err})
//     } else {
//       var map = {};
//       event.forEach(function(val) {
//         map[val.day] = map[val.day] || {};
//         map[val.day][val.currentUrl] = map[val.day][val.currentUrl] || 0;
//         map[val.day][val.currentUrl]++;
//       });
//       var output = Object.keys(map).map(function(key){
//         var tmpArr = [];
//         for (var type in map[key]) {
//           tmpArr.push({
//             type: key,
//             type,
//             map[key][type]
//           });
//         }
//         console.log(tmpArr);
//         return tmpArr;
//       })
//       res.json(output)
//     };
//   });
// })

router.get('/:id', (req, res) => {
  Event.findById(req.params.id, function(err, event) {
    if (err)
      res.send({message: err.message});
    res.json(event);
  });
})

router.post('/', (req, res) => {
  let event = new Event(req.body)
  event.save().then(function(err, data){
    if (err) {
      res.send({message: err.message})
    }
    res.json(data)
  }).catch(err => {
    res.send({message: err.message})
  });
})

export default router
