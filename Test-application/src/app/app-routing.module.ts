import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { FavoriteCitiesComponent } from './components/favorite-cities/favorite-cities.component';

const routes: Routes = [
  { path: '', redirectTo: 'city', pathMatch: 'full' },
  { path: 'city', component: CityComponent },
  { path: 'favorites', component: FavoriteCitiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
