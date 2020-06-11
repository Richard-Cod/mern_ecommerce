module.exports.config = {
    MONGO_URL : process.env.MONGO_URL || "mongodb://127.0.0.1:27017/richardecommerce",
    JWT_SECRET: process.env.JWT_SECRET || "somethingSecret",
}