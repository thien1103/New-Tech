class log {
    logRequestDetails(req, res) {
        const method = req.method;
        const url = req.originalUrl;

        console.log(`[${method}] ${url}`);
    }
}


module.exports = new log;
