import { useEffect, useState } from "react";
import HomeCard from "../Homepage/HomepageCard";
import { useNavigate } from "react-router-dom";

function AllHomes() {
  const [homes, setHomes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch homes
    fetch("http://localhost:5000/api/properties")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setHomes(data);
      })
      .catch((err) => {
        console.log(err);
        setHomes([]); // ensure it's array
      });
  }, []);

  const handleDelete = async (homeId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${homeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setHomes(homes.filter((home) => home._id !== homeId));
        alert("Property deleted successfully");
      } else {
        alert("Failed to delete property");
      }
    } catch (err) {
      console.log(err);
      alert("Error deleting property");
    }
  };

  const handleEdit = (home) => {
    // Navigate to host form with property data for editing
    navigate("/host/add-home", { state: { property: home } });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 bg-black text-white p-4 text-center mt-4">
        All Homes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {homes.map((home) => (
          <div key={home._id} className="relative">
            <HomeCard home={home} type="full" />
            {user && home.owner?.email === user.email && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(home)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(home._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllHomes;