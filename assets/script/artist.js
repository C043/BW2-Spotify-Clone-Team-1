/* andiamo a prendere l'URL dell'artista specifico dove andremo a prelevare tutti i dati necessari */



const artistId = new URLSearchParams(window.location.search).get("artistId");
let artist_name = '';
const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist_name //in questo caso prendo l'artista sleep token

/* generiamo la prima delle popular song di un'artista */
/* andiamo a prendere i contenitori dove andremo ad inserire le canzoni */


const popular_songs = document.getElementById("popular-songs");
const name_artist = document.getElementById("name-artist");
const header_artist = document.getElementById("header-artist");
const discography_container = document.getElementById('discography-container')
let n = 1;





window.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    fetch_name_artist()
        .then(updatedArtistName => {

            const updatedURL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${updatedArtistName}`;
            fetch(updatedURL, {
                method: "GET", // post, put, options, delete ...
                headers: {
                    "x-rapidapi-key": "1a98254387msh5597a31f9f7e384p10a2ffjsnf5c2f2db7448",
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                },
            })
                .then((resp) => {
                    console.log(resp);
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error("errore nella response");
                    }
                })
                .then((array_24songs) => {
                    console.log('CANZONI! -------------->', array_24songs.data);
                    name_artist.innerHTML = `<b>${array_24songs.data[0].artist.name}</b>`;
                    header_artist.style = `background: linear-gradient(#3d92f400, black), url(${array_24songs.data[0].artist.picture_xl}) ;`;



                    for (let i = 0; i < 5; i++) {
                        generate_popular_songs(array_24songs.data[i], i + 1);
                        n++

                    }

                    /* funzione che genera il piccolo banner contenente l'ultimo album */

                    generate_last_album(array_24songs.data[0])


                    fetch_albums(array_24songs.data[0].artist.id)


                })
                .catch((err) => console.log(err));





        })


});

const generate_popular_songs = (current_song, i) => {
    const track_container = document.createElement("div");
    track_container.id = "track-container";
    track_container.className = "d-flex align-items-center gap-3 py-2 pe-3";

    const track_number = document.createElement("div");
    track_number.className = "fs-5 ms-4 play";
    track_number.innerText = n; // inserisco posizione della canzone
    track_number.style = 'width: 20px'
    track_container.addEventListener('mouseover', () => {
        three_dots.style = 'opacity: 1;'
        track_number.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE" width="20" fill="white"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>`
    })
    track_container.addEventListener('mouseleave', () => {
        switch (i) {
            case 1: track_number.innerText = '1'

                break;
            case 2: track_number.innerText = '2'

                break;
            case 3: track_number.innerText = '3'

                break;
            case 4: track_number.innerText = '4'

                break;
            case 5: track_number.innerText = '5'

                break;

            default:
                break;
        }
        three_dots.style = 'opacity: 0;'
    })


    const imgTrack = document.createElement("img");
    imgTrack.id = "imgSong";
    imgTrack.src = current_song.album.cover; //qui inseriamo l'immagine dell'album della canzone scelta
    imgTrack.alt = current_song.album.title; //descrizione immagine
    imgTrack.width = "60";
    imgTrack.className = "rounded-2";

    const details_track = document.createElement("div");

    const title_track = document.createElement("p");
    title_track.id = "title-track";
    title_track.className = "m-0";
    title_track.innerText = current_song.title; // inseriamo il title della canzone

    const explicit = document.createElement("div");
    explicit.id = "explicit";
    explicit.className = "lead";
    explicit.innerText = current_song.explicit_lyrics ? "exp" : " "; // qui inserirò oppure no il simbolo dell'explicit

    details_track.append(title_track, explicit);

    const ending_buttons = document.createElement("div");
    ending_buttons.className = "d-flex align-items-center gap-3 ms-auto";

    const verified_icon = document.createElement("div");
    verified_icon.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 gacXSA" width="20" fill="#1DD05D"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path></svg>`;

    let minutes = Math.floor(current_song.duration / 60)

    const track_duration = document.createElement("p");
    track_duration.id = "track-duration";
    track_duration.className = "m-0";
    track_duration.innerText = minutes + ':' + (current_song.duration - (minutes * 60)); // andrà inserito la durata della canzone...

    const three_dots = document.createElement("div");
    three_dots.width = '20'
    three_dots.style = 'opacity: 0;'
    three_dots.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI" width="20" fill="white"><path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path></svg>`;


    ending_buttons.append(verified_icon, track_duration, three_dots);

    track_container.append(track_number, imgTrack, details_track, ending_buttons);

    popular_songs.appendChild(track_container);
};

