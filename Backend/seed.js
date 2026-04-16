import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "./models/property.js"; // adjust path if needed

dotenv.config();

// 🔗 Connect DB
mongoose.connect(process.env.Mongo_DB_URL);

// 👇 SAME OWNER (your existing user)
const OWNER_ID = new mongoose.Types.ObjectId("69da002e3d4dd292002454ef");

// 📍 Data pools
const locations = [
  "Jaipur", "Agra", "Varanasi", "Udaipur", "Jodhpur", "Jaisalmer", "Hampi", "Khajuraho", "Lucknow", "Mysuru",
  "Manali", "Shimla", "Darjeeling", "Leh", "Ooty", "Munnar", "Nainital", "Mussoorie", "Gangtok", "Tawang",
  "Goa", "Kochi", "Puducherry", "Visakhapatnam", "Gokarna", "Alappuzha", "Kovalam", "Digha", "Puri", "Chennai",
  "Haridwar", "Rishikesh", "Tirupati", "Amritsar", "Shirdi", "Ayodhya", "Mathura", "Bodh Gaya", "Ujjain", "Dwarka",
  "Mumbai", "New Delhi", "Bengaluru", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Chandigarh", "Surat", "Indore",
  "Coorg", "Spiti", "Kaziranga", "Jim Corbett", "Port Blair", "Auli", "Ziro", "Cherrapunji", "Majuli", "Wayanad",
  "Bhopal", "Gwalior", "Aurangabad", "Nashik", "Ranchi", "Patna", "Dehradun", "Kullu", "Dharamshala", "Madurai",
  "Rameswaram", "Kanyakumari", "Thrissur", "Kozhikode", "Siliguri", "Shillong", "Imphal", "Aizawl", "Itanagar", "Panaji"
];

const amenitiesList = [
  "Free WiFi",
  "Air Conditioning",
  "Heating",
  "Television",
  "Satellite Channels",
  "Room Service",
  "Daily Housekeeping",
  "Laundry Service",
  "Dry Cleaning",
  "Ironing Service",
  "24-Hour Front Desk",
  "Concierge Service",
  "Luggage Storage",
  "Elevator",
  "Non-Smoking Rooms",
  "Smoking Rooms",
  "Family Rooms",
  "Soundproof Rooms",
  "Interconnecting Rooms",
  "Private Bathroom",
  "Bathtub",
  "Shower",
  "Hot Water",
  "Free Toiletries",
  "Hair Dryer",
  "Towels",
  "Bathrobes",
  "Slippers",
  "Minibar",
  "Refrigerator",
  "Microwave",
  "Electric Kettle",
  "Coffee Maker",
  "Complimentary Breakfast",
  "Restaurant",
  "Bar",
  "Snack Bar",
  "Packed Lunches",
  "Special Diet Meals",
  "Swimming Pool",
  "Outdoor Pool",
  "Indoor Pool",
  "Kids Pool",
  "Spa",
  "Wellness Center",
  "Massage",
  "Sauna",
  "Steam Room",
  "Fitness Center",
  "Gym",
  "Yoga Room",
  "Garden",
  "Terrace",
  "Sun Deck",
  "BBQ Facilities",
  "Fireplace",
  "Business Center",
  "Meeting Rooms",
  "Conference Hall",
  "Banquet Hall",
  "Fax/Photocopying",
  "Free Parking",
  "Valet Parking",
  "Accessible Parking",
  "Airport Shuttle",
  "Car Rental",
  "Taxi Service",
  "Bicycle Rental",
  "EV Charging Station",
  "Wheelchair Accessible",
  "Facilities for Disabled Guests",
  "Braille Signage",
  "Pet Friendly",
  "Pet Basket",
  "Pet Bowls",
  "Kids Play Area",
  "Babysitting Service",
  "Kids Club",
  "Game Room",
  "Board Games",
  "Nightclub",
  "Live Entertainment",
  "Beach Access",
  "Private Beach",
  "Water Sports",
  "Ski Storage",
  "Ski Equipment Rental",
  "Golf Course",
  "Tennis Court",
  "Security",
  "CCTV",
  "Safe Deposit Box",
  "24-Hour Security",
  "Smoke Detectors",
  "Fire Extinguishers",
  "Key Card Access",
  "Currency Exchange",
  "ATM",
  "Gift Shop",
  "Salon",
  "Doctor on Call"
];

