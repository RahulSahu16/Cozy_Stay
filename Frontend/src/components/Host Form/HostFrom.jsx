import { useState } from "react";

const HostForm = () => {
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

  const amenitiesList = ["wifi", "ac", "parking", "tv", "fridge"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">
          Host Your Property
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10"
          onChange={handleChange}
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10"
          onChange={handleChange}
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price per night"
          className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10"
          onChange={handleChange}
        />

        {/* Location */}
        <input
          type="text"
          name="address"
          placeholder="Location"
          className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10"
          onChange={handleChange}
        />

        {/* Rooms */}
        <input
          type="number"
          name="totalRooms"
          placeholder="Total Rooms"
          className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10"
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
                className={`px-4 py-2 rounded-full border 
                ${
                  form.amenities.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <p className="text-white mb-2">Upload Images</p>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="text-gray-300"
          />
        </div>

        {/* Rules */}
        <textarea
          name="rules"
          placeholder="Property Rules"
          className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10"
          onChange={handleChange}
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
};

export default HostForm;