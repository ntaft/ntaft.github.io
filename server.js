const express = require('express');
const logger = require('morgan');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile('index.html'));

app.listen(port, () => console.log('listening on port', port));
