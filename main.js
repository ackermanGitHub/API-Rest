const img = document.querySelector('img');
const API_URL ='https://api.thecatapi.com/v1/images/search'; 

async function fetchData(urlApi) {
	const response = await fetch(urlApi);
	const data = await response.json();
	return data;
}

async function reload(){
    const data = await fetchData(API_URL)
    img.src = data[0].url;
}