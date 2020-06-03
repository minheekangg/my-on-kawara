const mongoose = require("mongoose");

const { Schema } = mongoose;

const DestinationSchema = new Schema(
    {
        city: { type: String, required: true },
        photos: { type: Array, ref: 'Photo' },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Destination", DestinationSchema);