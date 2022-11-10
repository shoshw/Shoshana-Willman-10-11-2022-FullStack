import { Component, OnInit } from '@angular/core';
import { ICity } from 'src/app/InterFaces/icity';
import { ICityWeather } from 'src/app/InterFaces/icity-weather';
import { WeatherService } from 'src/app/services/weather.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: any;
  cityWeather: any;
  chosenCityName: any;
  chosenCityKey: any;
  cityUsername: string = '';
  cityWeatherTemperature: any;


  constructor(private favoritesService: FavoritesService, private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getAutoComplete(q: string) {
    this.weatherService.getAutoComplete(q)
      .subscribe((cities: any) => this.cities = cities);
  }

  GetCurrentWeather(key: string, cityName: string) {
    this.chosenCityName = cityName;
    this.chosenCityKey = key;
    this.weatherService.GetCurrentWeatherLocaly(key).subscribe((cityWeather: any) => {
      //when city in db:
      if (cityWeather) {
        this.cityWeather = cityWeather
        this.cityWeatherTemperature = cityWeather.Temperature
      }
      //when city not in db:
      else {
        this.weatherService.getCurrentWeatherFromApi(key)
          .subscribe((cityWeater: any) => {
            this.cityWeather = cityWeater[0];
            this.cityWeatherTemperature = this.cityWeather.Temperature.Metric.Value;
            let city: ICityWeather = {
              CityId: key,
              Date: cityWeater[0].LocalObservationDateTime,
              WeatherText: cityWeater[0].WeatherText,
              Temperature: (cityWeater[0].Temperature.Metric.Value).toString()
            }
            this.weatherService.saveCurrentWheatherInDB(city)
              .subscribe();
          })
      }

    })
  }

  addCityToFavorites(Key: string, LocalizedName: string): void {
    //check if a spesific city was chosen
    if (Key && LocalizedName) {
      let city: ICity = {
        Key: Key,
        LocalizedName: LocalizedName
      }
      this.favoritesService.addCityToFavorites(city)
        .subscribe();
    }

  }

}
