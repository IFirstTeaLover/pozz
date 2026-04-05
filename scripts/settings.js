let settings = document.querySelector(".settings-zone");

let creditsButton = settings.querySelector(".credits");

let sfxCheckmark = settings.querySelector(".sfx-checkmark");
let musicCheckmark = settings.querySelector(".music-checkmark");

let enableSFX = localStorage.getItem("sfxEnabled") === "true";
let enableMusic = localStorage.getItem("musicEnabled") === "true";

if (enableSFX) {
    sfxCheckmark.querySelector("img").style.display = "block"
} else {
    sfxCheckmark.querySelector("img").style.display = "none"
}

if (enableMusic) {
    musicCheckmark.querySelector("img").style.display = "block"
} else {
    musicCheckmark.querySelector("img").style.display = "none"
}

sfxCheckmark.addEventListener("click", () => {
    enableSFX = !enableSFX;
    localStorage.setItem("sfxEnabled", enableSFX)
    if (enableSFX) {
        sfxCheckmark.querySelector("img").style.display = "block"
    } else {
        sfxCheckmark.querySelector("img").style.display = "none"
    }
})

musicCheckmark.addEventListener("click", () => {
    enableMusic = !enableMusic;
    localStorage.setItem("musicEnabled", enableMusic)
    if (enableMusic) {
        musicCheckmark.querySelector("img").style.display = "block"
    } else {
        musicCheckmark.querySelector("img").style.display = "none"
    }
})

creditsButton.addEventListener("click", () => {
    showCredits();
})

function showCredits() {
    const creditsPopup = document.querySelector(".credits-popup");
    let creditsText
    fetch("/CREDITS")
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