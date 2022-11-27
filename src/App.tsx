import React, { useState } from 'react';
import './App.css';
import { useAppDispatch } from "./store/hooks";
import { updateWeatherForCities } from "./store/weatherSlicer";
import CitiesList from "./components/CitiesList";
import MoreDetails from "./components/MoreDetails";

function App() {

  const[selectedCityWeather, setSelectedCityWeather] = useState<Weather>({
    base: "",
    clouds: { all: 0 },
    cod: 0,
    coord: { lat: 0, lon: 0 },
    dt: 0,
    id: 0,
    main: { feels_like: 0, humidity: 0, pressure: 0, temp: 0, temp_max: 0, temp_min: 0 },
    name: "",
    sys: { country: "", id: 0, sunrise: 0, sunset: 0, type: 0 },
    timezone: 0,
    visibility: 0,
    weather: [{ description: "", icon: "", id: 0, main: "" }],
    wind: { deg: 0, gust: 0, speed: 0 }
  });

  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  dispatch(updateWeatherForCities());

  return (
    <div>
      <CitiesList setSelectedCityWeather={setSelectedCityWeather}  setShowMoreDetails={setShowMoreDetails} />
      <MoreDetails selectedCityWeather={selectedCityWeather} showMoreDetails={showMoreDetails} />

    </div>
  );
}

export default App;
