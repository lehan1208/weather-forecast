import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items }) {
  // console.log(items);
  return (
    <div className="">
      <div className="flex items-center justify-start mt-4">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white shadow-gray-400">
        {items.map((item, index) => (
          <div
            className="flex flex-col justify-center items-center"
            key={index}
          >
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt=""
              className="w-12 my-1"
            />
            <p className="font-medium ">{item.temp.toFixed()}&deg;C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
