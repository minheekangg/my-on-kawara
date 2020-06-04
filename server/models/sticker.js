const mongoose = require("mongoose");

const { Schema } = mongoose;

const StickerSchema = new Schema(
    {
        url: { type: String, required: true },
        publicId: { type: String, required: true},
    },
    { timestamps: false }
);

module.exports = mongoose.model("Sticker", StickerSchema);