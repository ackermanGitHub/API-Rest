const img = document.querySelector('img');
const catsContainer = document.getElementById('cats-container');
const API_URL ='https://api.thecatapi.com/v1/images/search'; 
 
const catsLoaded = [];

async function fetchData(urlApi) {
	let res = await fetch(urlApi);
	res = await res.json();
	return res;
	
}

async function reload(){

    const data = await fetchData(API_URL + '?limit=3');

	data.forEach(cat => catsLoaded.push(cat));

	catsContainer.innerHTML = null;

	data.forEach(element => {
		catsContainer.innerHTML += `<img src=${element.url} alt="Imágenes aleatorias de gatos" class="cat-image">`
	});

}

reload();

