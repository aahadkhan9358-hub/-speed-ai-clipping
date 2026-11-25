
const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    success: true,
    message: "SPEED Video API is ready"
  });
});

router.post("/generate", (req, res) => {
  const { prompt, duration } = req.body;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({
      success: false,
      message: "Video prompt is required"
    });
  }

  res.json({
    success: true,
    message: "Video request received",
    prompt: prompt.trim(),
    duration: duration || 10,
    status: "pending"
  });
});

module.exports = router;
