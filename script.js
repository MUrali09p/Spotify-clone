const songs = [
    {
        name: "Aayudha Pooja",
        artist: "Anirudh Ravichander",
        duration: "2:54",
        img: "aayudha_pooja.jpeg",
        src: "Ayudha_Pooja.mp3"
    },
    {
        name: "Bujjithali",
        artist: "DSP",
        duration: "4:08",
        img: "Bujji_thalli.jpeg",
        src: "Bujji_Thalli.mp3"
    },
    {
        name: "Mawa Enthaina",
        artist: "Thaman S",
        duration: "2:31",
        img: "mawaa-enthaina.webp",
        src: "Mawaa.mp3"
    },
    {
        name: "Ramana Aei",
        artist: "Thaman S",
        duration: "2:35",
        img: "ramana.jpg",
        src: "Ramana.mp3"
    },
    {
        name: "Naanaa Hyranaa",
        artist: "Thaman S",
        duration: "4:32",
        img: "NaaNaa_Hyraanaa.jpg",
        src: "Naanaa.mp3"
    },
    {
        name: "Srimathi Garu",
        artist: "G.V Prakhash",
        duration: "3:42",
        img: "Lucky.jpeg",
        src: "Srimathi.mp3"
    },
    {
        name: "Stay",
        artist: "Justin Bieber",
        duration: "2:21",
        img: "stay.png",
        src: "Stay.mp3"
    },
    {
        name: "Red Sea",
        artist: "Anirudh Ravichander",
        duration: "2:42",
        img: "Red_sea.jpeg",
        src: "Red_Sea.mp3"
    }
];
const allSongs = document.querySelector(".songs-list");
const audio = new Audio();
let currentSongIndex = 0;
const bkbtn = document.getElementById("bkbtn");
const masterPlay = document.getElementById("masterPlay");
const ntbtn = document.getElementById("ntbtn");
const progressBar = document.getElementById("musicsilde");

songs.forEach((song, index)=>{
    const songCard = document.createElement("div");
    songCard.classList.add("song-card");

    songCard.innerHTML = `
        <img src=${song.img} alt="${song.name}" class="song-image">
        <div class="song-info">
            <p class="song-name">${song.name}</p>
            <p class="song-artist">${song.artist}</p>
            <p class="song-duration">${song.duration}</p>
        </div>
        <i class="yooo icon fa-solid fa-circle-play"></i>
    `;

    const playBtn = songCard.querySelector(".yooo");
    playBtn.addEventListener("click", () =>{ playSong(index, playBtn)
        
    });

    allSongs.appendChild(songCard);
})
function playSong(index, button = null) {
    currentSongIndex = index;
    audio.src = songs[index].src;
    audio.play();
    updateMusicBar(songs[index]);
    masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");

    document.querySelectorAll(".yooo").forEach(btn => btn.classList.replace("fa-circle-pause", "fa-circle-play"));

    if (button) button.classList.replace("fa-circle-play", "fa-circle-pause");
}

masterPlay.addEventListener("click", () => {
    if (audio.paused) {
        playSong(currentSongIndex);
    } else {
        audio.pause();
        masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");
    }
});

ntbtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

bkbtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
});
function updateMusicBar(song) {
    document.getElementById("playing-img").src = song.img;
    document.getElementById("playing-name").textContent = song.name;
}

audio.addEventListener("timeupdate", () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

const musicsilde = document.getElementById("musicSlider");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");

audio.addEventListener("timeupdate", () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    musicsilde.value = progress;

    musicsilde.style.background = `linear-gradient(to right, green ${progress}%, gray ${progress}%)`;

    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    totalTimeDisplay.textContent = formatTime(audio.duration);
});

musicsilde.addEventListener("input", () => {
    let seekTime = (musicsilde.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
