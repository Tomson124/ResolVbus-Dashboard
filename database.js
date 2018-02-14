const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database/solar.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ temps: []})
  .write()


db.get('temps')
    .push({id: 1, temp1: 12, temp2: 30})
    .write()


