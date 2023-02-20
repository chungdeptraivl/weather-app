// function httpGetAsync(theUrl, resolve) {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve(xmlHttp);
//     }
//     xmlHttp.open("GET", theUrl, true);
//     xmlHttp.send(null)
// }

// const myPromise= new Promise ((resolve, reject)=> {
//     httpGetAsync('https://picsum.photos/200/300', resolve)
// })

// const myPromise2= new Promise ((resolve, reject)=> {
//     httpGetAsync('https://picsum.photos/200/300', resolve)
// })

// const myPromise3= new Promise ((resolve, reject)=> {
//     httpGetAsync('https://picsum.photos/200/300', resolve)
// })
// const myPromise4= new Promise ((resolve, reject)=> {
//     httpGetAsync('https://picsum.photos/200/300', resolve)
// })

// // myPromise.then((data) => {
// //     document.getElementById('img_1').setAttribute('src', data.responseURL)

// //     return myPromise2
// // }).then (data => {
// //     document.getElementById('img_2').setAttribute('src', data.responseURL)
       
// //        return myPromise3

// // }).then ((data) => {
// //     document.getElementById('img_3').setAttribute('src', data.responseURL)

// //     return myPromise4

// // }).catch((err) => {
// //     console.log(err)
// // })

// const executeAsync = async () => {
//    try {
//     const response = await myPromise;
//     console.log(response)
//     document.getElementById('img_1').setAttribute('src', response.responseURL)
    
//     const response2 = await myPromise2;
//     document.getElementById('img_2').setAttribute('src', response2.responseURL)

//     const response3 = await myPromise3;
//     document.getElementById('img_3').setAttribute('src', response3.responseURL)
//    }

//    catch {
//     console.log("error")
//    }
// }
// executeAsync()


const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '318ed6f232387be883d4452be537e849';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './assets/imgs/sun.png';
                    break;

                case 'Rain':
                    image.src = './assets/imgs/rain.png';
                    break;

                case 'Snow':
                    image.src = './assets/imgs/snow.png';
                    break;

                case 'Clouds':
                    image.src = './assets/imgs/sunclound.png';
                    break;

                case 'Haze':
                    image.src = './assets/imgs/wind.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});