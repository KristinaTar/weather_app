export {};
const APiKey = '0e43ba82fc9cae2aea7457683524468f';
const BASE_URL = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid=APiKey'

const cities = ['Kyiv', 'Paris', 'London', 'Toronto', 'Sydney'];


export const getWeatherAPI = (city: string): Promise<Weather> => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APiKey}`)
    .then(response => response.json());
};

