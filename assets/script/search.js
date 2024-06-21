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
};

const form = document.getElementById("search-form");
form.addEventListener("submit", search);
