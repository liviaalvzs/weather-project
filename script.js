document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;
    if(input !== ""){
        showWarning('carregando...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=0ffd9bf2c2f2511ccf36c39b661f31ba&units=metric&lang=pt_br`
        let results = await fetch(url);
        let json = await results.json();

        console.log(json);
    }
});

function showWarning(message){
    document.querySelector('.aviso').innerHTML = message;
}