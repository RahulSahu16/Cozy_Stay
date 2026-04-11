function SimilarHomes({ homes }) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Similar Homes</h2>

      <div className="grid grid-cols-3 gap-4">
        {(homes || []).map((item) => (
          <div key={item._id} className="border rounded-lg p-2">
            <img
              src={`http://localhost:3000/${item.image}`}
              className="h-32 w-full object-cover rounded"
            />
            <p className="mt-2 font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarHomes;