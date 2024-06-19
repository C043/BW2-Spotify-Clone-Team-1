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
    console.log(artistObj);
    return artistObj;
  } catch (error) {
    console.log(error);
  }
};

get("grimes");
