import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, getWeatherAPI, updateLocalStorage } from '../api';
import { RootState } from "./store";

type CitiesWeather = { [key: string]: Weather };

export interface WeatherState {
  cities: string[];
  error: ErrorType,
  weather: CitiesWeather,
}

export enum ErrorType {
  NoError,
  CityNotFound,
  ServerProblem,
}

export const initialState: WeatherState = {
  cities: getLocalStorage() || ['kyiv', 'paris', 'london', 'toronto', 'sydney'],
  error: ErrorType.NoError,
  weather: {},
}

export const updateWeatherForCities = createAsyncThunk<CitiesWeather, void, { state: RootState }>(
  'weather/getWeatherForCities',
  async (_, { getState, rejectWithValue }) => {
    const cities = getState().weather.cities;
    const weatherData: CitiesWeather = {};
    for(const city of cities) {
      const res = await getWeatherAPI(city);

      if(res.status === 200) {
        weatherData[city.toLowerCase()] = await res.json() as Weather;
      } else {
        return rejectWithValue('Error');
      }
    }
    return weatherData;
  },
);

export const addUpdateCity = createAsyncThunk(
  'weather/addUpdateCity',
  async (cityName: string, { rejectWithValue }) => {
    const city = cityName.toLowerCase();

    const res = await getWeatherAPI(city);

    if(res.status === 200) {
      return await res.json() as Weather;
    }

    return rejectWithValue('Error');
  },
);

export const weatherSlice = createSlice(
  {
    name: 'weather',
    initialState,
    reducers: {
      deleteCity: (state, action: PayloadAction<string>) => {
        state.cities = state.cities.filter((city: any) => city !== action.payload.toLowerCase());
        updateLocalStorage(state.cities);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateWeatherForCities.fulfilled, (state, action) => {
          state.weather = action.payload;
        })
        .addCase(updateWeatherForCities.rejected, (state) => {
          state.error = ErrorType.ServerProblem;
        });

      builder
        .addCase(addUpdateCity.pending, (state, action) => {
          const cityName = action.meta.arg.toLowerCase();
          delete state.weather[cityName];
        })
        .addCase(addUpdateCity.fulfilled, (state, action) => {
          const cityName = action.payload.name.toLowerCase();
          if (!state.cities.includes(cityName)) {
            state.cities.push(cityName);
            updateLocalStorage(state.cities);
          }
          state.weather[cityName] = action.payload;
        })
        .addCase(addUpdateCity.rejected, (state) => {
          state.error = ErrorType.CityNotFound;
        });

      builder
        .addMatcher((action) => action.type.endsWith("/fulfilled"),
          (state) => {
            state.error = ErrorType.NoError;
          });
    },
  },
);

export const getCities = (state: RootState) => state.weather.cities;

export const getWeather = (state: RootState) => state.weather.weather;
export const getError = (state: RootState) => state.weather.error;
export const { deleteCity } = weatherSlice.actions;

export default weatherSlice.reducer;
