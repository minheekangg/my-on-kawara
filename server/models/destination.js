const mongoose = require("mongoose");

const { Schema } = mongoose;

const DestinationSchema = new Schema(
    {
        dates: { type: Array, ref: 'Date', required: true },
        city: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Destination", DestinationSchema);