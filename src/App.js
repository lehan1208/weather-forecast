// eslint-disable-next-line no-unused-vars
import UilReact from "@iconscout/react-unicons/icons/uil-react";

import "./App.css";
import TopButtons from "./component/TopButtons";
import Input from "./component/Input";
import TimeAndLocation from "./component/TimeAndLocation";
import TempAndDetails from "./component/TempAndDetails";
import Forecast from "./component/Forecast";
import getFormattedWeather from "./services/weatherService";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "Hanoi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [bgImage, setBgImage] = useState("clear");

  useEffect(() => {
    const fetchWeather = async () => {
      getFormattedWeather({ ...query, units })
        .then((data) => {
          setWeather(data);
          setBgImage(data.weather[0].main);
          // console.log(data.name);
        })
        .catch((err) => console.log("Dang co loi", err));
    };
    fetchWeather();
  }, [query, units]);

  // const bgChangeColor = () => {
  //   if (!weather) return "from-cyan-700 to-blue-700";
  //   const threshold = units === "metric" ? 28 : 60;
  //   if (weather.temp < threshold) return "from-cyan-700 to-blue-700";
  //   return "from-yellow-700 to-orange-700";
  // };
  // ${bgChangeColor()}
  // bg-gradient-to-br
  //      from-cyan-700 to-blue-700
  // [url('https://source.unsplash.com/600x900/?clear')]

  console.log(bgImage);

  return (
    <div
      className={` w-full bg-cover bg-center mx-auto max-w-screen-md my-6 py-5 px-32 
      h-fit shadow-xl shadow-gray-400 overflow-y-hidden`}
      style={{
        backgroundImage: `url(https://source.unsplash.com/768x1024/?${bgImage})`,
      }}
    >
      <TopButtons setQuery={setQuery} />
      <Input setUnits={setUnits} units={units} setQuery={setQuery} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;
