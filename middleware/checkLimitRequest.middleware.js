const requestTracker = new Map();

function checkLimitRequest(req, res, next) {
    const { ipUser } = req;

    if (requestTracker.has(ipUser)) {
        const { count, timestamp } = requestTracker.get(ipUser);
        const currentTime = new Date().getTime();
        const timeDiffInHours = (currentTime - timestamp) / (1000 * 60 * 60);

        if (count >= 500 && timeDiffInHours < 5) {
            return res.status(403).json({
                status: 'Forbidden',
                message: 'User has exceeded the maximum allowed requests. Please try again later.'
            });
        }

        if (timeDiffInHours >= 5) {
            requestTracker.set(ipUser, { count: 1, timestamp: currentTime });
        } else {
            requestTracker.set(ipUser, { count: count + 1, timestamp });
        }
    } else {
        requestTracker.set(ipUser, { count: 1, timestamp: new Date().getTime() });
    }

    next();
}

module.exports = { checkLimitRequest };