const express = require("express");
const app = express();

// Expose runtime config to the widget without embedding secrets in static files
app.get("/config.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Cache-Control", "no-store");
  res.send(`window.KINKAS_API_KEY = ${JSON.stringify(process.env.KINKAS_API_KEY || "")};`);
});

app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || 3000);
