using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Bl;
using Gui.Models;

namespace Gui.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Weather")]
    public class WeatherController : ApiController
    {
        [HttpGet]
        [Route("GetCity/{id}")]
        public cities_weatherDTO GetCity(string id)
        {
            CityWeatherBl cw = new CityWeatherBl();
            cities_weatherDTO city = cw.GetCityBl(id);
            return city;
        }

        [HttpPost]
        [Route("AddtCityWeather")]
        public void PostCity(CityWeather city)
        {
            new Bl.CityWeatherBl().AddtCityWeather(city.CityId, city.WeatherText, city.Temperature, city.Date);
        }
    }
}
