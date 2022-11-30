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
            backgroundColor: '#d9e8f3',
            width: '500px',
            height: '400px',
            float: 'right',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-260px',
            marginLeft: '-150px',
          }}
        >
          {/*<CardActionArea> */}
            <CardContent  sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',

            }}>
              <div data-testid="detailsName">
              <Typography gutterBottom variant="h3" component="h2" >
                {selectedCityWeather.name}
              </Typography>
              </div>
              <Typography variant="h5" color="textSecondary" component="p">
                <Typography variant="h5" fontWeight={700} display={'inline'}>Feels like: </Typography>
                { Math.floor(selectedCityWeather.main.feels_like - 273.15)+ " °C"}
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p">
                <Typography variant="h5" fontWeight={700} display={'inline'}>Humidity: </Typography>
                {selectedCityWeather.main.humidity + " %"}
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p">
                <Typography variant="h5" fontWeight={700} display={'inline'}>Pressure: </Typography>
                 {selectedCityWeather.main.pressure + " kPa"}
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p">
                <Typography variant="h5" fontWeight={700} display={'inline'}>Wind speed: </Typography>
                {selectedCityWeather.wind.speed + " m/s"}
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p">
                <Typography variant="h5" fontWeight={700} display={'inline'}>Clouds: </Typography>
                 {selectedCityWeather.clouds.all + " %"}
              </Typography>
            </CardContent>
          {/*</CardActionArea>*/}
        </Card>
      }
    </>
  );
};

export default MoreDetails;