const generate_last_album = artist => {

    const container_last_album = document.getElementById('last-album')

    const div = document.createElement('div')
    div.className = 'position-relative overflow-hidden'

    const album_image = document.createElement('img')
    album_image.className = 'position-absolute w-100 z-n1'
    album_image.src = artist.album.cover_big
    album_image.alt = artist.album.title

    const div2 = document.createElement('div')
    div2.className = 'z-1'

    const divArtist = document.createElement('div')
    divArtist.className = 'd-flex align-items-center mt-2 ms-2 px-2 rounded-pill bg-light text-dark d-inline-block h-auto w-75 gap-3'


    const h3 = document.createElement('h3')
    h3.innerText = 'Check new release!'
    h3.className = 'd-inline-block'

    const artist_image = document.createElement('img')
    artist_image.className = 'rounded-circle'
    artist_image.src = artist.artist.picture
    artist_image.alt = artist.artist.name
    artist_image.width = '35'
    artist_image.height = '35'

    divArtist.append(artist_image, h3)

    div2.appendChild(divArtist)

    div.append(album_image, div2)

    container_last_album.appendChild(div)

}

const fetch_albums = (id) => {




    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/albums`, {
        method: "GET",
        headers: {
            "x-rapidapi-key": "1a98254387msh5597a31f9f7e384p10a2ffjsnf5c2f2db7448",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
        .then(resp => {
            console.log(resp)

            if (resp.ok) {
                return resp.json()
            } else {
                throw new Error('errore nel response degli album')
            }
        })
        .then(obj_albums => {


            for (i = 0; i < 4; i++) {
                generate_albums(obj_albums.data[i])
            }
        })
        .catch(err => console.log(err))

};


const generate_albums = (album) => {


    const card_cont = document.createElement('div')
    card_cont.className = 'col-3 p-0'

    const card = document.createElement('div')
    card.className = 'card p-3'

    const img_album = document.createElement('img')
    img_album.className = 'card-img-top rounded-3'
    img_album.src = album.cover_medium
    img_album.alt = album.title
    img_album.width = '100'

    const card_body = document.createElement('div')
    card_body.className = 'card-body'

    const h5 = document.createElement('h5')
    h5.className = 'card-title line-clamp-1'
    h5.innerText = album.title

    const a = document.createElement('a')
    a.href = ''
    a.innerText = artist_name

    card_body.append(h5, a)

    card.append(img_album, card_body)

    card_cont.append(card)

    discography_container.appendChild(card_cont)



}



const fetch_name_artist = () => {

    console.log('funzione partita')

    return fetch('https://deezerdevs-deezer.p.rapidapi.com/artist/' + artistId, {
        method: "GET", // post, put, options, delete ...
        headers: {
            "x-rapidapi-key": "1a98254387msh5597a31f9f7e384p10a2ffjsnf5c2f2db7448",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
    })
        .then(resp => {
            console.log('response della funzione fetch_name_artist', resp)

            if (resp.ok) {
                return resp.json()
            } else {
                throw new Error('errore nel response della function fetch_name_artist');
            }
        })
        .then(obj => {
            console.log(obj.name)
            return obj.name

        })

        .catch(err => console.log(err))



}
