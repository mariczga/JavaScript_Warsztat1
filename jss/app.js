document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed!");

    async function getWeatherData() {
        try {
            let response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=3fa5b75c988a416bb75103930202009&q=katowice&days=5');
            let result = await response.json();
            return result;
        } catch (e) {
            console.warn(e);
        }
    }

    getWeatherData().then(result => main(result))

    function addRowToMain(row) {

        let table = document.getElementById('mainTable');
        let newRow = table.insertRow();
        newRow.insertCell(0).appendChild(row);
    }

    function createCurrentWeatherRow(weatherData) {

        let row = document.createElement('tr');

        let icon = row.insertCell(0).innerHTML = `
                   <img src="${weatherData.current.condition.icon}"> 
                    `;

        let locationTemp = row.insertCell(1).innerHTML = `
                    <table>
                        <tr><td>${weatherData.location.name}</td> </tr>
                        <tr><td>${weatherData.current.temp_c}</td></tr>
                    </table> 
                    `;

        let additionalInfo = row.insertCell(2).innerHTML = `
                    <table>
                     
                       <tr><td><i class="material-icons grey middle">south</i>${weatherData.current.pressure_mb}</td></tr>
                       <tr><td><i class="material-icons blue middle">invert_colors</i>${weatherData.current.humidity}</td></tr>
                       <tr><td><i class="material-icons grey middle">toys</i>${weatherData.current.wind_kph}</td></tr>
                    </table> 
                    `;



        return row;
    }

    function createWeatherForecastRow(weatherData) {

        let row = document.createElement('tr');
        for(let i = 1; i < 3; i++){
            let icon = row.insertCell().innerHTML = `
                  
                      <table>
                       <tr><td> ${getDaysOfWeek(weatherData.forecast.forecastday[i].date) }</td></tr>
                       <tr><td><img src="${weatherData.forecast.forecastday[i].day.condition.icon}"> </td></tr>
                       <tr><td> ${weatherData.forecast.forecastday[i].day.maxtemp_c}</td></tr>
                    
                    </table> 
                   `;

        }
        return row;
    }

    function createWeatherTable(weatherData){
        let weatherTable = document.createElement('table');
        weatherTable.setAttribute('class','center');
        weatherTable.setAttribute('style', 'width:100%');
        let currentWeatherRow = weatherTable.insertRow();
        currentWeatherRow.insertCell(0).appendChild(createCurrentWeatherRow(weatherData));
        let forecastRow = weatherTable.insertRow();
        forecastRow.insertCell(0).appendChild(createWeatherForecastRow(weatherData));
        return weatherTable
    }

    function getDaysOfWeek(date){
        let a = new Date(date);
        let days = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];
        let dayOfWeek = days[a.getDay()];
        return dayOfWeek;
    }



    
    function main(weatherData) {
        console.log(weatherData);
        console.log(createWeatherTable(weatherData));
        addRowToMain(createWeatherTable(weatherData));
        //addRowToMain(createCurrentWeatherRow(weatherData));
        //addRowToMain(createWeatherForecastRow(weatherData));

    }



});