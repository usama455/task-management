import mongoose from "mongoose";
import logger from './../utils'
const mongoURI = process.env.DATABASE_URI;

const connect = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on("error", (error) => logger.error(error));
  db.once("open", () => console.log("DB Connected Successfully!"));
};

export default { connect };
