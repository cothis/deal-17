const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.set('port', process.env.PORT || 8000);
app.use(express.json());

app.use(cors());

app.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send('hi')
})

server.listen(app.get('port'), (req, res) => {
    console.log('Express server listening on port ' + app.get('port'));
});