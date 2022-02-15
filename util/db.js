const mongoose = require("mongoose");
const url = process.env.MONGO_DB_CONNECTION;
const connect = mongoose.connect(url);
connect.catch((err) => console.log(err));