const rulesList = [
  "Check-in time from 2:00 PM",
  "Check-out time until 11:00 AM",
  "Early check-in subject to availability",
  "Late check-out subject to availability",
  "Valid government ID required at check-in",
  "Minimum age for check-in is 18",
  "Guests must present ID matching booking name",
  "Payment required at check-in",
  "Security deposit may be required",
  "Cash, credit, and debit cards accepted",
  "Cancellation policy applies as per booking",
  "No refund for no-show",
  "Pets allowed on request",
  "Pets not allowed",
  "Service animals allowed",
  "No smoking inside rooms",
  "Smoking allowed only in designated areas",
  "No alcohol consumption in public areas",
  "Unmarried couples allowed",
  "Local ID not accepted",
  "Visitors not allowed in rooms",
  "Visitors allowed until a specific time",
  "Quiet hours between 10:00 PM and 7:00 AM",
  "No loud music or parties",
  "Parties/events not allowed",
  "Damage to property will be charged",
  "Guests are responsible for personal belongings",
  "Hotel not responsible for loss or theft",
  "Illegal activities strictly prohibited",
  "Use of drugs strictly prohibited",
  "Cooking not allowed in rooms",
  "Outside food allowed",
  "Outside food not allowed",
  "Room service available during limited hours",
  "Pool usage as per hotel timings",
  "Gym usage as per hotel timings",
  "Spa services chargeable",
  "Children of all ages are welcome",
  "Children above certain age charged as adults",
  "Extra bed available on request",
  "Extra bed charge applicable",
  "No extra bed available",
  "Baby cot available on request",
  "Pets must be supervised at all times",
  "No photography in restricted areas",
  "Guests must adhere to dress code in public areas",
  "Luggage storage available for limited hours",
  "Airport shuttle available at extra cost",
  "Parking subject to availability",
  "Valet parking available",
  "No hazardous materials allowed",
  "Fire safety rules must be followed",
  "Use of electrical appliances restricted",
  "Lost and found items held for limited time",
  "Management reserves the right of admission",
  "Guests must follow local laws and regulations"
];

const imageCategories = [
  "house",
  "villa",
  "apartment",
  "living-room",
  "bedroom",
  "kitchen",
  "hotel-room"
];

// 🧠 Generator function
const generateProperties = () => {
  return Array.from({ length: 200 }, (_, i) => {
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomRooms = Math.floor(Math.random() * 5) + 1;
    const randomPrice = Math.floor(Math.random() * 4000) + 1000;
    
    return {
      _id: new mongoose.Types.ObjectId(), // ✅ Create unique ObjectId for each property
      title: `Beautiful ${randomRooms} BHK Home in ${randomLocation} #${i + 1}`,
      description: `Enjoy a comfortable stay at this ${randomRooms} bedroom home with modern amenities and great location in ${randomLocation}. Perfect for families and travelers.`,
      price: randomPrice,
      address: randomLocation,
      totalRooms: randomRooms,
      amenities: amenitiesList
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * amenitiesList.length) + 1),
      rules: rulesList[Math.floor(Math.random() * rulesList.length)],
      images: [
        `https://loremflickr.com/400/300/house?random=${i}`,
        `https://loremflickr.com/400/300/interior?random=${i + 100}`,
        `https://loremflickr.com/400/300/living-room?random=${i + 200}`,
      ],
      owner: OWNER_ID, // ✅ All properties belong to same owner
    };
  });
};

// 🚀 Seed Function
const seedDB = async () => {
  try {
    console.log("⏳ Seeding started...");

    await Property.deleteMany(); // optional (clears old data)

    const data = generateProperties();

    await Property.insertMany(data);

    console.log("🔥 25 Properties Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  }
};

seedDB();