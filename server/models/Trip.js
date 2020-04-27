const mongoose = require("mongoose");

const { Schema } = mongoose;

const TripSchema = new Schema(
    {
        title: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        people: { type: Array, required: true, ref: 'Person'},
        destination: { type: Array, required: true, ref: 'Destination' },
        content: { type: String },
        stickers: { type: Array },
        photos: { type: Array, ref: 'Photo' },
    },
    { timestamps: true }
);

mongoose.model("Trip", TripSchema);