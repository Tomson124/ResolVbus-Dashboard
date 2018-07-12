var express = require('express');

const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// Create server
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Create database instance and start server
const adapter = new FileSync('database/solar.json')
const db = low(adapter)

db._.mixin({
  latest: function(array) {
    var long = array.length;
    return array[long - 1];
  }
});

// Routes
// GET /posts/:id
app.get('/latestTime/:temps', (req, res) => {
  if (req.params.temps === 'temp') {
    db.read();
    const temp2 = db.get('temps')
      .latest()
      .get('data')
      .find({name: 'Temperature sensor 2'})
      .value()
    const temp1 = db.get('temps')
      .latest()
      .get('data')
      .find({name: 'Temperature sensor 1'})
      .value()
    const time = db.get('temps')
      .latest()
      .get('time')
      .value()
    const date = db.get('temps')
      .latest()
      .get('date')
      .value()
    const test = [temp1, temp2, time, date]
    res.send(test);
  } else {
    res.status(404)
      .send('Cannot GET /latestTime/' + req.params.temps);
  }
})

// POST /posts
app.post('/posts', (req, res) => {
  db.get('temps')
    .push(req.body)
    .last()
    .assign({ id: Date.now().toString() })
    .write()
  res.send(post)
})

var server = app.listen(3000);
  console.log('Example app listening at port 3000');
module.exports = server;