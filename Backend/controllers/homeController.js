import Home from "../models/Home.js";

export const createHome = async (req, res) => {
  try {
    const newHome = new Home(req.body);
    const savedHome = await newHome.save();

    res.status(201).json(savedHome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};