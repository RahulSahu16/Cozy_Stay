function HostInfo({ host }) {
  const fallbackHost = {
    name: "Rahul",
    image: "https://i.pravatar.cc/100",
    isSuperhost: true,
    joinedYear: 2020,
    message: "Welcome! I love hosting guests and making their stay comfortable."
  };

  const data = host || fallbackHost;

  return (
    <div className="border-t pt-6 mt-6">

      <h2 className="text-xl font-semibold mb-4">
        Hosted by {data.name}
      </h2>

      <div className="flex items-center gap-4">

        {/* PROFILE IMAGE */}
        <img
          src={data.image}
          alt={data.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* HOST DETAILS */}
        <div>
          <p className="font-semibold">{data.name}</p>

          <p className="text-gray-500 text-sm">
            Hosting since {data.joinedYear}
          </p>

          {data.isSuperhost && (
            <p className="text-green-600 text-sm font-medium">
              ⭐ Superhost
            </p>
          )}
        </div>
      </div>

      {/* MESSAGE */}
      <p className="text-gray-700 mt-4 leading-relaxed">
        {data.message}
      </p>

    </div>
  );
}

export default HostInfo;