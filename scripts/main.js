let purchasedDrills = [{ type: "coal", level: 1, miningTime: 0, upgradePrice: 100, firstCase: false }];
let money = 100000;
let moneyUpgradeTreeUnlocked = true;
let blastFurnaceUnlocked = true;
let selectedTab = "drills"

let templateButton = document.querySelector(".drills-button")


templateButton.addEventListener("click", () => {
    resetAndReset(".drills-button")
    document.querySelector(".drills-zone").classList.add("shown")
})

function hideAllTabs() {
    const zonesDiv = document.getElementsByClassName("zones")[0];
    const zones = Array.from(zonesDiv.children);

    zones.forEach(e => {
        e.classList.remove("shown");
    })
}

function resetButtons() {
    let buttonsDiv = document.querySelector(".left-bar")
    let buttons = Array.from(buttonsDiv.children)
    buttons.forEach(button => {
        button.classList.remove("selected")
    })
}

function addButton(icon, name, clickAction, buttonClass) {
    let newButton = templateButton.cloneNode(true)
    let buttonDiv = newButton.children[0]
    newButton.classList.replace("drills-button", buttonClass)
    newButton.classList.remove("selected")
    buttonDiv.children[0].src = icon
    buttonDiv.children[1].innerHTML = name

    newButton.addEventListener("click", clickAction)
    document.querySelector(".left-bar").append(newButton)
}

addButton("/images/shop.svg", "Shop", () => shopFunc(".shop-button"), "shop-button")
addButton("/images/backpack.svg", "Inventory", () => inventoryFunc(".inventory-button"), "inventory-button")
addButton("/images/tree.svg", "Upgrade Tree", () => moneyUpgradeTreeFunc(".money-upgrade-tree-button"), "money-upgrade-tree-button")
addButton("/images/blast_furnace.svg", "Blast Furnace", () => blastFurnaceFunc(".blast-furnace-button"), "blast-furnace-button")

function shopFunc(button) {
    resetAndReset(button)
    document.querySelector(".shop-zone").classList.add("shown")
}

function inventoryFunc(button) {
    resetAndReset(button)
    document.querySelector(".inventory-zone").classList.add("shown")
}

function moneyUpgradeTreeFunc(button) {
    resetAndReset(button)
    document.querySelector(".money-upgrade-tree-zone").classList.add("shown")
}

function blastFurnaceFunc(button) {
    resetAndReset(button)
    document.querySelector(".blast-furnace-zone").classList.add("shown")
}

function resetAndReset(button) {
    audios[1].play()
    hideAllTabs()
    resetButtons()
    document.querySelector(button).classList.add("selected")
    selectedTab = button.slice(1).split('-')[0]
}

a(0)