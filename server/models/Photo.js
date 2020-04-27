const mongoose = require("mongoose");

const { Schema } = mongoose;

const PhotoSchema = new Schema(
    {
        src: { type: String, required: true },
        date: { type: String, required: true },
        people: { type: [Schema.Types.ObjectId], required: true, ref: 'Person' },
        location: { type: String },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

mongoose.model("Photo", PhotoSchema);