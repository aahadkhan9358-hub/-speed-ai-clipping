
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

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Video prompt is required"
    });
  }

  res.json({
    success: true,
    message: "Video request received",
    prompt,
    duration: duration || 10,
    status: "pending"
  });
});

module.exports = router;
