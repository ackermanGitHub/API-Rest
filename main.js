const closeBtn = document.querySelector('.close-btn');
const toggleBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', function(){
	loadFavoritesCats();
    sidebar.classList.toggle('show-sidebar');
});
closeBtn.addEventListener('click', function(){
    sidebar.classList.remove('show-sidebar');
});

const catsContainer = document.getElementById('cats-container');
const favoritesCatsContainer = document.getElementById('favorites-cats-container');

const API_URL_RANDOM ='https://api.thecatapi.com/v1/images/search?limit=3'; 
const API_URL_FAVORITES ='https://api.thecatapi.com/v1/favourites?api_key=live_zGbHakZXB3PQaPjIqz6gWz05V4uIGtQOhwgUv0sAqJyt8aJzfUgS5lKngL3Dp0Wn';
const API_KEY = 'live_zGbHakZXB3PQaPjIqz6gWz05V4uIGtQOhwgUv0sAqJyt8aJzfUgS5lKngL3Dp0Wn'; 

const catsLoaded = [];
const favoritesCats = [];

async function loadRandomCats(){
    const res = await fetch(API_URL_RANDOM);
	const data = await res.json();
	data.forEach(cat => catsLoaded.push(cat));
	catsContainer.innerHTML = null;
	data.forEach(element => {
		catsContainer.innerHTML += `
		<input type="radio" name="cat" id=${element.id} />
		<label class="cats-label" for=${element.id}>
			<img class="cats-img" src=${element.url} alt=${element.id}>
		</label>  
		`
	});
}

async function loadFavoritesCats() {
	const res = await fetch(API_URL_FAVORITES);
	const data = await res.json();
	favoritesCatsContainer.innerHTML = null;
	data.forEach(element => {
		favoritesCatsContainer.innerHTML += `
		<button class="favorites-cats-btn" type="buttom">
			<img src=${element.image.url} alt="Imágenes favoritas de gatos" class="favorites-cats-img">
		</button>
		`
	});
}

async function saveFavoriteCat(id) {
	const res = await fetch(API_URL_FAVORITES, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			image_id: id,
		}),
	});
	await loadFavoritesCats();
}