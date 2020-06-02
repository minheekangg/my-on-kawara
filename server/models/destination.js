const mongoose = require("mongoose");

const { Schema } = mongoose;

const DestinationSchema = new Schema(
    {
        city: { type: String, required: true },
        photos: { type: Array, ref: 'Photo' },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Destination", DestinationSchema);