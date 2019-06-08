const weatherReport = require('./weather');

//Name of cities to get the weather update
const citys = ['Nashik', 'New York', 'London', 'Mumbai'];

for(const city of citys) {
    weatherReport.getWeather(city);   
}