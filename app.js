var button = document.querySelector(".Button")
var inputValue = document.querySelector(".inputValue")
var City = document.querySelector(".name")
var desc = document.querySelector(".desc")
var temp = document.querySelector(".temp")
var APIkey = '9d14e82c4e8162ec137b168cfd92ba56'
let lat,lon

async function getCOORD(){
    try{
        const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + 
        inputValue.value +"&limit=5&appid=" + APIkey)
        
        const data = await response.json()
        lat = data[0]["lat"]
        lon = data[0]["lon"]
        getWeatherData(lat,lon)    
    }
    catch(err){
        alert('Incorrect Input/City does not exist')
    }        
}

async function getWeatherData(lat,lon){
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+
    lat + "&lon=" + lon + "&appid=" + APIkey)

    const data = await response.json()
    CityVal = data["name"]
    CountryVal = data["sys"]['country']
    tempVal = data["main"]["temp"] -273.15
    descVal = data["weather"][0]["description"]

    City.innerHTML = CityVal + ', ' + CountryVal
    temp.innerHTML = Math.round(tempVal * 100) / 100 + ' °C'
    desc.innerHTML = descVal
}


button.addEventListener('click', getCOORD)
inputValue.addEventListener('keypress',function(event){
    if (inputValue.value.length >0 && event.keyCode === 13){
        getCOORD()
        
    }
})
