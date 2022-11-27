import React from 'react';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


type Props = {
  selectedCityWeather: Weather;
  showMoreDetails: boolean;
}

const MoreDetails : React.FC<Props>= ({selectedCityWeather, showMoreDetails}) => {

  return (
    <>
      {showMoreDetails &&
        <Card
          sx={{
            backgroundColor: '#eeeeee',
            maxWidth: '300px',
            margin: '20px',
            display: 'flex',
            alignItem: 'center',
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {selectedCityWeather.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Feels like: { Math.floor(selectedCityWeather.main.feels_like - 273.15)+ " °C"}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Humidity: {selectedCityWeather.main.humidity}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Pressure: {selectedCityWeather.main.pressure}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Wind speed: {selectedCityWeather.wind.speed}
              </Typography>

            </CardContent>
          </CardActionArea>
        </Card>
      }
    </>
  );
};

export default MoreDetails;
