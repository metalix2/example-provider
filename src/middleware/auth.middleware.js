// 'Token' should be a valid ISO 8601 timestamp within the last hour
const isValidAuthTimestamp = (timestamp) => {
    let diff = (new Date() - new Date(timestamp)) / 1000;
    return diff >= 0 && diff <= 3600
};

const authMiddleware = (req, res, next) => {
    if (!req.headers['X-Authorization'] || !req.headers.authorization ) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    let timestamp;
    try {
        timestamp = req.headers['X-Authorization'].replace("Bearer ", "")        
    } catch(e) {
        timestamp = req.headers.authorization.replace("Bearer ", "")        
    }
    
    if (!isValidAuthTimestamp(timestamp)) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

module.exports = authMiddleware;