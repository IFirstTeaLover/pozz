const TICK_RATE = 50;
const TICK_TIME = 1000 / TICK_RATE;
const progressBar = document.getElementsByClassName("progress-fill")[0];
let progressBar2 = null;

let lastTime = performance.now();
let timeBeforeTick = 0;
let timeBeforeDomChange = 0;
let delta

const moneyDisplay = document.querySelector(".money-display")

let mupShown = false;
let furnaceShown = false;

let miningForTime = [0];

let cards = Array.from(document.querySelector(".inventory-zone").children)
let cardsAmounts = []
cards.forEach(card => {
    cardsAmounts.push(card.querySelector(".inv-amount"))
})
const coalCard = document.getElementsByClassName("coal-card")[0];


function loop(currentTime) {
    delta = currentTime - lastTime;
    lastTime = currentTime;

    timeBeforeTick += delta;
    timeBeforeDomChange += delta;

    if (timeBeforeTick >= TICK_TIME) {
        tick(TICK_TIME);
        timeBeforeTick -= TICK_TIME;
    }

    if (timeBeforeDomChange >= 100) {
        updateDom()
        timeBeforeDomChange = 0
    }

    requestAnimationFrame(loop);
}

function startUp() {
    requestAnimationFrame(loop);
}


function updateDom() {
    if (document.hidden) return
    if (selectedTab == "drills") {
        progressBar.style.width = `${(purchasedDrills[0].miningTime) / ((5000 / purchasedDrills[0].level) / 100)}%`;
        if (progressBar2 !== null) progressBar2.style.width = `${(purchasedDrills[1].miningTime) / ((5000 / (purchasedDrills[1].level / 2)) / 100)}%`;
    }

    if (selectedTab == "inventory") {
        try {
            cardsAmounts.forEach(card => {
                const type = Array.from(card.parentElement.classList)
                    .find(c => c.endsWith("-card") && c !== "inventory-card")
                    .replace("-card", "")
                card.textContent = inventory[type] + "x"
            })
        } catch (e) {
            console.error(e)
        }
    }

    moneyDisplay.querySelector("p").textContent = money

    if (moneyUpgradeTreeUnlocked) {
        if (!mupShown) {
            addButton("./images/tree.svg", Game.translate('buttons.mup'), () => moneyUpgradeTreeFunc(".money-upgrade-tree-button"), "money-upgrade-tree-button")
            mupShown = true;
        }
    }
    if (furnaceUnlocked) {
        if (!furnaceShown) {
            addButton("./images/furnace.svg", translate('buttons.furnace'), () => furnaceFunc(".furnace-button"), "furnace-button")
            furnaceShown = true
        }
    }
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
                if (enableSFX) {
                    let pop = audios[0].cloneNode(true);
                    pop.volume = 0.25
                    pop.onended = () => {
                        pop.remove();
                    }
                    pop.play().catch(e => {
                        console.warn("Failed to play sound:", e);
                    });
                }
            }

            inventory[drill.type] = (inventory[drill.type] || 0) + 1;
            drill.miningTime = 0;

            if (drill.firstCase) {
                switch (drill.type) {
                    case "iron":
                        newInventoryCard("iron-card", "inventory.iron", "./images/inventory/raw_iron.png")
                        drill.firstCase = false;
                        break
                }
            }
        }
    })
}



a(2)