
const https = require('https');
const key = 'eeaf5eeb260c6b5a4e8730802d80efbe';

function printError(error) {
    console.error(error.message);
}

function printMessage(city, country,  temp) {
    console.log(`Temperature in ${city}, ${country} is ${Math.round( (temp-32)*5/9 )} Degree`);
}
    
function getWeather(city) {
    try {
        https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`, response => {
            if (response.statusCode === 200) {
                let body = "";
                //read the data 
                response.on('data', chunk => {
                    body += chunk.toString();
                });
                response.on('end', () => {
                    try {  
                        //parse data
                        const cityWeather = JSON.parse(body);
                        //print data
                        printMessage(city, cityWeather.sys.country, cityWeather.main.temp);
                    } catch (error) {
                        printError(error);
                    }
                })
            } else {
                const StatusCodeError = new Error(`Problem with getting city name ${city}`);
                printError(StatusCodeError);
            }
        });
    } catch (error) {
        printError(error);
    }
}
    
module.exports.getWeather = getWeather;