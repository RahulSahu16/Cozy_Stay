import { useEffect, useState } from "react";
import HomeCard from "../Homepage/HomepageCard";

function AllHomes() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/homes")
      .then((res) => res.json())
      .then((data) => {
        setHomes(data.homes || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 bg-black text-white p-4 text-center mt-4">
        All Homes
    </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {homes.map((home) => (
          <HomeCard key={home._id} home={home} type="full" />
        ))}
      </div>
    </div>
  );
}

export default AllHomes;