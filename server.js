const express = require("express");

const BACKEND_URL = process.env.BACKEND_URL || 'https://web-payments-prototype-production.up.railway.app';

const app = express();
app.use(express.json());

// Proxy: charge — forwards to backend with API key added server-side
app.post("/proxy/charge", async (req, res) => {
  const apiKey = process.env.KINKAS_API_KEY;
  if (!apiKey) return res.status(503).json({ success: false, error: 'Payment service not configured' });
  try {
    const response = await fetch(`${BACKEND_URL}/payments/charge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: 'Payment service unavailable' });
  }
});

// Proxy: status — forwards to backend with API key added server-side
const REF_RE = /^[A-Z0-9]{6,40}$/;
app.get("/proxy/status/:reference", async (req, res) => {
  if (!REF_RE.test(req.params.reference)) return res.status(400).json({ success: false, error: 'Invalid reference' });
  const apiKey = process.env.KINKAS_API_KEY;
  if (!apiKey) return res.status(503).json({ success: false, error: 'Payment service not configured' });
  try {
    const response = await fetch(`${BACKEND_URL}/payments/status/${encodeURIComponent(req.params.reference)}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: 'Payment service unavailable' });
  }
});

app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || 3000);
