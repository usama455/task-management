
 

import mongoose from "mongoose";
import { logger } from "./../utils";

const mongoURI = process.env.MONGOURI;

const connect = () => {
	mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
		if (err) return logger.error(err);
		console.log("DB Connected Successfully!");
	});
};

export default { connect };