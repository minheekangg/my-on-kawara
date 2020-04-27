const mongoose = require("mongoose");

const { Schema } = mongoose;

const TripSchema = new Schema(
    {
        title: { type: [String], required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        people: { type: [Schema.Types.ObjectId], required: true, ref: 'Person' },
        destination: { type: [Schema.Types.ObjectId], required: true, ref: 'Destination' },
        content: { type: String },
        stickers: { type: [String] },
        photos: { type: [Schema.Types.ObjectId], ref: 'Photo' },
    },
    { timestamps: true }
);

mongoose.model("Trip", TripSchema);