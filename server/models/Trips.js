const mongoose = require("mongoose");

const { Schema } = mongoose;

const TripsSchema = new Schema(
    {
        dates: { type: [String], required: true },
        people: { type: [String], required: true },
        destination: { type: [String], required: true },
        content: { type: String },
    },
    { timestamps: true }
);

TripsSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        dates: [this.dates],
        people: [this.people],
        destination: [this.destination],
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model("Trips", TripsSchema);