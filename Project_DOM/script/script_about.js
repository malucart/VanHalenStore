if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

function ready() {
	var buttonLatestAlbum = document.getElementsByClassName('header-button')[0].addEventListener('click', latestAlbum);
}

function latestAlbum(event) {
	window.open("https://open.spotify.com/album/5ydOKnIrXsv7AziaSpRzZU?autoplay=true");
}