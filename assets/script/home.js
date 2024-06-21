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

let audio = new Audio();

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

    const playBtn = document.createElement("button");
    playBtn.className = "btn play-btn position-absolute bottom-0 end-0 p-3 bg-success rounded-circle";

    const pauseBtn = document.createElement("button");
    pauseBtn.className = "btn play-btn position-absolute bottom-0 end-0 p-3 bg-success rounded-circle";

    // Crea l'elemento SVG
    const playSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    playSvg.setAttribute("data-encore-id", "icon");
    playSvg.setAttribute("role", "img");
    playSvg.setAttribute("aria-hidden", "true");
    playSvg.setAttribute("viewBox", "0 0 24 24");
    playSvg.classList.add("Svg-sc-ytk21e-0", "bneLcE");
    playSvg.setAttribute("width", "50");
    playSvg.setAttribute("fill", "black");
    playSvg.setAttribute("width", "24");
    playSvg.setAttribute("height", "24");

    // Crea l'elemento path e imposta l'attributo 'd'
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute(
      "d",
      "m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
    );

    const pauseSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    pauseSvg.setAttribute("data-encore-id", "icon");
    pauseSvg.setAttribute("role", "img");
    pauseSvg.setAttribute("aria-hidden", "true");
    pauseSvg.setAttribute("viewBox", "0 0 24 24");
    pauseSvg.classList.add("Svg-sc-ytk21e-0", "bneLcE");
    pauseSvg.setAttribute("width", "50");
    pauseSvg.setAttribute("fill", "black");
    pauseSvg.setAttribute("width", "24");
    pauseSvg.setAttribute("height", "24");

    // Crea l'elemento path e imposta l'attributo 'd'
    const pauseSvgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pauseSvgPath.setAttribute(
      "d",
      "M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
    );

    playSvg.append(svgPath);
    playBtn.append(playSvg);

    pauseSvg.append(pauseSvgPath);
    pauseBtn.append(pauseSvg);

    playBtn.onclick = function () {
      playBtn.remove();
      albumImgCon.append(pauseBtn);
      audio.pause();
      audio = new Audio(currentElement.preview);
      audio.play();
      pauseBtn.classList.remove("play-btn");
      pauseBtn.classList.add("pause-btn");

      const playerImges = document.querySelectorAll("#player .library-img img");
      playerImges.forEach(image => (image.src = currentElement.album.cover));

      const playerAnchors = document.querySelectorAll("#player a");
      playerAnchors.forEach(anchor => (anchor.classList.add = "line-clamp-1"));
      playerAnchors[0].innerText = currentElement.title;
      playerAnchors[0].href = "./album.html?albumId=" + currentElement.album.id;
      playerAnchors[1].innerText = currentElement.artist.name;
      playerAnchors[1].href = "./artist.html?artistId=" + currentElement.artist.id;
    };

    pauseBtn.onclick = function () {
      audio.pause();
      pauseBtn.remove();
      albumImgCon.append(playBtn);
    };

    const albumCard = document.createElement("div");
    albumCard.className = "card border-0 album-main";

    const albumImgCon = document.createElement("div");
    albumImgCon.className = "position-relative";

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
    albumTitle.href = "./album.html?albumId=" + currentElement.album.id;

    const albumArtist = document.createElement("a");
    albumArtist.className = "card-text text-secondary album-artist  line-clamp-1";
    albumArtist.innerText = currentElement.artist.name;
    albumArtist.href = "./artist.html?artistId=" + currentElement.artist.id;

    albumCardBody.append(albumTitle, albumArtist);
    albumImgCon.append(albumImg, playBtn);
    albumCard.append(albumImgCon, albumCardBody);
    albumCardCon.append(albumCard);
    section.append(albumCardCon);
  }

  main.append(section);
};

/* manipolazione del banner */
const bannerManipulation = async id => {
  const obj = await get(id);
  const data = await obj.data[0];

  const artists = ["sofia-isella"];

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
  libraryGen("dua-lipa");
};

window.addEventListener("DOMContentLoaded", startup());
