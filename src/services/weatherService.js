import { DateTime } from "luxon";

const API_KEY = "b474b3c0edf83edc10db027d7eee41ed";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly,alert&units=metric&appid=b474b3c0edf83edc10db027d7eee41ed

// https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=7ca54501db62d50295b9dce3ffd309c3&units=metric

const getWeatherData = (infoType, searchParams) => {
  // searchParams is an object
  const url = new URL(BASE_URL + "/" + infoType);
  console.log(url);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      alert("Invalid Value");
    });
};
const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];
  // console.log(weather[0]);

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    weather,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
    details,
    icon,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });
  // console.log(hourly);

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then((data) => formatCurrentWeather(data));

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lon,
    lat,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then((data) => formatForecastWeather(data));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};
// Using luxon format
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time:  'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { iconUrlFromCode, formatToLocalTime };
