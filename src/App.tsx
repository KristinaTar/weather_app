import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  updateWeatherForCities,
  addUpdateCity,
  getError,
  ErrorType,
  getCities,
} from "./store/weatherSlicer";
import CitiesList from "./components/CitiesList";
import MoreDetails from "./components/MoreDetails";
import { Alert, Button, Grid, OutlinedInput } from "@mui/material";
import { Route, Routes } from "react-router-dom";

function App() {
  const [newCity, setNewCity] = useState<string>("");
  const [customError, setCustomError] = useState<string>("");
  const error = useAppSelector(getError);
  const cities = useAppSelector(getCities);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateWeatherForCities());
  }, []);

  const handleAddCity = () => {
    dispatch(addUpdateCity(newCity));
    if (cities.includes(newCity.toLowerCase())) {
      setCustomError("City already added!");

      return;
    }
    setNewCity("");
    setCustomError("");
  };

  return (
    <div>
      <Grid
        container
        sx={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          sx={{
            padding: "30px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <OutlinedInput
                placeholder="Please enter city"
                data-testid="searchInput"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCity();
                  }
                }}
              />
            </Grid>
            <Grid item>
              <Button
                sx={{ fontWeight: "600", height: "100%" }}
                data-testid="searchButton"
                variant="contained"
                onClick={handleAddCity}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {error === ErrorType.CityNotFound && <Alert severity="error">No such city!</Alert>}
          {customError.length > 0 && <Alert severity="warning">{customError}</Alert>}
          {error === ErrorType.ServerProblem && (
            <Alert severity="error">Something went wrong!</Alert>
          )}
          <CitiesList />
        </Grid>
        <Grid item>
          <Routes>
            <Route index element={<></>} />
            <Route path="/:selectedCity" element={<MoreDetails />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
