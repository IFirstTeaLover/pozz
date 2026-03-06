let sounds = [
    "pop.mp3",
    "click.mp3",
    "notification.mp3"
]

let images = [
    "inventory/iron.png"
]

let imagesDownloaded = {}

let audios = []

async function loadAudios() {
    for (let sound of sounds) {
        try {
            const res = await fetch(`/audio/${sound}`);
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

async function loadImages() {
    for (let imagePath of images) {
        try {
            const res = await fetch(`/images/${imagePath}`);
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

loadAudios();

