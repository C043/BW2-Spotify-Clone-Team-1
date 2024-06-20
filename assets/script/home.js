import { token } from "./token.js";
import { libraryGen } from "./library.js";
/* fetch search */
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

/* generatore di sezioni */
const sectionGen = async id => {
  const obj = await get(id);
  const data = await obj.data[0];
  console.log(obj);

  const main = document.getElementById("main");

  const section = document.createElement("section");
  section.id = id;
  section.className = "row";

  const sectionHeaderCon = document.createElement("div");
  sectionHeaderCon.className = "col-12 d-flex align-items-center mb-3";

  const header = document.createElement("h2");
  header.className = "h3";
  header.innerText = data.artist.name;

  const showAll = document.createElement("a");
  showAll.className = "text-secondary  ms-auto";

  const artistCon = document.createElement("div");
  artistCon.className = "col-6 col-md-3 rounded-3 px-3 py-1 rounded-3 col-lg-3 col-xl-3 d-md-block d-lg-block";

  const artistCard = document.createElement("div");
  artistCard.className = "card border-0 artist-main ";
  artistCard.onclick = function () {
    window.location.replace("./artist.html?artistId=" + data.artist.id);
  };

  const artistImg = document.createElement("img");
  artistImg.className = "card-img-top";
  artistImg.src = data.artist.picture_xl;
  artistImg.alt = data.artist.name;

  const artistCardBody = document.createElement("div");
  artistCardBody.className = "card-body d-flex flex-column px-0 artist-title";

  const artistTitle = document.createElement("a");
  artistTitle.className = "card-title h6 line-clamp-1";
  artistTitle.innerText = data.artist.name;
  artistTitle.href = "./artist.html?artistId=" + data.artist.id;

  const artist = document.createElement("p");
  artist.className = "text-secondary";
  artist.innerText = "Artist";

  sectionHeaderCon.append(header, showAll);
  artistCardBody.append(artistTitle, artist);
  artistCard.append(artistImg, artistCardBody);
  artistCon.append(artistCard);
  section.append(sectionHeaderCon, artistCon);

  const albumId = [];
  let counter = 1;
  for (let i = 0; i <= 2; i++) {
    let currentElement = obj.data[i];
    while (albumId.includes(currentElement.album.id || currentElement.artist.name !== id)) {
      currentElement = obj.data[i + counter];
      console.log(currentElement.album.id);
      counter++;
    }
    albumId.push(currentElement.album.id);

    const albumCardCon = document.createElement("div");
    switch (i) {
      case 0:
        albumCardCon.className = "col-6 col-md-3 rounded-3 px-3 py-1 rounded-3 col-lg-3 col-xl-3 d-md-block d-lg-block";
        break;
      case 1:
        albumCardCon.className =
          "col-6 col-md-3 rounded-3 px-3 py-1 rounded-3 col-lg-3 col-xl-3 d-none d-md-block d-lg-block";
        break;
      case 2:
        albumCardCon.className =
          "col-6 col-md-3 rounded-3 px-3 py-1 rounded-3 col-lg-3 col-xl-3 d-none d-md-block d-lg-block";
        break;
      case 3:
        albumCardCon.className = "col-6 col-md-3 rounded-3 px-3 py-1 rounded-3 p-1 col-lg-3 col-xl-3 d-none d-xl-block";
        break;
      case 4:
        albumCardCon.className = "col-6 col-md-3 rounded-3 px-3 py-1 rounded-3 p-1 col-lg-3 col-xl-3 d-none d-xl-block";
        break;
    }

    const albumCard = document.createElement("div");
    albumCard.className = "card border-0 album-main";

    const albumImg = document.createElement("img");
    albumImg.className = "card-img-top";
    albumImg.src = currentElement.album.cover_xl;
    albumImg.alt = currentElement.album.title;
    albumImg.onclick = function () {
      window.location.replace("./album.html?albumId=" + currentElement.album.id);
    };

    const albumCardBody = document.createElement("div");
    albumCardBody.className = "card-body d-flex flex-column justify-content-between px-0 album-title";

    const albumTitle = document.createElement("a");
    albumTitle.className = "card-title h6  line-clamp-1";
    albumTitle.innerText = currentElement.album.title;
    albumTitle.href = "./artist.html?albumId=" + currentElement.album.id;

    const albumArtist = document.createElement("a");
    albumArtist.className = "card-text text-secondary album-artist  line-clamp-1";
    albumArtist.innerText = currentElement.artist.name;
    albumArtist.href = "./artist.html?artistId=" + currentElement.artist.id;

    albumCardBody.append(albumTitle, albumArtist);
    albumCard.append(albumImg, albumCardBody);
    albumCardCon.append(albumCard);
    section.append(albumCardCon);
  }

  main.append(section);
};

/* manipolazione del banner */
const bannerManipulation = async id => {
  const obj = await get(id);
  const data = await obj.data[0];

  const bannerImg = document.querySelector(".banner-img img");
  bannerImg.src = data.album.cover_big;
  bannerImg.alt = data.album.title;

  const bannerAlbum = document.getElementById("banner-album");
  bannerAlbum.href = "./artist.html?albumId=" + data.album.id;
  bannerAlbum.innerText = data.album.title;

  const bannerArtist = document.getElementById("banner-artist");
  bannerArtist.href = "./artist.html?artistId=" + data.artist.id;
  bannerArtist.innerText = data.artist.name;

  const bannerPlayBtn = document.getElementById("banner-play");
  bannerPlayBtn.onclick = function () {
    window.location.replace("./album.html?abumId=" + data.album.id);
  };
};

const startup = () => {
  sectionGen("grimes");
  sectionGen("bo burnham");
  sectionGen("good-boy-daisy");
  sectionGen("bring-me-the-horizon");
  bannerManipulation("random");
  libraryGen("eminem");
};

window.addEventListener("DOMContentLoaded", startup());
