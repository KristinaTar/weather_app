import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCities, getWeather, deleteCity, addUpdateCity } from "../store/weatherSlicer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

const CitiesList: React.FC = () => {
  const cities = useAppSelector(getCities);
  const weather = useAppSelector(getWeather);
  const dispatch = useAppDispatch();

  return (
    <>
      {cities.map((city: any) => (
        <Card key={city} sx={{ backgroundColor: "#d9e8f3" }}>
          <CardContent>
            <Box>
              <Button
                style={{ float: "right", fontWeight: "600" }}
                data-testid={`deleteButton-${city}`}
                onClick={() => dispatch(deleteCity(city))}
              >
                X
              </Button>
              <Typography
                style={{ display: "inline-block" }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {!weather[city] ? "Loading..." : weather[city].name}
              </Typography>
              <Typography
                style={{ display: "inline-block", paddingLeft: "10px" }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                {!weather[city]
                  ? "Loading..."
                  : Math.floor(weather[city].main.temp - 273.15) + " °C"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                variant={"outlined"}
                size="small"
                onClick={() => {
                  dispatch(addUpdateCity(weather[city].name));
                }}
              >
                Update weather
              </Button>
              <Link to={city} style={{ textDecoration: "none" }}>
                <Button variant={"outlined"} size="small" data-testid={`moreDetails-${city}`}>
                  More Details
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CitiesList;
