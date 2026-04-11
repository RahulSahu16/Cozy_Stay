function BookingCard({ price, roomsLeft }) {
  return (
    <div className="border p-4 rounded-xl shadow-md sticky top-20">
      <h2 className="text-xl font-semibold">₹{price} / night</h2>
      <p className="text-red-500">Only {roomsLeft} rooms left</p>

      <button className="bg-black text-white w-full py-2 mt-4 rounded">
        Reserve
      </button>
    </div>
  );
}

export default BookingCard;