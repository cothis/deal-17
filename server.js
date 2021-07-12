const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

app.set('port', process.env.PORT || 8000);
app.use(express.json());

server.listen(app.get('port'), (req, res) => {
    console.log('Express server listening on port ' + app.get('port'));
});