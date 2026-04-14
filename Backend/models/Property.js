import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  address: String,
  totalRooms: Number,
  amenities: [String],
  rules: String,
  images: [String],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Property", propertySchema);