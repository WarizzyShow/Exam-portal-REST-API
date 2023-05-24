const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path:"./.env"}); 



const db_connect = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(uri);
		console.log("db connected");
	} catch (err) {
		throw err;
	}
};
mongoose.connection.on("disconnected", () => {
	console.log("mongdb disconnected");
});


module.exports=mongoose;