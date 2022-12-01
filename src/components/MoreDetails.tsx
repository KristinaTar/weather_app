import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { getCities, getWeather } from "../store/weatherSlicer";

const MoreDetails: React.FC = () => {
  const { selectedCity } = useParams();
  const cities = useAppSelector(getCities);
  const weather = useAppSelector(getWeather);

  const selectedCityWeather = useMemo(() => {
    if (!selectedCity) return null;

    const _selectedCity = selectedCity.toLowerCase();
    if (!cities.includes(_selectedCity)) {
      return null;
    }

    return weather[_selectedCity];
  }, [selectedCity, weather]);

  return (
    <>
      {selectedCityWeather && (
        <Card
          sx={{
            backgroundColor: "#d9e8f3",
            width: "500px",
            height: "400px",
            marginTop: "30px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <Typography gutterBottom variant="h3" id="detailsName">
              {selectedCityWeather.name}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              <Typography variant="h5" fontWeight={700} display={"inline"}>
                Feels like:{" "}
              </Typography>
              {Math.floor(selectedCityWeather.main.feels_like - 273.15) + " °C"}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              <Typography variant="h5" fontWeight={700} display={"inline"}>
                Humidity:{" "}
              </Typography>
              {selectedCityWeather.main.humidity + " %"}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              <Typography variant="h5" fontWeight={700} display={"inline"}>
                Pressure:{" "}
              </Typography>
              {selectedCityWeather.main.pressure + " kPa"}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              <Typography variant="h5" fontWeight={700} display={"inline"}>
                Wind speed:{" "}
              </Typography>
              {selectedCityWeather.wind.speed + " m/s"}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              <Typography variant="h5" fontWeight={700} display={"inline"}>
                Clouds:{" "}
              </Typography>
              {selectedCityWeather.clouds.all + " %"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MoreDetails;
