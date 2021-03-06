require("dotenv").config();
if (process.env.MONGODB_URI) {
    // connect to the mongodb
    const mongoose = require("mongoose");
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    mongoose.Promise = global.Promise;
    mongoose.connection
        .on("connected", () => {
            console.log(
                `Mongoose connection open on ${process.env.MONGODB_URI}`
            );
        })
        .on("error", err => {
            console.log(`Connection error: ${err.message}`);
        });

    process.on("SIGINT", function() {
        mongoose.connection.close(function() {
            console.log("Mongoose disconnected on app termination");
            process.exit(0);
        });
    });
} else {
    console.log("unconfigured mongo db");
}

const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// const session = require("express-session");
const errorHandler = require("errorhandler");
const logger = require("morgan");

const app = express();

const isProduction = process.env.NODE_ENV === "production";

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
    app.use(errorHandler());
} 

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Add models
require('./models/trip');
require('./models/photo');
require('./models/person');
require('./models/destination');
require('./models/sticker');

// Add routes
app.use(require("./routes"));

// Send anything that doesn't match above to the react client
app.get('*', (req, res) => {
    console.log('will pass do', __dirname);
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {}
        }
    });
});

const server = app.listen(process.env.PORT || 8000, () =>
    console.log("Server started on " + process.env.PORT || 8000)
);
