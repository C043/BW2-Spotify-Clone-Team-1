const songs_album = document.getElementById("songs-album");
const details_album = document.getElementById("details-album");
const navbar = document.getElementById("navbar")

const audio = new Audio()
let playing = false

const Id = new URLSearchParams(window.location.search).get("albumId");

const URL = "https://deezerdevs-deezer.p.rapidapi.com/album/" + Id;

let n = 1;

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL, {
    method: "GET", // post, put, options, delete ...
    headers: {
      "x-rapidapi-key": "1a98254387msh5597a31f9f7e384p10a2ffjsnf5c2f2db7448",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => {
      console.log(resp);

      if (!resp.ok) {
        throw new Error("errore nel response window");
      }
      return resp.json();
    })
    .then(obj => {
      console.log(obj.tracks.data);

      createNavbar();

      createAlbumCard(obj);

      for (let index = 0; index < obj.tracks.data.length; index++) {
        createTrackCard(obj.tracks.data[index]);
        n++;
      }
    })
    .catch(err => console.log(err));
});






const createTrackCard = obj => {
  // Crea il div principale
  const trackContainer = document.createElement("div");
  trackContainer.className = "song d-flex align-items-center gap-3 py-2 pe-2 me-2";
  /* trackContainer.id = 'track-container'; */
  trackContainer.addEventListener('click', () => {
    audio.src = obj.preview; // Imposta la sorgente dell'audio
    if (playing == false) {
      audio.play()
      playing = true
    } else {
      audio.pause()
      playing = false
    }
  });
  // Crea l'elemento per il numero della traccia
  const trackNumber = document.createElement("div");
  trackNumber.className = "fs-5 ms-4 play";
  trackNumber.style.width = "20px";
  trackNumber.innerText = n;
  trackContainer.addEventListener("mouseover", () => {
    threeDots.style = "opacity: 1;";
    /*         trackNumber.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE" width="20" fill="white"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>`
     */
  });
  trackContainer.addEventListener("mouseleave", () => {
    /* switch (i) {
          case 1: trackNumber.innerText = '1'
    
            break;
          case 2: trackNumber.innerText = '2'
    
            break;
          case 3: trackNumber.innerText = '3'
    
            break;
          case 4: trackNumber.innerText = '4'
    
            break;
          case 5: trackNumber.innerText = '5'
    
            break;
    
          default:
            break;
        } */
    threeDots.style = "opacity: 0;";
  });

  // Crea l'elemento per l'immagine della canzone
  const imgTrack = document.createElement("img");
  imgTrack.id = "imgSong";
  imgTrack.src = obj.album.cover_small;
  imgTrack.alt = obj.title;
  imgTrack.width = 60;
  imgTrack.className = "rounded-2";

  // Crea l'elemento per i dettagli della traccia
  const detailsTrack = document.createElement("div");

  const titleTrack = document.createElement("p");
  /* titleTrack.id = 'title-track'; */
  titleTrack.className = "m-0";
  titleTrack.innerText = obj.title;

  const artistTrack = document.createElement("a");
  artistTrack.className = "link-item d-flex gap-2";
  artistTrack.style = "font-size: 15px";
  artistTrack.href = "./artist.html?artistId=" + obj.artist.id;
  artistTrack.innerText = obj.artist.name;

  const explicitContainer = document.createElement("div");


  const explicit = document.createElement('button')
  explicit.className = 'btn btn-outline-dark'
  explicit.style =
    ` 
    font-size: 10px;
    padding-block: 1.1px;
    padding-inline: 6px;
  `
  explicit.innerText = obj.explicit_lyrics ? 'E' : explicit.style = 'display: none;'


  detailsTrack.appendChild(titleTrack);
  detailsTrack.appendChild(artistTrack);
  artistTrack.appendChild(explicitContainer)
  explicitContainer.appendChild(explicit)

  // Crea l'elemento per i bottoni finali
  const endingButtons = document.createElement("div");
  endingButtons.className = "d-flex align-items-center gap-3 ms-auto";

  const verifiedIcon = document.createElement("div");
  verifiedIcon.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"
                                class="Svg-sc-ytk21e-0 gacXSA" width="20" fill="#1DD05D">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
                               </svg>`;


  const seconds = obj.duration;
  const minutes = Math.floor((seconds % 3600) / 60);
  const min = minutes * 60;
  let actualSeconds = seconds - min;

  if (actualSeconds.toString().length < 2) {
    actualSeconds = "0" + actualSeconds.toString();
  }

  const duration = minutes + ":" + actualSeconds;

  const trackDuration = document.createElement("p");
  trackDuration.id = "track-duration";
  trackDuration.className = "m-0";
  trackDuration.innerText = duration;

  const threeDots = document.createElement("div");
  threeDots.style.opacity = 0;
  threeDots.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"
                            class="Svg-sc-ytk21e-0 dYnaPI" width="20" fill="white">
                            <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                            </svg>`;

  /* endingButtons.appendChild(verifiedIcon); */
  endingButtons.appendChild(trackDuration);
  endingButtons.appendChild(threeDots);

  // Assembla la card
  trackContainer.appendChild(trackNumber);
  /* trackContainer.appendChild(imgTrack); */
  trackContainer.appendChild(detailsTrack);
  trackContainer.appendChild(endingButtons);

  // Aggiungi la card al contenitore nel DOM
  songs_album.appendChild(trackContainer);
};

