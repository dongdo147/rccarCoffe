const express = require("express");
const app = express();
const port = 3000;

// Middleware để parse JSON
app.use(express.json());

// Route đơn giản
app.get("/", (req, res) => {
  res.send("Hello from Node.js + Express!");
});

// Route POST test
app.post("/data", (req, res) => {
  console.log("Received:", req.body);
  res.json({ message: "Data received!", yourData: req.body });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
