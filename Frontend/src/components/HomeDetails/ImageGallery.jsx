function ImageGallery({ images }) {
  const fallback = [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d1b"
  ];

  const imgs = images && images.length >= 5 ? images : fallback;

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] mb-10">

      {/* BIG IMAGE */}
      <img
        src={imgs[0]}
        alt="main"
        className="col-span-2 row-span-2 w-full h-full object-cover rounded-l-2xl"
      />

      {/* SMALL IMAGES */}
      {imgs.slice(1, 5).map((img, i) => (
        <img
          key={i}
          src={img}
          alt="home"
          className={`w-full h-full object-cover ${
            i === 1 ? "rounded-tr-2xl" : ""
          } ${i === 3 ? "rounded-br-2xl" : ""}`}
        />
      ))}
    </div>
  );
}

export default ImageGallery;