function createAlbumCard(obj) {
  // Crea il contenitore principale
  const container = document.createElement("div");
  container.className = 'd-flex align-items-center flex-column flex-sm-row align-items-sm-center'

  // Crea il div per l'immagine
  const imgDiv = document.createElement("div");
  imgDiv.id = 'imgContainer'

  // Crea l'elemento img
  const img = document.createElement("img");
  /* img.className = "p-2"; */
  img.src = obj.cover_medium;
  img.width = 200;
  img.alt = obj.title;

  // Appendi l'immagine al div dell'immagine
  imgDiv.appendChild(img);

  // Crea il div per il testo
  const textDiv = document.createElement("div");
  textDiv.className = 'align-content-center ps-3'

  // Crea l'elemento p per il testo "album"
  const albumText = document.createElement("p");
  albumText.className = "m-0 text-light";
  albumText.innerText = "album";

  // Crea l'elemento h1 per il nome dell'album
  const albumName = document.createElement("h1");
  albumName.className = "display-3";
  albumName.innerText = obj.title;

  // Crea l'elemento p per i dati vari
  const albumData = document.createElement("div");
  albumData.style = "font-size: 15px";
  albumData.className = 'd-flex align-items-center align-content-center gap-2'

  const imgArtist = document.createElement('img')
  imgArtist.src = obj.artist.picture_small
  imgArtist.style = 'width: 30px'
  imgArtist.className = 'rounded-circle'

  const artistReference = document.createElement('a')
  artistReference.href = './artist.html?artistId=' + obj.artist.id
  artistReference.innerText = obj.artist.name



  albumData.append(imgArtist, artistReference)






  // Appendi il testo al div del testo
  textDiv.appendChild(albumText);
  textDiv.appendChild(albumName);
  textDiv.appendChild(albumData);

  // Appendi i div dell'immagine e del testo al contenitore principale
  container.appendChild(imgDiv);
  container.appendChild(textDiv);

  // Aggiungi il contenitore principale al body o ad un altro elemento del DOM
  details_album.appendChild(container);
}


function createNavbar() {
  // Crea il contenitore principale
  const mainContainer = document.createElement('div');
  mainContainer.className = 'd-flex justify-content-between pb-5';

  // Crea il bottone con l'icona
  const buttonContainer = document.createElement('a');
  buttonContainer.className = 'btn btn-outline-dark rounded-circle';
  buttonContainer.href = '/'

  const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgIcon.setAttribute('data-encore-id', 'icon');
  svgIcon.setAttribute('role', 'img');
  svgIcon.setAttribute('aria-hidden', 'true');
  svgIcon.classList.add('Svg-sc-ytk21e-0', 'cAMMLk', 'IYDlXmBmmUKHveMzIPCF');
  svgIcon.setAttribute('width', '15');
  svgIcon.setAttribute('height', '15');
  svgIcon.setAttribute('fill', 'white');
  svgIcon.setAttribute('viewBox', '0 0 16 16');

  const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath.setAttribute('d', 'M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z');

  svgIcon.appendChild(svgPath);
  buttonContainer.appendChild(svgIcon);

  // Crea il div con i pulsanti e il testo
  const actionContainer = document.createElement('div');
  actionContainer.className = 'd-flex gap-2';

  const installButton = document.createElement('button');
  installButton.textContent = 'installa app';
  installButton.className = 'd-flex gap-2 btn btn-outline-dark text-light rounded-pill'

  // Crea e aggiungi il secondo SVG all'interno di installButton
  const svgIconInstall = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgIconInstall.setAttribute('data-encore-id', 'icon');
  svgIconInstall.setAttribute('role', 'img');
  svgIconInstall.setAttribute('aria-hidden', 'true');
  svgIconInstall.setAttribute('width', '25');
  svgIconInstall.setAttribute('height', '25');
  svgIconInstall.setAttribute('fill', 'white');
  svgIconInstall.setAttribute('viewBox', '0 0 16 16');
  svgIconInstall.classList.add('Svg-sc-ytk21e-0', 'dYnaPI');

  const svgPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath2.setAttribute('d', 'M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8 12.811l-.528-.528a.945.945 0 0 1-.005-.005L4.995 9.805a.75.75 0 0 1 0-1.06z');

  const svgPath3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath3.setAttribute('d', 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z');

  svgIconInstall.appendChild(svgPath2);
  svgIconInstall.appendChild(svgPath3);

  installButton.appendChild(svgIconInstall);

  const iconElement = document.createElement('button');
  /* iconElement.textContent = 'icon'; */
  iconElement.className = 'btn btn-outline-dark text-light border-0 rounded-circle'

  const svgIconBell = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgIconBell.setAttribute('data-encore-id', 'icon');
  svgIconBell.setAttribute('role', 'img');
  svgIconBell.setAttribute('aria-hidden', 'true');
  svgIconBell.setAttribute('width', '20');
  svgIconBell.setAttribute('height', '20');
  svgIconBell.setAttribute('fill', 'white');
  svgIconBell.setAttribute('viewBox', '0 0 16 16');
  svgIconBell.classList.add('Svg-sc-ytk21e-0', 'dYnaPI');

  // Crea l'elemento path e imposta l'attributo 'd'
  const svgPath4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath4.setAttribute('d', 'M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4zm-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569V5.5zm4.5 8a1 1 0 1 0 2 0H7z');

  // Appendi il path all'elemento SVG
  svgIconBell.appendChild(svgPath4);

  iconElement.appendChild(svgIconBell)

  const profileText = document.createElement('p');
  profileText.textContent = 'img profilo';

  // Appendi i pulsanti e il testo al contenitore delle azioni
  actionContainer.appendChild(installButton);
  actionContainer.appendChild(iconElement);
  /* actionContainer.appendChild(profileText); */  //disabilitato perché non è da usare adesso

  // Appendi il bottone con l'icona e il contenitore delle azioni al contenitore principale
  mainContainer.appendChild(buttonContainer);
  mainContainer.appendChild(actionContainer);

  // Aggiungi il contenitore principale al body o ad un altro elemento del DOM
  navbar.appendChild(mainContainer);
}