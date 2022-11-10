using Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
    public class FavoritesBl
    {
        public favorite_cities GetFavoriteCityDal(string id)
        {
            WeatherEntities1 ctx = new WeatherEntities1();
            favorite_cities x1 = ctx.favorite_cities.FirstOrDefault(x => x.CityId == id);
            return x1;
        }

        public void AddtCity(string key, string localizedName)
        {
            using (var ctx = new WeatherEntities1())
            {
                favorite_cities x1 = ctx.favorite_cities.FirstOrDefault(x => x.CityId == key);
                if (x1 == null)
                {
                    ctx.favorite_cities.Add(new favorite_cities()
                    {
                        LocalizedName = localizedName,
                        CityId = key,
                    });
                    ctx.SaveChanges();
                }

            }
        }

        public IEnumerable<favorite_citiesDTO> GetFavoriteCities()
        {
            try
            {
                WeatherEntities1 ctx = new WeatherEntities1();
                IEnumerable<favorite_cities> favoriteCities = ctx.favorite_cities.ToList();
                IList<favorite_citiesDTO> allFavoriteCities = new List<favorite_citiesDTO>(); ;
                foreach (favorite_cities favoriteCity in favoriteCities)
                {
                    favorite_citiesDTO city = new favorite_citiesDTO()
                    {
                        CityId = favoriteCity.CityId,
                        LocalizedName = favoriteCity.LocalizedName
                    };
                    allFavoriteCities.Add(city);
                }
                return allFavoriteCities;
            }
            catch (Exception ex)
            {
                throw new Exception(" error in bringing favorite cities accured!!!!", ex);
            }
        }

        public void DeleteCityFromFavorites(string id)
        {
            WeatherEntities1 ctx = new WeatherEntities1();

            var a = ctx.favorite_cities.SingleOrDefault(t => t.CityId == id); 
            if (a != null)
            {
                ctx.favorite_cities.Remove(a);
                ctx.SaveChanges();
            }
        }
    }
}
