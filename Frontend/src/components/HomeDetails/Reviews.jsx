function Reviews({ reviews }) {
  const fallbackReviews = [
    { user: "Rahul", comment: "Great stay!" },
    { user: "Amit", comment: "Very clean and comfortable." }
  ];

  const data = reviews && reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Reviews</h2>

      {data.map((review, i) => (
        <div key={i} className="border-b py-2">
          <p className="font-semibold">{review.user}</p>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;