const TICK_RATE = 50;
const TICK_TIME = 1000 / TICK_RATE;
const progressBar = document.getElementsByClassName("progress-fill")[0];
let progressBar2 = null;

let lastTime = performance.now();
let timeBeforeTick = 0;

let miningForTime = [0];


function loop(currentTime) {
    const delta = currentTime - lastTime;
    lastTime = currentTime;

    timeBeforeTick += delta;

    if (timeBeforeTick >= TICK_TIME) {
        tick(TICK_TIME);
        timeBeforeTick -= TICK_TIME;
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);


const coalCard = document.getElementsByClassName("coal-card")[0];
let ironCard;

const coalAmount = coalCard.getElementsByClassName("inv-amount")[0];
let ironAmount = null;

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

        progressBar.style.width = `${(purchasedDrills[0].miningTime) / ((5000 / purchasedDrills[0].level) / 100)}%`;
        if (progressBar2 !== null) progressBar2.style.width = `${(purchasedDrills[1].miningTime) / ((5000 / (purchasedDrills[1].level / 2)) / 100)}%`;

        coalAmount.innerHTML = `${inventory.coal}x`;
        if (ironAmount !== null) {
            ironAmount.innerHTML = `${inventory.iron}x`
        }

        if (inventory.coal == undefined) coalAmount.innerHTML = 0;

        if (drill.miningTime >= mineTime) {
            if (selectedTab == "drills") {
                audios[0].volume = 0.25
                audios[0].play()
            }

            inventory[drill.type] = (inventory[drill.type] || 0) + 1;
            drill.miningTime = 0;

            if (drill.firstCase) {
                switch (drill.type) {
                    case "iron":
                        for (let i = 0; i < 10; i++) {
                            ironCard = coalCard.cloneNode(true)
                            ironCard.classList.replace("coal-card", "iron-card")
                            ironCard.children[0].innerHTML = "Iron"
                            ironAmount = ironCard.getElementsByClassName("inv-amount")[0];
                            ironCard.querySelector(".item-preview").src = "/images/inventory/iron.png"

                            document.querySelector(".inventory-zone").appendChild(ironCard)
                            drill.firstCase = false;
                            updateCards()
                        }

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
            if (document.querySelector(".blast-furnace-button").style.display != "block") {
                document.querySelector(".blast-furnace-button").style.display = "block";
            }
        }
    })
}