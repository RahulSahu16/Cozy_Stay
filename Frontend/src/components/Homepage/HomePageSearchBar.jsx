import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePageSearchBar() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (!city || !checkIn || !checkOut) {
      alert("Please fill all fields");
      return;
    }

    // ❗ Important validation
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out must be after check-in");
      return;
    }

    navigate(
      `/search?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-[#b5ae9d] p-6 rounded-xl w-[750px] shadow-md">

        {/* Inputs Row */}
        <div className="flex justify-between gap-4 mb-6">
          
          {/* City */}
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md bg-[#e0dcd1] text-black focus:outline-none"
          />

          {/* CheckIn */}
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md bg-[#e0dcd1] text-black focus:outline-none"
          />

          {/* CheckOut */}
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md bg-[#e0dcd1] text-black focus:outline-none"
          />

          {/* Guests */}
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-28 px-4 py-3 rounded-md bg-[#e0dcd1] text-black focus:outline-none"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-[#836f39] text-white px-8 py-3 rounded-md font-medium 
            hover:bg-[#493a0f] hover:scale-105 active:scale-95 
            transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePageSearchBar;