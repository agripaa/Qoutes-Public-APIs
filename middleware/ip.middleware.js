function handlerIp (req, res, next) {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    req.ipUser = ip;
    next();
}

module.exports = { handlerIp }