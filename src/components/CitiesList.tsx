import React from 'react';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCities, getWeather, deleteCity } from '../store/weatherSlicer';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions } from "@mui/material";


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
      {cities.map(city =>
        <Card
          key = {city}
          sx={{
            backgroundColor: '#eeeeee',
            maxWidth: '300px',
            margin: '20px',
          }}
        >
          <CardActionArea>
            <CardContent>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',

              }}>
              <Button
                onClick={()=> dispatch(deleteCity(weather[city].name))}
              >
                X
              </Button>
              </Box>
              <Typography gutterBottom variant="h5" component="h2">
                {!weather[city] ? "Loading..." : weather[city].name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {!weather[city] ? "Loading..." : Math.floor(weather[city].main.temp - 273.15)+ " °C"}
              </Typography>
              <CardActions>
                <Button
                  size="small"
                  style={{margin: '0 auto'}}
                  onClick={()=> {
                    setSelectedCityWeather(weather[city]);
                    setShowMoreDetails(true);
                  }}
                >
                  More Details
                </Button>
              </CardActions>

            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default CitiesList;
