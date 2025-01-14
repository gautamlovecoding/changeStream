const express = require("express");
const router = express.Router();
const User = require("../models/user");
const NgoProfile = require("../models/ngoProfile");
const Budget = require("../models/budget");

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create Budget
router.post("/budget", async (req, res) => {
  const { name, amount, year } = req.body;
  try {
    const budget = new Budget({ name, amount, year });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Error creating budget", error: err });
  }
});
// Create NgoProfile
router.post("/ngo", async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const ngo = new NgoProfile({ name, amount, year });
    await ngo.save();
    res.status(201).json(ngo);
  } catch (err) {
    res.status(500).json({ message: "Error creating ngo", error: err });
  }
});
// Update NgoProfile By Id
router.post("/ngo/:id", async (req, res) => {
  try {
    const ngo = await NgoProfile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ngo) return res.status(404).send("User not found");
    res.json(ngo);
  } catch (err) {
    res.status(500).json({ message: "Error creating ngo", error: err });
  }
});

// Update a Budget
router.put("/budget/:id", async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!budget) return res.status(404).send("User not found");
    res.json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user
router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
