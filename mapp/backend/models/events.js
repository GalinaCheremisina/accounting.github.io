const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    catname: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Events", eventSchema);