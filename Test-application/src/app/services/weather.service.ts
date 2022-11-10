import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ICityWeather } from '../InterFaces/icity-weather';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {


  CityUrl = 'https://localhost:44311/api/Weather/';
  constructor(private http: HttpClient) { }

  getAutoComplete(q: string) {
    const params = new HttpParams({ fromObject: { apikey: 'SsS1O1ZzRlCzxp3q1v77xenGQVRTjPoV', q: q } });
    console.log(params)
    return this.http.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', { params })
  }

  GetCurrentWeatherLocaly(key: string) {
    //check localy
    return this.http.get(`${this.CityUrl}/GetCity/${key}`)
  }

  getCurrentWeatherFromApi(key: string) {
    const params = new HttpParams({ fromObject: { apikey: 'SsS1O1ZzRlCzxp3q1v77xenGQVRTjPoV' } });
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${key}`;
    return this.http.get(url, { params })
  }

  saveCurrentWheatherInDB( city:ICityWeather) {
    return this.http.post(`${this.CityUrl}/AddtCityWeather`, city);
  }
}



