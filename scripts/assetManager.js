let sounds = [
    "pop.mp3",
    "click.mp3",
    "notification.mp3"
]

let musics = [
    "Casa Bossa Nova.mp3",
    "Crinoline Dreams.mp3",
    "Ether Vox.mp3",
    "Late Night Radio.mp3"
]

let images = [
    "inventory/iron.png",
    "inventory/raw_iron.png",
    "furnace.svg"
]

let imagesDownloaded = {}

let musicStarted = false;

let audios = []
let tracks = []
let musicLoadPromise;

async function loadAudios() {
    for (let sound of sounds) {
        try {
            const res = await fetch(`./audio/${sound}`);
            if (!res.ok) throw new Error("Failed to fetch " + sound);
            const blob = await res.blob();
            const audio = new Audio(URL.createObjectURL(blob));
            audios.push(audio);
        } catch (err) {
            console.error(err);
        }
    }

    loadImages()
}

async function loadMusic() {
    const loadedTracks = await Promise.all(musics.map(async music => {
        try {
            const res = await fetch(`./audio/music/${music}`);
            if (!res.ok) throw new Error("Failed to fetch " + music);
            const blob = await res.blob();
            return new Audio(URL.createObjectURL(blob));
        } catch (err) {
            console.error(err);
            return null;
        }
    }));

    tracks = loadedTracks.filter(track => track !== null);
    if (tracks.length === 0) throw new Error("Failed to load any music tracks");
}

async function requestMusic() {
    if (!enableMusic || musicStarted) return;

    try {
        if (!musicLoadPromise) {
            musicLoadPromise = loadMusic().catch(err => {
                musicLoadPromise = null;
                throw err;
            });
        }
        await musicLoadPromise;
        if (enableMusic && !musicStarted) randomMusicLoop(tracks);
    } catch (err) {
        console.error("Failed to load music", err);
    }
}

document.addEventListener("click", () => {
    if (enableMusic) {
        if (audio) {
            audio.volume = 0.5;
            if (audio.paused) {
                audio.play().catch(err => console.error("Failed to resume music", err));
            }
        }
        requestMusic();
    } else if (audio) {
        audio.pause();
    }
});

async function loadImages() {
    for (let imagePath of images) {
        try {
            const res = await fetch(`./images/${imagePath}`);
            if (!res.ok) throw new Error("Failed to fetch " + imagePath);
            const img = new Image();

            const blob = await res.blob();
            const objectURL = URL.createObjectURL(blob);

            img.src = objectURL;

            await new Promise(resolve => img.onload = resolve);

            imagesDownloaded[imagePath] = objectURL;
            console.log("Loaded:", imagePath);
        } catch (err) {
            console.warn(err);
        }
    }
    a(3)
}

let fadeInterval
let audio

function randomMusicLoop(tracks) {
    if (musicStarted) return;
    musicStarted = true;
    let remaining = [];

    function pickNext() {
        if (remaining.length === 0) {
            remaining = [...tracks];
            for (let i = remaining.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
            }
        }
        audio = remaining.pop();
        audio.currentTime = 0;
        audio.volume = enableMusic ? 0.5 : 0;
        audio.play();
        audio.onended = pickNext;
    }

    pickNext();
}

document.addEventListener('visibilitychange', () => {
    if (!audio) return;

    if (document.hidden) {
        startFade();
    } else {
        stopFade();
        if (enableMusic) audio.volume = 0.5;
    }
});

function startFade() {
    if (fadeInterval) clearInterval(fadeInterval);
    if (!audio) return;

    const stepTime = 200;
    const steps = 10000 / stepTime;
    const volumeStep = audio.volume / steps;

    fadeInterval = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume = Math.max(0, audio.volume - volumeStep);
        } else {
            clearInterval(fadeInterval);
        }
    }, stepTime);
}

function stopFade() {
    if (fadeInterval) clearInterval(fadeInterval);
}

loadAudios();
