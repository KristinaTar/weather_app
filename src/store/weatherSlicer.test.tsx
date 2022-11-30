import {store} from './store'
import { addUpdateCity, deleteCity } from "./weatherSlicer";
import { initialState } from './weatherSlicer';




describe('Weather redux state tests', () => {
  it('Should initially check if cities exist in the state', () => {
    const cities = store.getState().weather.cities;
    expect(cities).toEqual(['kyiv', 'paris', 'london', 'toronto', 'sydney'])
  })

  it('Should be able to fetch weather for the city', async () => {
    const cities1 = store.getState().weather.cities;
    expect(cities1).not.toContain('milan');

    const result = await store.dispatch(addUpdateCity('Milan'))
    const res = result.payload as Weather;

    expect(result.type).toBe('weather/addUpdateCity/fulfilled')
    expect(res.name).toEqual('Milan')

    const cities2 = store.getState().weather.cities;
    expect(cities2).toContain('milan');
  })

  it ('Should delete city', async() => {
    const result = await store.dispatch(deleteCity('Singapore'));
    const cities = store.getState().weather.cities;
    expect(result.type).toBe('weather/deleteCity')
    expect(cities).not.toContain('Singapore');
  })
})
