const closeBtn = document.querySelector('.close-btn');
const toggleBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', function(){
    sidebar.classList.toggle('show-sidebar');
});
closeBtn.addEventListener('click', function(){
    sidebar.classList.remove('show-sidebar');
});

const img = document.querySelector('img');
const catsContainer = document.getElementById('cats-container');
const API_URL ='https://api.thecatapi.com/v1/images/search'; 
const API_EMAIL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_zGbHakZXB3PQaPjIqz6gWz05V4uIGtQOhwgUv0sAqJyt8aJzfUgS5lKngL3Dp0Wn';
 
const catsLoaded = [];

async function fetchData(urlApi) {
	let res = await fetch(urlApi);
	res = await res.json();
	return res;
}

async function reload(){
    const data = await fetchData(API_URL + '?limit=3' + '&api_key=live_zGbHakZXB3PQaPjIqz6gWz05V4uIGtQOhwgUv0sAqJyt8aJzfUgS5lKngL3Dp0Wn');
	data.forEach(cat => catsLoaded.push(cat));
	catsContainer.innerHTML = null;
	data.forEach(element => {
		catsContainer.innerHTML += `<img src=${element.url} alt="Imágenes aleatorias de gatos" class="cat-image">`
	});
}

reload();

