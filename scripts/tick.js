const TICK_RATE = 50;
const TICK_TIME = 1000 / TICK_RATE;
const progressBar = document.getElementsByClassName("progress-fill")[0];
let progressBar2 = null;

let lastTime = performance.now();
let timeBeforeTick = 0;
let timeBeforeDomChange = 0;
let delta

let miningForTime = [0];

let cards = Array.from(document.querySelector(".inventory-zone").children)
let cardsAmounts = []
cards.forEach(card => {
    cardsAmounts.push(card.querySelector(".inv-amount"))
})
const coalCard = document.getElementsByClassName("coal-card")[0];
let ironCard;

const coalAmount = coalCard.getElementsByClassName("inv-amount")[0];
let ironAmount = null;


function loop(currentTime) {
    delta = currentTime - lastTime;
    lastTime = currentTime;

    timeBeforeTick += delta;

    if (timeBeforeTick >= TICK_TIME) {
        tick(TICK_TIME);
        timeBeforeTick -= TICK_TIME;
    }

    requestAnimationFrame(loop);
}

function domUpdate() {
    timeBeforeDomChange += delta

    if (timeBeforeDomChange >= 50) {
        updateDom()
        timeBeforeDomChange = 0
    }
    requestAnimationFrame(domUpdate)
}

function startUp() {
    requestAnimationFrame(loop);
    requestAnimationFrame(domUpdate)
}


function updateDom() {
    progressBar.style.width = `${(purchasedDrills[0].miningTime) / ((5000 / purchasedDrills[0].level) / 100)}%`;
    if (progressBar2 !== null) progressBar2.style.width = `${(purchasedDrills[1].miningTime) / ((5000 / (purchasedDrills[1].level / 2)) / 100)}%`;

    cardsAmounts.forEach(card => {
        const type = Array.from(card.parentElement.classList)
            .find(c => c.endsWith("-card") && c !== "inventory-card")
            .replace("-card", "")
        card.innerHTML = inventory[type] + "x"
    })
}

function updateInventoryCards() {
    cards = Array.from(document.querySelector(".inventory-zone").children)
    cardsAmounts = []
    cards.forEach(card => {
        cardsAmounts.push(card.querySelector(".inv-amount"))
    })
}

function tick(delta) {
    purchasedDrills.forEach(drill => {
        let mineTime
        switch (drill.type) {
            case "coal":
                mineTime = 5000 / drill.level;
                break

            case "iron":
                mineTime = 5000 / (drill.level / 2);
                break
        }

        drill.miningTime += delta;



        if (drill.miningTime >= mineTime) {
            if (selectedTab == "drills") {
                audios[0].volume = 0.25
                audios[0].play().catch(e => {
                    console.warn("Failed to play sound:", e);
                });
            }

            inventory[drill.type] = (inventory[drill.type] || 0) + 1;
            drill.miningTime = 0;

            if (drill.firstCase) {
                switch (drill.type) {
                    case "iron":
                        newInventoryCard("iron-card", "Raw Iron", "./images/inventory/raw_iron.png")
                        drill.firstCase = false;
                        break
                }
            }
        }

        const moneyDisplay = document.getElementsByClassName("money-display")[0];
        moneyDisplay.children[1].innerHTML = money

        if (moneyUpgradeTreeUnlocked) {

            if (document.querySelector(".money-upgrade-tree-button").style.display != "block") {

                document.querySelector(".money-upgrade-tree-button").style.display = "block";
            }

        }
        if (blastFurnaceUnlocked) {
            if (document.querySelector(".furnace-button").style.display != "block") {
                document.querySelector(".furnace-button").style.display = "block";
            }
        }
    })
}

function newInventoryCard(className, name, image) {
    card = coalCard.cloneNode(true)
    card.classList.replace("coal-card", className)
    card.children[0].innerHTML = name
    ironAmount = card.querySelector(".inv-amount");
    card.querySelector(".item-preview").src = image

    document.querySelector(".inventory-zone").appendChild(card)
    updateCards()
    updateInventoryCards()
}

a(2)