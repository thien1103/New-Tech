const express = require('express');
const route = require('./routes');

const app = express();
const port = 5000;
const hostname = '127.0.0.1';

route(app);

app.listen(port, () => {
    console.log(`App listening at http://${hostname}:${port}`);
})