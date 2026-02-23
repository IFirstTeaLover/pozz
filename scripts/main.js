let purchasedDrills = [{ type: "coal", level: 1, miningTime: 0, upgradePrice: 100, firstCase: false }];
let money = 0;
let moneyUpgradeTreeUnlocked = true;
let blastFurnaceUnlocked = true;

function checkButtons() {
    const bottomBar = document.getElementsByClassName("bottom-bar")[0];
    const bottomButtons = Array.from(bottomBar.children);

    bottomButtons.forEach(e => {
        e.removeEventListener("click", e);
        e.addEventListener("click", () => {
            bottomButtons.forEach(e => {
                e.classList.remove("selected");
            })
            e.classList.add("selected");
            switchTab(e.classList[0]);
        })
    })
}

checkButtons();

function hideAllTabs() {
    const zonesDiv = document.getElementsByClassName("zones")[0];
    const zones = Array.from(zonesDiv.children);

    zones.forEach(e => {
        e.classList.remove("shown");
    })
}

function switchTab(name) {
    switch (name) {
        case "drills-button":

            hideAllTabs()
            document.getElementsByClassName("drills-zone")[0].classList.add("shown")

            break;
        case "shop-button":

            hideAllTabs()
            document.getElementsByClassName("shop-zone")[0].classList.add("shown")

            break;
        case "inventory-button":

            hideAllTabs()
            document.getElementsByClassName("inventory-zone")[0].classList.add("shown")

            break;

        case "money-upgrade-tree-button":

            hideAllTabs()
            document.getElementsByClassName("money-upgrade-tree-zone")[0].classList.add("shown")

            break;
    }
}

