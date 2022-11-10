using Bl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Gui.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Favorites")]
    public class FavoritesController : ApiController
    {
        [HttpPost]
        [Route("AddtCity")]
        public void PostCity(City city)
        {
            new Bl.FavoritesBl().AddtCity(city.Key, city.LocalizedName);
        }

        [HttpGet]
        [Route("GetFavoriteCities")]
        public IEnumerable<favorite_citiesDTO> GetFavoriteCities()
        {
            return new FavoritesBl().GetFavoriteCities();
        }

        [HttpDelete]
        [Route("DeleteCityFromFavorites/{id}")]
        public void DeleteCityFromFavorites(string id)
        {
            
            try
            {
                new FavoritesBl().DeleteCityFromFavorites(id);
                
            }
            catch (Exception ex)
            {
               
            }
        }
    }
}
