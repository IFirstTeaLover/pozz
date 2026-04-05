let purchasedDrills = [{ type: "coal", level: 1, miningTime: 0, upgradePrice: 100, firstCase: false }];
let money = 100000;
let moneyUpgradeTreeUnlocked = true;
let furnaceUnlocked = true;
let selectedTab = "drills"

let templateButton = document.querySelector(".drills-button")


templateButton.addEventListener("click", () => {
    resetAndReset(".drills-button")
    document.querySelector(".drills-zone").classList.add("shown")
})

document.querySelector(".settings-button").addEventListener("click", () => {
    resetAndReset(".settings-button")
    document.querySelector(".settings-zone").classList.add("shown")
})

function hideAllTabs() {
    const zonesDiv = document.getElementsByClassName("zones")[0];
    const zones = Array.from(zonesDiv.children);

    zones.forEach(e => {
        e.classList.remove("shown");
    })
}

function resetButtons() {
    let buttonsDiv = document.querySelector(".l-bar-scroll")
    let buttons = Array.from(buttonsDiv.children)
    buttons.forEach(button => {
        button.classList.remove("selected")
    })
    document.querySelector(".settings-button").classList.remove("selected")
}

function addButton(icon, name, clickAction, buttonClass) {
    let newButton = templateButton.cloneNode(true)
    let buttonDiv = newButton.children[0]
    const settingsBtn = document.querySelector('.settings-button');
    newButton.classList.replace("drills-button", buttonClass)
    newButton.classList.remove("selected")
    buttonDiv.children[0].src = icon
    buttonDiv.children[1].innerHTML = name

    newButton.addEventListener("click", clickAction)
    document.querySelector(".l-bar-scroll").append(newButton);
}

function translate(string){
    return window.GameLanguage.t(string)
}

async function localize() {
    await GameLanguage.init();

    addButton("./images/shop.svg", translate('buttons.shop'), () => shopFunc(".shop-button"), "shop-button")
    addButton("./images/backpack.svg", translate('buttons.inventory'), () => inventoryFunc(".inventory-button"), "inventory-button")
    addButton("./images/tree.svg", translate('buttons.mup'), () => moneyUpgradeTreeFunc(".money-upgrade-tree-button"), "money-upgrade-tree-button")
    addButton("./images/blast_furnace.svg", translate('buttons.furnace'), () => blastFurnaceFunc(".furnace-button"), "furnace-button")
}

localize()


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
    document.querySelector(".furnace-zone").classList.add("shown")
}

function resetAndReset(button) {
    if (enableSFX) audios[1].play()
    hideAllTabs()
    resetButtons()
    document.querySelector(button).classList.add("selected")
    selectedTab = button.slice(1).split('-')[0]
}

function showPopup(popupClass, header, hasOptions, mainText){

}

a(0)