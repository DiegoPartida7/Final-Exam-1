function errorHandler(error, req, res) {
    res.statusMessage = "Id is missing in the body of the request";
    // return res.status(404).end()
}

module.exports = errorHandler;