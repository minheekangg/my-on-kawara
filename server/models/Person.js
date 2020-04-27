const mongoose = require("mongoose");

const { Schema } = mongoose;

const PersonSchema = new Schema(
    {
        name: { type: String, required: true },
        img: { type: String },
    },
    { timestamps: true }
);

mongoose.model("Person", PersonSchema);