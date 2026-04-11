export const isHost = (req, res, next) => {
  if (!req.user.roles.includes("host")) {
    return res.status(403).json({ message: "Only hosts allowed" });
  }

  next();
};