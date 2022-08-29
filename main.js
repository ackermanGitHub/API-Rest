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

const api = axios.create({
	baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_XTd3skGaIZ4bJVqKnaa6db01fvPZ2JdPqIoGzLMYq5fsi1IVvbKsg2IIkzwm4IKM';

const catsContainer = document.getElementById('cats-container');
const favoritesCatsContainer = document.getElementById('favorites-cats-container');

const API_KEY = 'live_zGbHakZXB3PQaPjIqz6gWz05V4uIGtQOhwgUv0sAqJyt8aJzfUgS5lKngL3Dp0Wn'; 
const API_KEY2 = 'live_XTd3skGaIZ4bJVqKnaa6db01fvPZ2JdPqIoGzLMYq5fsi1IVvbKsg2IIkzwm4IKM'; 
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2'; 
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const catsLoaded = [];
let currentCats = [];
let favoritesCats = [];

async function loadRandomCats(){
    const res = await fetch(API_URL_RANDOM);
	const data = await res.json();
	data.forEach(cat => catsLoaded.push(cat));
	catsContainer.innerHTML = null;
	currentCats = [];
	data.forEach(element => {
		currentCats.push(element);
		catsContainer.innerHTML += `
		<input type="radio" name="cat" id=${element.id} class="hidden-input"/>
		<label class="cats-label" for=${element.id}>
			<img class="cats-img" src=${element.url} alt="random cat">
		</label>  
		`
	});
}

async function loadFavoritesCats() {
	const res = await fetch(API_URL_FAVORITES);
	const data = await res.json();
	favoritesCatsContainer.innerHTML = null;
	favoritesCats = [];
	data.forEach(element => {
		favoritesCats.push(element);
		favoritesCatsContainer.innerHTML += `
		<input type="radio" name="cat" id=${element.id} class="hidden-input"/>
		<label class="favorites-cats-label" for=${element.id}>
			<img class="favorites-cats-img" src=${element.image.url} alt="Imágenes favoritas de gatos">
		</label>  
		`
	});
}

async function saveFavoriteCat(id) {
	const res = await api.post('/favourites', {
		image_id: id,
	});
	await loadFavoritesCats();
}

async function checkCat() {
	let checkedCat = false;
	checkedCat = currentCats.find(element => document.getElementById(element.id).checked);
	if(checkedCat) {
		saveFavoriteCat(checkedCat.id);
	}
}

async function deleteFavoriteCat(id) {
	const res = await fetch(API_URL_FAVORITES_DELETE(id), {
		method: 'DELETE',
	});
	await loadFavoritesCats();
}

async function checkFavoriteCat() {
	let checkedCat = false;
	checkedCat = favoritesCats.find(element => document.getElementById(element.id).checked);
	if(checkedCat) {
		deleteFavoriteCat(checkedCat.id);
	}
}

async function uploadCatPhoto(){
	const form = document.getElementById('uploading-form');
	const formData = new FormData(form);
	console.log('aqui', formData);
	const res = await fetch(API_URL_UPLOAD, {
		method: 'POST',
		headers: {
			'X-API-Key': API_KEY,
		},
		body: formData,
	})
	console.log('aqui1', res);
	const data = await res.json(res);
	console.log('aqui2', data);
	saveFavoriteCat(data.id)
}

const uploadInput = document.getElementById('uploading-file');
const inputValue = document.querySelector('.uploading-file-value');
uploadInput.style.display = 'none';
uploadInput.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
	const file = uploadInput.files[0];
	const para = document.createElement('p');
	para.textContent = `File name: ${file.name}, file size ${returnFileSize(file.size)}.`;
	const image = document.createElement('img');
	const button = document.createElement('button');

	para.className = "uploaded-image-props";
	image.className = "uploaded-image";

	button.className = "upload-btn";
	button.type = "button";
	button.innerHTML = "Upload";

	image.src = URL.createObjectURL(file);

	inputValue.appendChild(para);
	inputValue.appendChild(image);
	inputValue.appendChild(button);
}
function returnFileSize(number) {
	if (number < 1024) {
	  return `${number} bytes`;
	} else if (number >= 1024 && number < 1048576) {
	  return `${(number / 1024).toFixed(1)} KB`;
	} else if (number >= 1048576) {
	  return `${(number / 1048576).toFixed(1)} MB`;
	}
  }