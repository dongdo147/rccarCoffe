const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (db) => {
  const router = express.Router();
  const carsCollection = db.collection("cars");

  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    try {
      const car = await carsCollection.findOne({ _id: new ObjectId(id) });
      if (!car) return res.status(404).json({ error: "Car not found" });

      res.json(car);
    } catch (err) {
      console.error("Error fetching car:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
