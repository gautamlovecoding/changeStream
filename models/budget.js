const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    year: Number
  });
  
  const Budget = mongoose.model("Budget", budgetSchema);

  module.exports = Budget;