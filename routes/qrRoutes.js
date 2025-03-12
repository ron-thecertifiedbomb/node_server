import express from "express";
import QRCode from "qrcode";

const router = express.Router();

// Generate QR Code Endpoint
router.get("/generate", async (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Text parameter is required" });
  }

  try {
    const qrCodeData = await QRCode.toDataURL(text);
    res.json({ qrCode: qrCodeData });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

export default router;
