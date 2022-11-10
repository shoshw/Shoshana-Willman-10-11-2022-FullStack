using Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
    public class CityWeatherBl
    {
        public cities_weatherDTO GetCityBl(string id)
        {
            WeatherEntities1 ctx = new WeatherEntities1();
            cities_weather citiesWeather = ctx.cities_weather.FirstOrDefault(x => x.CityId == id);

            if (citiesWeather == null)
            {
                return null;
            }
            //checks if the date of the weather is today's date
            var myFullCurrentDate = DateTime.Now.ToString("yyyy-MM-dd");
            string myCurrentDate = myFullCurrentDate.Split('T')[0];
            string s = citiesWeather.Date;
            if (s == myCurrentDate)
            {
                cities_weatherDTO citiesWeatherDTO = new cities_weatherDTO()
                {
                    CityId = citiesWeather.CityId,
                    Temperature = citiesWeather.Temperature,
                    WeatherText = citiesWeather.WeatherText
                };
                return citiesWeatherDTO;
            }
            else
            {
                ctx.cities_weather.Remove(citiesWeather);
                ctx.SaveChanges();
            }
            return null;
        }

        public void AddtCityWeather(string key, string weatherText, string temperature, string date)
        {
            var ctx = new WeatherEntities1();
            cities_weather citiesWeather = ctx.cities_weather.FirstOrDefault(x => x.CityId == key);
            if (citiesWeather == null)
            {
                string myCurrentDate = date.Split('T')[0];
                ctx.cities_weather.Add(new cities_weather()
                {
                    CityId = key,
                    Temperature = temperature,
                    WeatherText = weatherText,
                    Date = myCurrentDate
                });
                ctx.SaveChanges();
            }
        }
    }
}
