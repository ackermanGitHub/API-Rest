console.log('Hello World');

const API_URL ='https://api.thecatapi.com/v1/images/search'; 

async function reload(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    })
}