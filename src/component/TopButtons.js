import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Ha Noi",
    },
    {
      id: 2,
      title: "Hue",
    },
    {
      id: 3,
      title: "Nha Trang",
    },
    {
      id: 4,
      title: "Ho Chi Minh",
    },
    {
      id: 5,
      title: "Can Tho",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
