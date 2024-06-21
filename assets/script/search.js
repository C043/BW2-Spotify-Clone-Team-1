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

const search = async e => {
  e.preventDefault();
  const searchInput = document.getElementById("searchInput").value;
  const obj = await get(searchInput);
  const data = await obj.data;
  console.log(data);

  const esplora = document.getElementById("esplora");
  esplora.innerHTML = "";

  const row = document.createElement("div");
  row.className = "row";
  row.id = "searchResults";

  const relevant = document.createElement("div");
  relevant.className = "col-6 mt-4";

  const h2 = document.createElement("h2");
  h2.className = "fs-5 fw-bold";
  h2.innerText = "Relevant";

  const artistCard = document.createElement("div");
  artistCard.className = "card rounded py-4 px-3 border-0";
  artistCard.id = "artistCard";
  artistCard.style.height = "264px";
  artistCard.onclick = function () {
    window.location.replace("./artist.html?artistId=" + data[0].artist.id);
  };

  const artistImgCon = document.createElement("div");
  artistImgCon.className = "mb-3";

  const artistImg = document.createElement("img");
  artistImg.className = "rounded-circle object-fit-cover";
  artistImg.style.width = "100px";
  artistImg.style.height = "100px";
  artistImg.src = data[0].artist.picture_big;
  artistImg.alt = data[0].artist.name;

  const artistTitle = document.createElement("a");
  artistTitle.className = "h1 link-underline link-underline-opacity-0 fw-bold fs-3";
  artistTitle.innerText = data[0].artist.name;

  const p = document.createElement("p");
  p.className = "fs-6 text-secondary";
  p.innerText = "Artist";

  artistImgCon.append(artistImg);
  artistCard.append(artistImgCon, artistTitle, p);
  relevant.append(h2, artistCard);
  row.append(relevant);

  esplora.append(row);

  const songSection = document.createElement("div");
  songSection.className = "col-6 mt-4";

  const songSectionTitle = document.createElement("h2");
  songSectionTitle.className = "fs-5 fw-bold px-3";
  songSectionTitle.innerText = "Songs";

  const songSectionBlock = document.createElement("div");
  songSectionBlock.className = "rounded bg-primary border-0";
  songSectionBlock.id = "song-section-block";
  songSection.append(songSectionTitle);

  for (let i = 0; i <= 3; i++) {
    const currentElement = data[i];

    const cardCon = document.createElement("div");
    cardCon.className = " d-flex gap-2 mx-1 album align-items-center p-2 rounded-3";

    const cardImgCon = document.createElement("div");
    cardImgCon.style.width = "50px";
    cardImgCon.className = " flex-shrink-0";

    const img = document.createElement("img");
    img.src = currentElement.album.cover;
    img.alt = currentElement.title;
    img.style.width = "100%";

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

    const time = document.createElement("div");
    time.className = "d-flex justify-content-center align-items-center ms-auto";

    const seconds = currentElement.duration;
    const minutes = Math.floor((seconds % 3600) / 60);
    const min = minutes * 60;
    let actualSeconds = seconds - min;

    if (actualSeconds.toString().length < 2) {
      actualSeconds = "0" + actualSeconds.toString();
    } else {
      console.log(actualSeconds.toString());
      console.log(actualSeconds.toString().length);
    }

    const duration = minutes + ":" + actualSeconds;

    const span = document.createElement("span");
    span.className = "text-secondary";
    span.innerText = duration;

    artistCon.append(songArtist, dot, albumTitle);
    cardBody.append(songTitle, artistCon);
    cardImgCon.append(img);
    time.append(span);
    cardCon.append(cardImgCon, cardBody, time);
    songSectionBlock.append(cardCon);
    songSection.append(songSectionBlock);
    row.append(songSection);
  }
};

const form = document.getElementById("search-form");
form.addEventListener("submit", search);
