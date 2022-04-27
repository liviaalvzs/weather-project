var checkbox = document.querySelector(".change-theme-checkbox");

checkbox.addEventListener('change', function() {
  if (this.checked) {
    document.querySelector("link[href='light-style.css']").href = "dark-style.css";
  } else {
    document.querySelector("link[href='dark-style.css']").href = "light-style.css";
  }
});

document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;
    if(input !== ''){
        clearInfo('');
        showWarning('carregando...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=0ffd9bf2c2f2511ccf36c39b661f31ba&units=metric&lang=pt_br`
        let results = await fetch(url);
        let json = await results.json();
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showWarning('Localização não encontrada! :( Será que você não se enganou?');
        } 
    }else{
        clearInfo();
    }
}
);

function showWarning(message){
    document.querySelector('.aviso').innerHTML = message;
}

function showInfo(json){
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`; 
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';

}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}