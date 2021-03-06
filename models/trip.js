const mongoose = require("mongoose");

const { Schema } = mongoose;

const TripSchema = new Schema(
    {
        title: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        people: { type: Array, required: true, ref: 'Person'},
        destinations: { type: Array, required: true, ref: 'Destination' },
        content: { type: String },
        stickers: { type: Array },
        photos: { type: Array, ref: 'Photo' },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);