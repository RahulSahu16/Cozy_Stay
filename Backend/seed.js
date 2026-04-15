console.log("🚀 SEED FILE STARTED");
import mongoose from "mongoose";
import User from "./models/User.js";
import Property from "./models/Property.js";

const MONGO_URI = "mongodb://localhost:27017/yourDB";

// ---------- DATA ----------
const names = [
  "Rahul", "Amit", "Priya", "Sneha",
  "Rohit", "Neha", "Arjun", "Pooja"
];

const cities = [
  "Bhilai", "Delhi", "Mumbai",
  "Pune", "Bangalore"
];

const amenitiesList = [
  "WiFi", "AC", "Kitchen", "Parking", "TV"
];

// ---------- SEED ----------
const seedDB = async () => {
  try {
    console.log("Connecting DB...");

    await mongoose.connect(MONGO_URI);

    console.log("DB Connected ✅");

    await Property.deleteMany();

    let users = await User.find();

    console.log("Users found:", users.length);

    if (users.length === 0) {
      console.log("Creating users...");

      for (let i = 0; i < 5; i++) {
        const user = await User.create({
          name: "Test " + i,
          email: `test${i}@mail.com`,
          password: "123456"
        });
        users.push(user);
      }
    }

    console.log("Users ready:", users.length);

    const properties = [];

    for (let i = 0; i < 10; i++) {
      properties.push({
        title: "Test House " + i,
        description: "Nice stay",
        price: 1000,
        address: "Bhilai",
        totalRooms: 2,
        amenities: ["WiFi"],
        rules: "No Smoking",
        images: ["house1.jpg"],
        owner: users[0]._id
      });
    }

    await Property.insertMany(properties);

    console.log("✅ SEED SUCCESS");

    process.exit();

  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
};

seedDB();