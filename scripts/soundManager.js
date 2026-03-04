let sounds = [
    "pop.mp3",
    "click.mp3",
    "notification.mp3"
]

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
}

loadAudios();