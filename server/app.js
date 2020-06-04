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
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const logger = require("morgan");

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "LightBlog",
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    })
);

if (!isProduction) {
    app.use(errorHandler());
}

// Add models
require('./models/Trip');
require('./models/Photo');
require('./models/Person');
require('./models/Destination');
require('./models/Sticker');

// Add routes
app.use(require("./routes"));

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

if (!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err
            }
        });
    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {}
        }
    });
});

const server = app.listen(8000, () =>
    console.log("Server started on http://localhost:8000")
);
