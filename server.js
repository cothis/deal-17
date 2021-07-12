const http = require('http');
const express = require('express');
const cors = require('cors');
const { db } = require('./db');

const app = express();
const server = http.createServer(app);

app.set('port', process.env.PORT || 8000);
app.use(express.json());

app.use(cors());

//simple query
db.query(`SELECT * FROM TEST`).then((rows, fields) => {
  console.log(rows);
  console.log(fields);
});

app.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send('{"name": "test"}');
});

server.listen(app.get('port'), (req, res) => {
  console.log('Express server listening on port ' + app.get('port'));
});
