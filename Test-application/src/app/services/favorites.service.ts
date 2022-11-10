import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ICity } from '../InterFaces/icity';



@Injectable({
  providedIn: 'root'
})



export class FavoritesService {
 
  CityUrl = 'https://localhost:44311/api/Favorites/';

  constructor(private http: HttpClient) { }
 
  // addCity(id:string,cityName:string) {
  //   console.log("addCity")
  //   return this.http.get(`${this.CityUrl}/GetCity/${id}`);
    
  // }
  addCityToFavorites(city:ICity){
    return this.http.post(`${this.CityUrl}/AddtCity`,city)
  }

  getFavoriteCities() {
    return this.http.get(`${this.CityUrl}/GetFavoriteCities`)
  }

  DeleteCityFromFavorites(key:string){
    return this.http.delete(`${this.CityUrl}/DeleteCityFromFavorites/${key}`)
  }

}

