import { useState } from "react";

function Description({ text }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <p>
        {showMore ? text : text.slice(0, 120)}...
      </p>

      <button onClick={() => setShowMore(!showMore)} className="text-blue-500">
        {showMore ? "Show less" : "Read more"}
      </button>
    </div>
  );
}

export default Description;