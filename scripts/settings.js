let settings = document.querySelector(".settings-zone");

let creditsButton = settings.querySelector(".credits");

let sfxCheckmark = settings.querySelector(".sfx-checkmark");
let musicCheckmark = settings.querySelector(".music-checkmark");

let enableSFX = localStorage.getItem("sfxEnabled") === "true";
let enableMusic = localStorage.getItem("musicEnabled") === "true";

if (enableSFX) {
    sfxCheckmark.classList.add("enabled")
} else {
    sfxCheckmark.classList.remove("enabled")
}

if (enableMusic) {
    musicCheckmark.classList.add("enabled")
} else {
    musicCheckmark.classList.remove("enabled")
}

sfxCheckmark.addEventListener("click", () => {
    enableSFX = !enableSFX;
    localStorage.setItem("sfxEnabled", enableSFX)
    if (enableSFX) {
        sfxCheckmark.classList.add("enabled")
    } else {
        sfxCheckmark.classList.remove("enabled")
    }
})

musicCheckmark.addEventListener("click", () => {
    enableMusic = !enableMusic;
    localStorage.setItem("musicEnabled", enableMusic)
    if (enableMusic) {
        musicCheckmark.classList.add("enabled")
    } else {
        musicCheckmark.classList.remove("enabled")
    }
})

creditsButton.addEventListener("click", () => {
    showCredits();
})

function showCredits() {
    const creditsPopup = document.querySelector(".credits-popup");
    let creditsText
    fetch("./CREDITS")
        .then(response => response.text())
        .then(data => {
            creditsText = data;

            creditsPopup.style.transform = "translate(-50%, -50%) scale(1)";

            creditsPopup.querySelector("h4").innerHTML = creditsText;
        })

    creditsPopup.querySelector(".credits-close").addEventListener("click", () => {
        creditsPopup.style.transform = "translate(-50%, -50%) scale(0)";
    })
}