using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gui.Models
{
    public class CityWeather
    {
        public string CityId { get; set; }
        public string Temperature { get; set; }
        public string WeatherText { get; set; }
        public string Date { get; set; }
    }
}