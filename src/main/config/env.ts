export default {
  mongoUrl:
    process.env.MONGO_URL ||
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CONTAINER}/${process.env.MONGO_DB}?authSource=admin`,
  port: process.env.PORT || 3333,
}
