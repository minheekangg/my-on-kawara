const mongoose = require("mongoose");

const { Schema } = mongoose;

const PhotoSchema = new Schema(
    {
        src: { type: String, required: true },
        people: { type: Array, ref: 'Person' },
        location: { type: String },
        date: { type: String, ref: 'Date'},
        city: { type: String, ref: 'Destination'},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Photo", PhotoSchema);