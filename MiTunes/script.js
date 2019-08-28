(function(window, undefined){

	function loadAlbums() {
		var albumsSelector = document.querySelector("#albums");
		albumsSelector.innerHTML = ""
		for (var i = 0; i < albums.length; i++) {
			var title = albums[i].title;
			var albumHtml = "<option value='" + i + "'>" + title + "</option>"
			albumsSelector.innerHTML+=albumHtml;
		};
		loadTracks();
	}

	function loadTracks() {
		var albumId = getSelectedAlbum();
		document.querySelector("#artist").innerText = albums[albumId].artist
		document.querySelector("#album").innerText = albums[albumId].title

		var trackSelector = document.querySelector("#trackList");
		trackSelector.innerHTML = "";
		for (var i = 0; i < albums[albumId].tracks.length; i++) {
			var title = albums[albumId].tracks[i].title;
			var trackHtml = "<option value='" + i + "'>" + title + "</option>"
			trackSelector.innerHTML+=trackHtml;
		};


	}

	function playSong() {
		var albumId = getSelectedAlbum();
		var trackId = getSelectedTrack();

		document.querySelector("#current-image").src = "MiTunes/artwork/" + albums[albumId].artwork + ".jpg";
		document.querySelector("#current-artist").innerText = albums[albumId].artist;
		document.querySelector("#current-album").innerText = albums[albumId].tracks[trackId].title;
		document.querySelector("#current-lyrics").innerText = albums[albumId].tracks[trackId].lyrics;

		var audio = document.querySelector("audio")
		document.querySelector("audio source").src = "MiTunes/Audio/" + albums[albumId].artist + "/" + albums[albumId].title + "/" + albums[albumId].tracks[trackId].mp3
		audio.load();
		audio.play();

	}



	function getSelectedAlbum() {
		return document.querySelector("#albums").value || 0;
	}

	function getSelectedTrack() {
		return document.querySelector("#trackList").value || 0;
	}

	function search(term) {
		console.log(term)
	}

	function clearSearchList() {
		document.querySelector("#results").innerHTML = "";
	}

window.y = {
	"album1":{
		"trackTitle":["lyrics", "lyrics2"],
		"trackTitle2":["lyrisfasdfsdfcs"],
	},
	"album2":{

	}
}


	window.x = function addSearchItems(arr) {
		clearSearchList();
		var results = document.querySelector("#results");
		var newHTML = ""
		for (var title in arr){
			var row = "<li>"
		    if (arr.hasOwnProperty(title)) {
		        row+="<div class='li-heading'>" + title + "</div><ul>"
		    	for (var trackTitle in arr[title]) {
		    		var trackRow = "<li>"
		    		if (arr[title].hasOwnProperty(trackTitle)) {
		    			trackRow += "<div class='li-heading'>" + trackTitle + "</div>"
		    		}
		    		row+=trackRow + "</li>";
		    	}

		    }
		    newHTML += row + "</ul></li>";
		}

		results.innerHTML += newHTML;
	}



	document.addEventListener("DOMContentLoaded", function(){
		loadAlbums();

		document.querySelector("#albums").addEventListener("change", loadTracks)
		document.querySelector("#trackList").addEventListener("change", playSong)


		// keyboard
		var letters = document.querySelectorAll("#dose-letters span")
		var searchbox = document.querySelector("#searchbox");

		for (var i = 0; i < letters.length; i++) {
			letters[i].addEventListener("mousedown", function(){
				searchbox.value += (this.innerText)
				searchbox.dispatchEvent(new Event("input"))
			});
		};

		document.querySelector("#backspace").addEventListener("mousedown", function(){
			searchbox.value = searchbox.value.substring(0, searchbox.value.length-1);
			searchbox.dispatchEvent(new Event("input"))
		});

		document.querySelector("#reset").addEventListener("mousedown", function(){
			searchbox.value = ""
			searchbox.dispatchEvent(new Event("input"))
		});

		searchbox.addEventListener("input", function(){
			search(this.value);
		});

	});



})(window)