import Amenities from "../components/homeDetails/Amenities";
import Reviews from "../components/homeDetails/Reviews";
import SimilarHomes from "../components/homeDetails/SimilarHomes";
import HostInfo from "../components/homeDetails/HostInfo";
import ImageGallery from "../components/homeDetails/ImageGallery";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function HomeDetails() {
  const { homeId } = useParams();

  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👉 NEW STATE
  const [selectedRooms, setSelectedRooms] = useState(1);

  // ================= FETCH =================
  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:5000/api/properties/${homeId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch home");
        }

        const data = await res.json();
        setHome(data);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [homeId]);

  // ================= RESERVE =================
  const handleReserve = async () => {
    try {
      if (!home) return;

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login first");
        return;
      }

      // Step 1: Create booking
      const bookingRes = await fetch("http://localhost:5000/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId: home._id,
          roomsBooked: Number(selectedRooms),
        }),
      });

      const bookingData = await bookingRes.json();

      if (!bookingRes.ok) {
        throw new Error(bookingData.message || "Booking failed");
      }

      console.log("Booking created:", bookingData);

      const bookingId = bookingData.booking._id;
      const totalAmount = bookingData.booking.totalPrice;

      // Step 2: Initiate Razorpay Payment
      const paymentRes = await fetch("http://localhost:5000/api/booking/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          bookingId,
          amount: totalAmount,
        }),
      });

      const paymentData = await paymentRes.json();

      console.log("💳 Payment Response Status:", paymentRes.status);
      console.log("💳 Payment Response Data:", paymentData);

      if (!paymentRes.ok) {
        const errorMsg = paymentData.message || paymentData.details || "Payment initiation failed";
        console.error("❌ Payment Error Details:", errorMsg);
        throw new Error(errorMsg);
      }

      console.log("Payment order created:", paymentData);

      // Step 3: Open Razorpay Checkout
      const options = {
        key: paymentData.order.key_id,
        amount: paymentData.order.amount,
        currency: paymentData.order.currency,
        name: "Dream Stays",
        description: `Booking for ${home.title}`,
        order_id: paymentData.order.id,
        handler: async function (response) {
          console.log("Payment response:", response);

          // Step 4: Verify payment on backend
          const verifyRes = await fetch("http://localhost:5000/api/booking/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              bookingId,
              orderId: paymentData.order.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok) {
            alert("Payment verification failed: " + verifyData.message);
            return;
          }

          alert("Booking confirmed! Payment successful 🎉");
          console.log("Payment verified:", verifyData);
          // Redirect or refresh
          setTimeout(() => window.location.href = "/", 2000);
        },
        prefill: {
          email: localStorage.getItem("userEmail") || "",
        },
        theme: {
          color: "#000000",
        },
      };

      const window_razorpay = new window.Razorpay(options);
      window_razorpay.open();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ================= UI STATES =================
  if (loading)
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading home details...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!home)
    return (
      <div className="text-center mt-20 text-gray-500">
        No home data found
      </div>
    );

  // ================= IMAGES =================
  const images =
    home.images && home.images.length > 0
      ? home.images.map((img) =>
          img.startsWith("http")
            ? img
            : `http://localhost:5000/uploads/${img}`
        )
      : ["https://via.placeholder.com/800x400?text=No+Image"];

  // ================= MAIN UI =================
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* IMAGE */}
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <ImageGallery images={images} />
        </div>

        {/* HEADER */}
        <div className="mt-8 flex flex-col gap-3">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {home.title}
          </h1>

          <p className="text-gray-500 text-lg">{home.address}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
            <span>👤 {home.guests || 4} guests</span>
            <span>🛏 {home.bedrooms || 2} bedrooms</span>
            <span>🛌 {home.beds || 2} beds</span>
            <span>🛁 {home.bathrooms || 1} bath</span>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-10">

            <section className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">
                About this place
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {home.description}
              </p>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm">
              <HostInfo host={home.owner} />
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm">
              <Amenities
                amenities={
                  home.amenities || ["WiFi", "AC", "Kitchen", "Parking"]
                }
              />
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm">
              <Reviews
                reviews={
                  home.reviews || [
                    { user: "Rahul", comment: "Great stay!" },
                    { user: "Amit", comment: "Very clean." }
                  ]
                }
              />
            </section>

          </div>

          {/* RIGHT - BOOKING */}
          <div className="sticky top-24 h-fit">
            <div className="bg-white rounded-3xl shadow-xl p-6 border">

              {/* PRICE */}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  ₹{home.price}
                </h2>
                <span className="text-sm text-gray-500">/ night</span>
              </div>

              {/* ROOMS LEFT */}
              <p className="text-red-500 text-sm mt-2 font-medium">
                ⚡ Only {home.totalRooms || 3} rooms left
              </p>

              {/* DATE */}
              <div className="mt-5 space-y-3">
                <input type="date" className="w-full border rounded-xl p-3" />
                <input type="date" className="w-full border rounded-xl p-3" />

                {/* 👉 ROOMS INPUT */}
                <input
                  type="number"
                  min="1"
                  max={home.totalRooms || 1}
                  value={selectedRooms}
                  onChange={(e) => setSelectedRooms(e.target.value)}
                  className="w-full border rounded-xl p-3"
                  placeholder="Rooms"
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handleReserve}
                className="bg-black hover:bg-gray-900 text-white w-full py-3 mt-6 rounded-xl font-semibold text-lg"
              >
                Reserve Now
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                No payment required yet
              </p>

            </div>
          </div>

        </div>

        {/* SIMILAR */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            🔥 Similar stays you might like
          </h2>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <SimilarHomes homes={home.similarHomes || []} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomeDetails;