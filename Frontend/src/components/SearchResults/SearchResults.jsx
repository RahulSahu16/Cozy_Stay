import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaHeart } from "react-icons/fa";
import axios from "axios";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const city = queryParams.get("city") || "";
  const checkIn = queryParams.get("checkIn") || "";
  const checkOut = queryParams.get("checkOut") || "";

  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/properties/search",
          {
            params: { city, checkIn, checkOut },
          }
        );

        setHomes(res.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setHomes([]);
      } finally {
        setLoading(false);
      }
    };

    if (city && checkIn && checkOut) {
      fetchResults();
    } else {
      setHomes([]);
      setLoading(false);
    }
  }, [city, checkIn, checkOut]);

  const handleFavourite = (homeId) => {
    setFavourites((prev) => {
      const next = prev.includes(homeId)
        ? prev.filter((id) => id !== homeId)
        : [...prev, homeId];
      localStorage.setItem("favourites", JSON.stringify(next));
      return next;
    });
  };

  const handleEdit = (home) => {
    navigate("/host/add-home", { state: { property: home } });
  };

  const getImageUrl = (home) => {
    if (home.images && home.images.length > 0) {
      return home.images[0].startsWith("http")
        ? home.images[0]
        : `http://localhost:5000/uploads/${home.images[0]}`;
    }
    return home.imageURL || home.image || "https://via.placeholder.com/640x480?text=House";
  };

  if (loading)
    return <h2 className="text-center mt-10">Loading search results...</h2>;

  if (homes.length === 0)
    return <h2 className="text-center mt-10">No properties found 😔</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search results for {city}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {homes.map((home) => {
          const isOwner = user && home.owner && home.owner.email === user.email;
          const imageUrl = getImageUrl(home);

          return (
            <div key={home._id} className="border rounded-lg p-4 shadow-md bg-white">
              <img
                src={imageUrl}
                alt={home.title}
                className="h-48 w-full object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/640x480?text=House";
                }}
              />

              <div className="mt-4">
                <h2 className="text-xl font-semibold">{home.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{home.city || home.address || home.location}</p>
                <p className="font-semibold mt-2">₹{home.price} / night</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/homes/${home._id}`)}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                  View Details
                </button>

                {user && (
                  <button
                    onClick={() => handleFavourite(home._id)}
                    className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${
                      favourites.includes(home._id)
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <FaHeart />
                    {favourites.includes(home._id) ? "Saved" : "Add to Favorites"}
                  </button>
                )}

                {isOwner && (
                  <button
                    onClick={() => handleEdit(home)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>
                )}
              </div>

              {home.owner && home.owner.email && (
                <p className="text-xs text-gray-500 mt-3">Hosted by {home.owner.email}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;