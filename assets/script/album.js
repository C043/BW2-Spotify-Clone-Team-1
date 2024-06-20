
const songs_album = document.getElementById('songs-album')
const details_album = document.getElementById('details-album')

const Id = new URLSearchParams(window.location.search).get('albumId')

const URL = 'https://deezerdevs-deezer.p.rapidapi.com/album/' + Id

let n = 1;

window.addEventListener('DOMContentLoaded', () => {

    fetch(URL, {
        method: "GET", // post, put, options, delete ...
        headers: {
            "x-rapidapi-key": "1a98254387msh5597a31f9f7e384p10a2ffjsnf5c2f2db7448",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }
    )
        .then(resp => {
            console.log(resp)

            if (!resp.ok) {
                throw new Error('errore nel response window')

            }
            return resp.json()
        })
        .then(obj => {
            console.log(obj.tracks.data)

            createAlbumCard(obj)

            for (let index = 0; index < obj.tracks.data.length; index++) {
                createTrackCard(obj.tracks.data[index])
                n++

            }
        })
        .catch(err => console.log(err))

})


const createTrackCard = (obj) => {
    // Crea il div principale
    const trackContainer = document.createElement('div');
    trackContainer.className = 'd-flex align-items-center gap-3 py-2 pe-3';
    /* trackContainer.id = 'track-container'; */

    // Crea l'elemento per il numero della traccia
    const trackNumber = document.createElement('div');
    trackNumber.className = 'fs-5 ms-4 play';
    trackNumber.style.width = '20px';
    trackNumber.innerText = n;
    trackContainer.addEventListener('mouseover', () => {
        threeDots.style = 'opacity: 1;'
/*         trackNumber.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE" width="20" fill="white"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>`
 */    })
    trackContainer.addEventListener('mouseleave', () => {
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
        threeDots.style = 'opacity: 0;'
    })

    // Crea l'elemento per l'immagine della canzone
    const imgTrack = document.createElement('img');
    imgTrack.id = 'imgSong';
    imgTrack.src = obj.album.cover_small;
    imgTrack.alt = obj.title;
    imgTrack.width = 60;
    imgTrack.className = 'rounded-2';

    // Crea l'elemento per i dettagli della traccia
    const detailsTrack = document.createElement('div');

    const titleTrack = document.createElement('p');
    /* titleTrack.id = 'title-track'; */
    titleTrack.className = 'm-0';
    titleTrack.innerText = obj.title;

    const artistTrack = document.createElement('a')
    artistTrack.className = 'link-item'
    artistTrack.style = 'font-size: 15px'
    artistTrack.innerText = obj.artist.name

    const explicit = document.createElement('div');
    /* explicit.id = 'explicit'; */
    explicit.className = 'lead';
    explicit.innerText = '';

    detailsTrack.appendChild(titleTrack);
    detailsTrack.appendChild(artistTrack);

    // Crea l'elemento per i bottoni finali
    const endingButtons = document.createElement('div');
    endingButtons.className = 'd-flex align-items-center gap-3 ms-auto';

    const verifiedIcon = document.createElement('div');
    verifiedIcon.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"
                                class="Svg-sc-ytk21e-0 gacXSA" width="20" fill="#1DD05D">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
                               </svg>`;


    let minutes = Math.floor(obj.duration / 60)
    let seconds = (obj.duration - (minutes * 60))
    let result;

    if (toString(seconds).length === 1) {
        result = minutes + ':' + seconds + '0'
    } else {
        result = minutes + ':' + seconds
    }

    const trackDuration = document.createElement('p');
    trackDuration.id = 'track-duration';
    trackDuration.className = 'm-0';
    trackDuration.innerText = result;

    const threeDots = document.createElement('div');
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
    trackContainer.appendChild(imgTrack);
    trackContainer.appendChild(detailsTrack);
    trackContainer.appendChild(endingButtons);

    // Aggiungi la card al contenitore nel DOM
    songs_album.appendChild(trackContainer);
};

function createAlbumCard(obj) {
    // Crea il contenitore principale
    const container = document.createElement('div');

    // Crea il div per l'immagine
    const imgDiv = document.createElement('div');

    // Crea l'elemento img
    const img = document.createElement('img');
    img.className = 'p-2';
    img.src = obj.cover_medium;
    img.width = 200;
    img.alt = obj.title;

    // Appendi l'immagine al div dell'immagine
    imgDiv.appendChild(img);

    // Crea il div per il testo
    const textDiv = document.createElement('div');

    // Crea l'elemento p per il testo "album"
    const albumText = document.createElement('p');
    albumText.className = 'm-0';
    albumText.innerText = 'album';

    // Crea l'elemento h1 per il nome dell'album
    const albumName = document.createElement('h1');
    albumName.className = 'display-3';
    albumName.innerText = obj.title;

    // Crea l'elemento p per i dati vari
    const albumData = document.createElement('p');
    albumData.className = 'm-0';
    albumData.innerText = 'dati vari';

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

