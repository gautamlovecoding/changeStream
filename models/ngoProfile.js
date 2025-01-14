const mongoose = require("mongoose");

const NgoProfileSchema = new mongoose.Schema({
  name: String,
  role: String,
  isActive: { type: Boolean, default: true },
  email: String,
});

const NgoProfile = mongoose.model("NgoProfile", NgoProfileSchema);

module.exports = NgoProfile;
