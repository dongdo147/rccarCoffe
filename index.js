const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 🧰 Middleware
app.use(express.json());
app.use(cors()); // bật CORS cho tất cả domain
// hoặc app.use(cors({ origin: "http://localhost:3000" })) nếu muốn giới hạn

let db;

// 🧠 Kết nối MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db("rcoffe");
  console.log("✅ Connected to MongoDB (rcoffe)");
}

// 🚀 Khởi động server
async function startServer() {
  await connectToMongoDB();

  // Import router
  const carsRouter = require("./routes/cars")(db);
  app.use("/cars", carsRouter);

  // Route test
  app.get("/", (req, res) => res.send("☕ RCoffee API running with MongoDB + CORS"));

  app.listen(port, () => {
    console.log(`🚗 Server listening at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Failed to start:", err);
});
