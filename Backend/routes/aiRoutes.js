import express from "express";

const router = express.Router();

router.post("/generate-description", async (req, res) => {
  try {
    const data = req.body;

    const templates = [
      `Experience a comfortable stay at this ${data.title} located in ${data.address}. Perfectly priced at ₹${data.price} per night, this property offers ${data.totalRooms} rooms with modern amenities like ${data.amenities.join(", ")}. Ideal for families and travelers seeking convenience and comfort.`,

      `Welcome to your perfect getaway in ${data.address}! This ${data.title} features ${data.totalRooms} rooms and essential amenities including ${data.amenities.join(", ")}. At just ₹${data.price} per night, it's a great choice for a relaxing stay.`,

      `Discover a cozy stay at this ${data.title} in ${data.address}. With ${data.totalRooms} rooms and facilities like ${data.amenities.join(", ")}, this property ensures a pleasant experience. Affordable pricing at ₹${data.price} makes it even better.`
    ];

    // random template
    const description =
      templates[Math.floor(Math.random() * templates.length)];

    res.json({ description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

export default router;