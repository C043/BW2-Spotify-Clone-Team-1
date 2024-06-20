import { token } from "./token.js";

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

export const libraryGen = async id => {
  const obj = await get(id);
  const data = await obj.data;

  const libraryList = document.getElementById("library-list");

  for (let i = 0; i <= data.length; i++) {
    const currentElement = data[i];

    const cardCon = document.createElement("div");
    cardCon.className = "library-list-item d-flex gap-3 mx-1 album align-items-center p-2 rounded-3";

    const cardImgCon = document.createElement("div");
    cardImgCon.style.minWidth = "50px";
    cardImgCon.className = "library-img flex-shrink-0";

    const img = document.createElement("img");
    img.src = currentElement.album.cover;
    img.alt = currentElement.title;

    const cardBody = document.createElement("div");
    cardBody.className = "d-flex flex-column";
    cardBody.style.overflow = "hidden";

    const songTitle = document.createElement("a");
    songTitle.className = "mb-1 h6 line-clamp-1";
    songTitle.innerText = currentElement.title;
    songTitle.href = "./album.html?albumId=" + currentElement.album.id;

    const artistCon = document.createElement("div");
    artistCon.className = "line-clamp-1";

    const songArtist = document.createElement("a");
    songArtist.className = "mb-0 text-secondary";
    songArtist.innerText = currentElement.artist.name;
    songArtist.href = "./artist.html?artistId=" + currentElement.artist.id;

    const dot = document.createElement("span");
    dot.className = "text-secondary";
    dot.innerText = " • ";

    const albumTitle = document.createElement("a");
    albumTitle.className = "mb-0 text-secondary";
    albumTitle.innerText = currentElement.album.title;
    albumTitle.href = "./album.html?albumId=" + currentElement.album.id;

    artistCon.append(songArtist, dot, albumTitle);
    cardBody.append(songTitle, artistCon);
    cardImgCon.append(img);
    cardCon.append(cardImgCon, cardBody);
    libraryList.append(cardCon);
  }
};

const startup = () => libraryGen("dua-lipa");

window.addEventListener("DOMContentLoaded", startup);
