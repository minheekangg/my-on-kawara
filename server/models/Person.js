const mongoose = require("mongoose");

const { Schema } = mongoose;

const PersonSchema = new Schema(
    {
        src: { type: String, required: true },
        date: { type: String, required: true },
        Person: { type: [Schema.Types.ObjectId], required: true, ref: 'Person' },
        location: { type: String },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

mongoose.model("Person", PersonSchema);