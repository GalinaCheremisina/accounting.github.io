const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Category", categorySchema);