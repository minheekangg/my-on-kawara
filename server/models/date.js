const mongoose = require("mongoose");

const { Schema } = mongoose;

const DateSchema = new Schema(
    {
        date: { type: String, required: true },
        weather: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Date", DateSchema);