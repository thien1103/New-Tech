const mssvRouter = require('./mssv');
const messageRouter = require('./message');
const studentRouter = require('./student');

function route(app) {
    app.use('/MSSV', mssvRouter);
    app.use('/message', messageRouter);
    app.use('/', studentRouter);
}

module.exports = route;