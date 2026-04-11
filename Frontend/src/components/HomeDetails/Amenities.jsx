function Amenities({ amenities }) {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">Amenities</h2>
      <div className="grid grid-cols-2 gap-2">
        {amenities.map((item, i) => (
          <p key={i}>✔ {item}</p>
        ))}
      </div>
    </div>
  );
}

export default Amenities;