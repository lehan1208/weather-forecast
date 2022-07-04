import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TempAndDetails({
  weather: {
    sunrise,
    sunset,
    timezone,
    humidity,
    temp_min,
    temp_max,
    temp,
    feels_like,
    speed,
    icon,
    details,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex items-center justify-between flex-row py-6 text-white">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20 " />

        <p className="text-5xl"> {temp.toFixed()}&deg;</p>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-center font-light text-sm">
            <UilTemperature size={18} className="mr-1" />
            Real feels:
            <span className="font-medium ml-1">
              {feels_like.toFixed()}&deg;C
            </span>
          </div>

          <div className="flex items-center justify-center font-light text-sm">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{humidity.toFixed()}%</span>
          </div>

          <div className="flex items-center justify-center font-light text-sm">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{speed.toFixed(1)}km/h</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center font-light text-white space-x-2 text-sm py-3 ">
        <UilSun />
        <p className="font-light">
          Rise{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light text-xl mx-1 ">|</p>
        <UilSunset />
        <p className="font-light">
          Set{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light text-xl mx-1 ">|</p>
        <UilSunset />
        <p className="font-light">
          High{" "}
          <span className="font-medium ml-1">{temp_max.toFixed()}&deg;C</span>
        </p>
        <p className="font-light text-xl mx-1 ">|</p>
        <UilSunset />
        <p className="font-light">
          Low{" "}
          <span className="font-medium ml-1">{temp_min.toFixed()}&deg;C</span>
        </p>
      </div>
    </div>
  );
}

export default TempAndDetails;
