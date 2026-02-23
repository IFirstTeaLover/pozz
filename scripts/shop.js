const shopDiv = document.querySelector(".shop-zone");


function buyUpgrade(upg) {
    switch (upg.classList[1]) {
        case "coal-drill-speed":
            drillUpgrade(0, 50, upg)
            break;

        case "money-upgrade-tree":
            if (money >= 2500) {
                moneyUpgradeTreeUnlocked = true
                money -= 2500
                upg.remove()
            }
            break;

        case "iron-drill-speed":
            drillUpgrade(1, 250, upg)
            break;
    }
}

function addUpgrade(icon, header, info, price, _class) {
    const newUpgrade = shopDiv.children[0].cloneNode(true)

    newUpgrade.querySelector(".upgrade-icon").src = icon
    newUpgrade.querySelector(".upgrade-header-text").innerHTML = header
    newUpgrade.querySelector(".upgrade-bottom-text").innerHTML = info
    newUpgrade.querySelector(".upgrade-amount-text").innerHTML = "Level: 1"
    newUpgrade.querySelector(".upgrade-price").innerHTML = "$" + price
    newUpgrade.classList.replace("coal-drill-speed", _class)
    shopDiv.append(newUpgrade)
    updateShop()
}

function updateShop() {
    const shopUpgrades = Array.from(shopDiv.children);
    shopUpgrades.forEach(upg => {
        upg.addEventListener("click", () => {
            buyUpgrade(upg);
        })
    });
}

updateShop()

function drillUpgrade(id, value, upg) {
    const levelsDisplay = upg.querySelector(".upgrade-amount-text");
    const priceDisplay = upg.querySelector(".upgrade-price");

    if (money >= purchasedDrills[id].upgradePrice) {
        purchasedDrills[id].level = purchasedDrills[id].level + 1;
        money -= purchasedDrills[id].upgradePrice;
        purchasedDrills[id].upgradePrice = purchasedDrills[id].upgradePrice + value;
        priceDisplay.innerHTML = `$${purchasedDrills[id].upgradePrice}`;
        levelsDisplay.innerHTML = `Level: ${purchasedDrills[id].level}`;
    };
}