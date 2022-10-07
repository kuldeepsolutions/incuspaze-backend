const mongoose = require('mongoose');
require('dotenv').config();
const database_url = process.env.MONGO_URI;
mongoose
	.connect(database_url, {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
        console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database. Exiting now...", err);
		process.exit();
	});

module.exports = mongoose.connection;