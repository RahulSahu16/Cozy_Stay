import { useNavigate } from "react-router-dom";

function HomeCard({ home, type = "featured" }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group">

      {/* Image */}
      <div className="relative">
        <img
          src={
                home?.imageURL?.startsWith("http")
                  ? home.imageURL
                  : `http://localhost:3000/uploads/${home?.imageURL || ""}`
              }
          alt={home.houseName}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-black px-2 py-1 text-xs font-semibold rounded-md shadow">
          ⭐ {home.rating || 4.5}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1">

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {home.houseName}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-500">
          📍 {home.city}
        </p>

        {/* Price */}
        <p className="text-base font-semibold text-black mt-1">
          ₹{home.price}
          <span className="text-sm text-gray-500 font-normal">
            {" "} / night
          </span>
        </p>

        {/* Only for AllHomes */}
        {type === "full" && (
          <>
            {/* Description */}
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {home.description}
            </p>

            {/* Button */}
            <button onClick={() => navigate(`/homes/${home._id}`)} className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
              View Details
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeCard;