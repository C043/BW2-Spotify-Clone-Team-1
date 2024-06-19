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

  const artistTile = document.querySelector(`#${id} .artist-main img`);
  const artistTitle = document.querySelector(`#${id} .artist-title h5`);
  artistTitle.innerText = data.artist.name;
  artistTile.src = data.artist.picture;
  artistTile.alt = data.artist.name;

  const albums = document.querySelectorAll(`#${id} .album-main img`);
  const albumTitles = document.querySelectorAll(`#${id} .album-title h5`);
  const albumTileName = document.querySelectorAll(`#${id} .album-title p`);

  for (let x = 4; x >= 0; x--) {
    const currentElement = obj.data[x];
    for (let i = 0; i < albums.length; i++) {
      const currentAlbum = albums[x];
      const titles = albumTitles[x];
      const artist = albumTileName[x];
      currentAlbum.src = currentElement.album.cover;
      currentAlbum.alt = currentElement.album.title;
      titles.innerText = currentElement.album.title;
      artist.innerText = currentElement.artist.name;
    }
  }
};

domManipulation("grimes");
domManipulation("dua-lipa");
domManipulation("good-boy-daisy");
