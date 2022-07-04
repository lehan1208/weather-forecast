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
  const [query, setQuery] = useState({ q: "Hoi An" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      getFormattedWeather({ ...query, units }).then((data) => {
        setWeather(data);
        console.log(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  const bgChangeColor = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 25 : 60;
    if (weather.temp < threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br
       from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 
       ${bgChangeColor()}`}
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
