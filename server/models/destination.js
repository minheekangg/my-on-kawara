const mongoose = require("mongoose");

const { Schema } = mongoose;

const DestinationSchema = new Schema(
    {
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        city: { type: String, required: true },
    },
    { timestamps: true }
);

mongoose.model("Destination", DestinationSchema);