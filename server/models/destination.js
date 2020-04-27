const mongoose = require("mongoose");

const { Schema } = mongoose;

const DestinationSchema = new Schema(
    {
        date: { type: String, required: true },
        destination: { type: String, required: true },
    },
    { timestamps: true }
);

mongoose.model("Destination", DestinationSchema);