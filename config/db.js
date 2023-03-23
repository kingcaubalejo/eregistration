const mongoose = require("mongoose");

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const storage = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, options);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = storage;
