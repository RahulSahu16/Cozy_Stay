function HomeHeader({ title, location, rating, reviews }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500">{location}</p>
      <p>⭐ {rating} ({reviews} reviews)</p>
    </div>
  );
}

export default HomeHeader;