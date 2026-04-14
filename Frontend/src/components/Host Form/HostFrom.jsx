import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HostForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    totalRooms: "",
    amenities: [],
    rules: "",
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  
  const amenitiesList = ["wifi", "ac", "parking", "tv", "fridge"];

  useEffect(() => {
    if (location.state?.property) {
      const property = location.state.property;
      setForm({
        title: property.title || "",
        description: property.description || "",
        price: property.price || "",
        address: property.address || "",
        totalRooms: property.totalRooms || "",
        amenities: property.amenities || [],
        rules: property.rules || "",
        images: [] // Can't populate files, user needs to re-upload
      });
      setIsEditing(true);
      setPropertyId(property._id);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateDescription = async () => {
  if (!form.title || !form.address || !form.price) {
    alert("Fill title, location and price first");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/generate-description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to generate description");
    }

    setForm((prev) => ({
      ...prev,
      description: data.description,
    }));
  } catch (err) {
    console.error(err);
    alert("Failed to generate description");
  } finally {
    setLoading(false);
  }
  };

  const handleAmenities = (item) => {
    if (form.amenities.includes(item)) {
      setForm({
        ...form,
        amenities: form.amenities.filter((a) => a !== item)
      });
    } else {
      setForm({
        ...form,
        amenities: [...form.amenities, item]
      });
    }
  };

  const handleImageUpload = (e) => {
    setForm({ ...form, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please login first");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("address", form.address);
    formData.append("totalRooms", form.totalRooms);
    formData.append("rules", form.rules);
    form.amenities.forEach(amenity => formData.append("amenities", amenity));
    form.images.forEach(image => formData.append("images", image));

    try {
      setLoading(true);
      const url = isEditing 
        ? `http://localhost:5000/api/properties/${propertyId}`
        : "http://localhost:5000/api/properties";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Property ${isEditing ? 'updated' : 'submitted'} successfully!`);
        if (isEditing) {
          navigate("/AllHomes");
        } else {
          // Reset form
          setForm({
            title: "",
            description: "",
            price: "",
            address: "",
            totalRooms: "",
            amenities: [],
            rules: "",
            images: []
          });
        }
      } else {
        alert(data.error || `Failed to ${isEditing ? 'update' : 'submit'} property`);
      }
    } catch (err) {
      console.log(err);
      alert(err.message || `Error ${isEditing ? 'updating' : 'submitting'} property`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#b5ae9d] flex justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-[#d4c59d]/30 backdrop-blur-lg p-8 rounded-2xl border border-[#6f5e30] shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">
          {isEditing ? "Edit Your Property" : "Host Your Property"}
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Property Title"
          className="w-full p-3 rounded-xl bg-[#b5ae9d]/20 text-white placeholder:text-gray-200 border border-[#b5ae9d]/30 focus:outline-none focus:ring-2 focus:ring-[#b5ae9d]"
          onChange={handleChange}
        />


        {/* Price */}
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price per night"
          className="w-full p-3 rounded-xl bg-[#b5ae9d]/20 text-white placeholder:text-gray-200 border border-[#b5ae9d]/30 focus:outline-none focus:ring-2 focus:ring-[#b5ae9d]"
          onChange={handleChange}
        />

        {/* Location */}
        <input
          type="text"
          name="address"
          value={form.address}
          placeholder="Location"
          className="w-full p-3 rounded-xl bg-[#b5ae9d]/20 text-white placeholder:text-gray-200 border border-[#b5ae9d]/30 focus:outline-none focus:ring-2 focus:ring-[#b5ae9d]"
          onChange={handleChange}
        />

        {/* Rooms */}
        <input
          type="number"
          name="totalRooms"
          value={form.totalRooms}
          placeholder="Total Rooms"
          className="w-full p-3 rounded-xl bg-[#b5ae9d]/20 text-white placeholder:text-gray-200 border border-[#b5ae9d]/30 focus:outline-none focus:ring-2 focus:ring-[#b5ae9d]"
          onChange={handleChange}
        />

        {/* Amenities */}
        <div>
          <p className="text-white mb-2">Amenities</p>
          <div className="flex flex-wrap gap-3">
            {amenitiesList.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => handleAmenities(item)}
                className={`px-4 py-2 rounded-full border transition-all
                ${
                  form.amenities.includes(item)
                    ? "bg-[#b5ae9d] text-[#4a3f1d]"
                    : "bg-transparent text-white border-[#b5ae9d]/40"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        
        {/* Rules */}
        <textarea
          name="rules"
          value={form.rules}
          placeholder="Property Rules"
          className="w-full p-3 rounded-xl bg-[#b5ae9d]/20 text-white placeholder:text-gray-200 border border-[#b5ae9d]/30 focus:outline-none focus:ring-2 focus:ring-[#b5ae9d]"
          onChange={handleChange}
        />

        {/* Images */}
        <div>
          <p className="text-white mb-2">Upload Images</p>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="text-white file:bg-[#b5ae9d] file:text-black file:px-4 file:py-2 file:rounded-lg file:border-none"
          />
        </div>
        
        {/* Description */}
        
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          className="w-full p-3 rounded-xl bg-[#b5ae9d]/20 text-white placeholder:text-gray-200 border border-[#b5ae9d]/30 focus:outline-none focus:ring-2 focus:ring-[#b5ae9d]"
          onChange={handleChange}
        />
        
        <button
          type="button"
          onClick={generateDescription}
          disabled={loading}
          className="bg-[#836f39] text-white px-4 py-2 rounded-lg hover:bg-[#6f5e30] transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "✨ Generate with AI"}
        </button>

        {/* Submit */}
        <button 
          type="submit"
          className="w-full py-3 rounded-xl bg-[#b5ae9d] hover:bg-[#a39c8d] text-black font-semibold transition-all"
        >
          {isEditing ? "Update Property" : "Submit Property"}
        </button>
      </form>
    </div>
  );
};

export default HostForm;