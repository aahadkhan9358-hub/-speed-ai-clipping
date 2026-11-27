
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const uploadDir = "/tmp/speed-ai-uploads";

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" +
      Math.round(Math.random() * 1000000) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"));
    }
  }
});

router.get("/status", (req, res) => {
  res.json({
    success: true,
    message: "SPEED Video API is ready"
  });
});

router.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a video"
    });
  }

  res.json({
    success: true,
    message: "Video uploaded successfully",
    fileName: req.file.filename,
    fileSize: req.file.size,
    status: "uploaded"
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
    
