exports.isAuthorized = function (req, res, next) {
    if (req.headers.authorization === 'foo') {
        return next()
    }

    return res.json({
        error: 'Unauthorized'
    });
}