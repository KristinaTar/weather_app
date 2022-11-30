import React from 'react';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCities, getWeather, deleteCity, addUpdateCity } from '../store/weatherSlicer';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {  Button, CardActions } from "@mui/material";


type Props = {
  setSelectedCityWeather: (arg: Weather) => void;
  setShowMoreDetails: (arg: boolean) => void;
}


const CitiesList: React.FC<Props> = ({setSelectedCityWeather,setShowMoreDetails }) => {
  const cities = useAppSelector(getCities);
  const weather = useAppSelector(getWeather);
  const dispatch = useAppDispatch();

  return (
    <>
      {cities.map((city:any) =>
        <Card
          key = {city}
          sx={{
            backgroundColor: '#d9e8f3',
            maxWidth: '300px',
            margin: '20px',
          }}
        >
            <CardContent>
              <Button
                data-testid={`deleteButton-${city}`}
                onClick={()=> dispatch(deleteCity(city))}
              >
                X
              </Button>
              <Typography gutterBottom variant="h5" component="h2">
                {!weather[city] ? "Loading..." : weather[city].name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {!weather[city] ? "Loading..." : Math.floor(weather[city].main.temp - 273.15)+ " °C"}
              </Typography>
              <Button
                onClick={()=> dispatch(addUpdateCity(weather[city].name))}
              >
                Update weather
              </Button>
              <CardActions>
                <Button
                  size="small"
                  style={{margin: '0 auto'}}
                  data-testid={`moreDetails-${city}`}
                  onClick={()=> {
                    setSelectedCityWeather(weather[city]);
                    setShowMoreDetails(true);
                  }}
                >
                  More Details
                </Button>
              </CardActions>

            </CardContent>
        </Card>
      )}
    </>
  );
};

export default CitiesList;
