export {};
const APiKey = '0e43ba82fc9cae2aea7457683524468f';


export const getWeatherAPI = (city: string): Promise<Response> => {
  return fetch(`http://api.openweathermap.org1/data/2.5/weather?q=${city}&appid=${APiKey}`);
};

export const updateLocalStorage = (cities: string[]) => {
  localStorage.setItem('weather-data', JSON.stringify(cities));
}

export const getLocalStorage = () => {
  const data = localStorage.getItem('weather-data');
  if(!data) {
    return null;
  }

  return JSON.parse(data) as string[];
}


