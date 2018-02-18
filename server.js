var express = require('express');

const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// Create server
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
    app.get('/latestTime/:temp1', (req, res) => {
        db.read();
        const test = db.get('temps')
          .latest()
          .get('data')
          .find({name: "Temperature sensor 1"})
          .value()

      res.send(test)
      console.log(req.params.id + ' - ' + test);
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

var server = {
  listen: function() {
    app.listen(3000);
    console.log('Database server listening at port 3000');
  }
}
module.exports = server;