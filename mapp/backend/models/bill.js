const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
    value: { type: Number, required: true },
    currency: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Bill", billSchema);