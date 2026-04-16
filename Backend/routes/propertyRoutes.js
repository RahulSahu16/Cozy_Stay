import express from "express";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";
import cors from "cors";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  updateProperty,
} from "../controllers/PropertyController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Preflight
router.options("/", cors());

// ✅ IMPORTANT: specific routes first
router.get("/properties", getAllProperties);
router.post("/properties",protect, upload.array("images"), createProperty);

router.get("/properties/search", async (req, res) => {
  try {
    const { city, checkIn, checkOut } = req.query;

    const searchRegex = new RegExp(city, "i");
    const properties = await Property.find({
      $or: [
        { city: { $regex: searchRegex } },
        { address: { $regex: searchRegex } },
      ],
    }).populate("owner", "email");

    const availableProperties = [];

    for (let property of properties) {
      const bookings = await Booking.find({
        propertyId: property._id,
        status: "confirmed",
      });

      let isAvailable = true;

      for (let booking of bookings) {
        if (
          new Date(checkIn) < booking.checkOut &&
          new Date(checkOut) > booking.checkIn
        ) {
          isAvailable = false;
          break;
        }
      }

      if (isAvailable) {
        availableProperties.push(property);
      }
    }

    res.json(availableProperties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed" });
  }
});

// Dynamic routes after
router.get("/properties/:id", getPropertyById);
router.delete("/:id", protect, deleteProperty);
router.put("/:id", protect, upload.array("images", 10), updateProperty);

export default router;