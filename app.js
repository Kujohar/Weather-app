var button = document.querySelector(".Button")
var inputValue = document.querySelector(".inputValue")
var City = document.querySelector(".name")
var desc = document.querySelector(".desc")
var temp = document.querySelector(".temp")
var APIkey = '9d14e82c4e8162ec137b168cfd92ba56'

button.addEventListener('click',function(){
 
    try{
        fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + 
        inputValue.value +"&limit=5&appid=" + APIkey)
        .then(response => response.json())
        .then(data => {
            lat = data[0]["lat"]
            lon = data[0]["lon"]
            console.log(data)
            
        })
    
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+
        lat + "&lon=" + lon + "&appid=" + APIkey)
        .then(response => response.json())
        .then(data => {
            CityVal = data["name"]
            CountryVal = data["sys"]['country']
            tempVal = data["main"]["temp"] -273.15
            descVal = data["weather"][0]["description"]

            console.log(data)

            City.innerHTML = CityVal + ', ' + CountryVal
            temp.innerHTML = Math.round(tempVal * 100) / 100 + ' °C'
            desc.innerHTML = descVal
        })
        
        
    }
    catch{err => alert("Wrong City Name!")}
})
