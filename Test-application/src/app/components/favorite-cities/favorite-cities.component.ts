import { Component, OnInit } from '@angular/core';
import { ICityWeather } from 'src/app/InterFaces/icity-weather';
import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-favorite-cities',
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.css']
})
export class FavoriteCitiesComponent implements OnInit {
  favoriteCities: any;
  localCity: any;
  showDiv: boolean = false;
  cityWeather: any;
  cityWeatherTemperature: any;

  constructor(private favoritesService: FavoritesService, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getFavoriteCities();
  }

  getFavoriteCities() {
    this.favoritesService.getFavoriteCities()
      .subscribe((fc: any) => { this.favoriteCities = fc });
  }

  DeleteCityFromFavorites(city: any) {
    if (city != null) {
      this.showDiv = false;
      this.favoritesService.DeleteCityFromFavorites(city.CityId)
        .subscribe(() => this.getFavoriteCities());
    }
    else
      this.showDiv = true;
  }

  saveCityLocally(city: any) {
    this.localCity = city;
    this.GetCurrentWeather(city.CityId);
  }

  GetCurrentWeather(key: string) {
    key = key.split(' ')[0];   //TODO check wy key comes with space in the end
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
}
