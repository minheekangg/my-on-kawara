const mongoose = require("mongoose");

const { Schema } = mongoose;

const DateSchema = new Schema(
    {
        date: { type: String, required: true },
        weather: { type: String },
        photos: { type: Array, ref: 'Photo'}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Date", DateSchema);