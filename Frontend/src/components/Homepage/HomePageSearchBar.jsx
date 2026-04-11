function HomePageSearchBar() {
    return (
        <div className="flex justify-center mt-10">
        <div className="bg-[#b5ae9d] p-6 rounded-xl w-[700px] shadow-md">
          {/* Inputs Row */}
          <div className="flex justify-between gap-4 mb-6">
            {/* City */}
            <input
              type="text"
              placeholder="City"
              className="flex-1 px-4 py-3 rounded-md bg-[#e0dcd1] text-black focus:outline-none"
            />

            {/* Date */}
            <input
              type="date"
              className="flex-1 px-4 py-3 rounded-md bg-[#e0dcd1] text-black focus:outline-none"
            />

            {/* Guests */}
            <input
              type="number"
              placeholder="Guests"
              className="w-32 px-4 py-3 rounded-md bg-[#e0dcd1] text-black focus:outline-none"
            />
          </div>

          {/* Button Row */}
          <div className="flex justify-center">
            <button
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