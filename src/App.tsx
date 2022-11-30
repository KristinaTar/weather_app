import React, { useState } from 'react';
import './App.css';
import { useAppDispatch } from "./store/hooks";
import { updateWeatherForCities, addUpdateCity } from "./store/weatherSlicer";
import CitiesList from "./components/CitiesList";
import MoreDetails from "./components/MoreDetails";
import { Box, Button, FormControl, OutlinedInput } from "@mui/material";


function App() {

  const [selectedCityWeather, setSelectedCityWeather] = useState<Weather | null>(null);

  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false)
  const [newCity, setNewCity] = useState<string>('')

  const dispatch = useAppDispatch();
  dispatch(updateWeatherForCities());

  return (
    <div>
      <Box component="form" noValidate autoComplete="off">
        <FormControl sx={{ width: '200px', margin: '20px' }}>
          <OutlinedInput
            placeholder="Please enter city"
            data-testid="searchInput"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
        </FormControl>
        <Button
          data-testid="searchButton"
          onClick={() => {
            dispatch(addUpdateCity(newCity));
            setNewCity(' ');
          }}
        >
          Add
        </Button>
      </Box>
      <CitiesList setSelectedCityWeather={setSelectedCityWeather} setShowMoreDetails={setShowMoreDetails}/>
      {selectedCityWeather && <MoreDetails selectedCityWeather={selectedCityWeather} showMoreDetails={showMoreDetails}/>}

    </div>
  );
}

export default App;
