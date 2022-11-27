import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWeatherAPI } from '../api';
import { RootState } from "./store";

type CitiesWeather = {[key: string]: Weather};

export interface WeatherState {
  cities: string[];
  loading: 'idle' | 'loading' | 'failed';
  error: string,
  weather: CitiesWeather,
}

export const initialState: WeatherState = {
  cities: ['kyiv', 'paris', 'london', 'toronto', 'sydney'],
  loading: 'idle',
  error: '',
  weather: {},
}

export const updateWeatherForCities = createAsyncThunk<CitiesWeather, void, { state: RootState }>(
  'weather/getWeatherForCities',
  async (_, { getState }) => {
    const cities = getState().weather.cities;
    const weatherData: CitiesWeather = {};
    for (const city of cities) {
      weatherData[city.toLowerCase()] = await getWeatherAPI(city);
    }
    return weatherData;
  },
);

export const weatherSlice = createSlice(
  {
    name: 'weather',
    initialState,
    reducers: {
      deleteCity: (state, action: PayloadAction<string>) => {
        state.cities = state.cities.filter(city => city !== action.payload.toLowerCase());
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateWeatherForCities.pending, (state) => {
          state.loading = 'idle';
        })
        .addCase(updateWeatherForCities.fulfilled, (state, action) => {
          state.loading = 'loading';
          state.weather = action.payload;
        })
        .addCase(updateWeatherForCities.rejected, (state) => {
          state.loading = 'failed';
          state.error = 'Failed to fetch';
        });
    },
  },
);

export const getCities = (state: RootState) => state.weather.cities;
export const getWeather = (state: RootState) => state.weather.weather;
export const { deleteCity } = weatherSlice.actions;

export default weatherSlice.reducer;
