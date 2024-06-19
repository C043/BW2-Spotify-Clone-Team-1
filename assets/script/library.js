import { token } from "./token.js";

const get = async artist => {
  try {
    const response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist, {
      headers: {
        "x-rapidapi-key": token,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });
    const artistObj = await response.json();
    return artistObj;
  } catch (error) {
    console.log(error);
  }
};

const domManipulation = async id => {
  const obj = await get(id);
  const data = await obj.data[0];
  console.log(obj);

  const sectionTitle = document.querySelector(`#${id} h2`);
  sectionTitle.innerText = data.artist.name;

  const artistCard = document.querySelector(`#${id} .artist-main`);
  const artistImg = document.querySelector(`#${id} .artist-main img`);
  const artistTitle = document.querySelector(`#${id} .artist-title h5`);
  artistTitle.innerText = data.artist.name;
  artistImg.src = data.artist.picture;
  artistImg.alt = data.artist.name;
  artistCard.onclick = function () {
    window.location.replace("./artist.html?artistId=" + data.artist.id);
  };

  const albums = document.querySelectorAll(`#${id} .album-main img`);
  const albumTitles = document.querySelectorAll(`#${id} .album-title h5`);
  const albumTileName = document.querySelectorAll(`#${id} .album-title p`);

  for (let x = 4; x >= 0; x--) {
    const currentElement = obj.data[x];
    for (let i = 0; i < albums.length; i++) {
      const currentAlbum = albums[x];
      const title = albumTitles[x];
      const artist = albumTileName[x];
      currentAlbum.src = currentElement.album.cover;
      currentAlbum.onclick = function () {
        window.location.replace("./album.html?albumId=" + currentElement.album.id);
      };

      currentAlbum.alt = currentElement.album.title;
      title.innerText = currentElement.album.title;
      title.onclick = function () {
        window.location.replace("./album.html?albumId=" + currentElement.album.id);
      };

      artist.innerText = currentElement.artist.name;
      artist.onclick = function () {
        window.location.replace("./artist.html?artistId=" + currentElement.artist.id);
      };
    }
  }
};

domManipulation("grimes");
domManipulation("dua-lipa");
domManipulation("good-boy-daisy");
