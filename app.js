const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const config = require("./config/config");
const routes = require("./routes/routes");
const adminRoutes = require("./routes/admin/route");
const frontendRoutes = require("./routes/frontend/routes");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db.url);
const connection = mongoose.connection;
mongoose.Promise = global.Promise;
connection.on("error", console.error.bind(console, "Mongoose: Connection Error"));

app.use("/", frontendRoutes);
app.use("/api", routes);

app.listen(config.connection.port);
