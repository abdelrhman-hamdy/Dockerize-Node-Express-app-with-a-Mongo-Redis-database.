module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USERNAME: process.env.MONGO_USERNAME || 'root',
    MONGO_PASS: process.env.MONGO_PASS || 'root123',
    REDIS_URL : process.env.REDIS_URL || "redis",
    REDIS_PORT : process.env.REDIS_PORT || 6379, 
    SESSION_SECRET : process.env.SESSION_SECRET || secret
} ;
