let purchasedDrills = [{ type: "coal", level: 1, miningTime: 0, upgradePrice: 100 }];
let moneyUpgradeTreeUnlocked = true;
let furnaceUnlocked = true;
let selectedTab = "drills"

let templateButton = document.querySelector(".drills-button")
const sidebar = document.querySelector(".left-bar");
const sidebarButtonActions = new WeakMap();

sidebar.addEventListener("click", event => {
    const button = event.target.closest(".l-bar-button");
    const action = button && sidebarButtonActions.get(button);
    if (action) action();
});

const params = new URLSearchParams(location.search);
const zoneParam = params.get('zone')
const zoneMap = {
    drills: () => { resetAndReset('.drills-button', false); document.querySelector('.drills-zone').classList.add('shown') },
    shop: () => shopFunc('.shop-button', false),
    inventory: () => inventoryFunc('.inventory-button', false),
    settings: () => { resetAndReset('.settings-button', false); document.querySelector('.settings-zone').classList.add('shown') },
};

if (zoneParam) {
    localize().then(() => {
        const zone = new URLSearchParams(location.search).get('zone') ?? 'drills';
        zoneMap[zone]?.();
        history.replaceState({ button: `.${zone}-button` }, '');
    });
} else {
    localize();
}

window.addEventListener('popstate', (e) => {
    const button = e.state?.button;
    if (!button) return;
    const zone = button.slice(1).replace('-button', '');
});

sidebarButtonActions.set(templateButton, () => {
    resetAndReset(".drills-button")
    document.querySelector(".drills-zone").classList.add("shown")
})

sidebarButtonActions.set(document.querySelector(".settings-button"), () => {
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

function addButton(icon, name, clickAction, buttonClass, id = 0) {
    let newButton = templateButton.cloneNode(true)
    let buttonDiv = newButton.children[0]
    newButton.classList.replace("drills-button", buttonClass)
    newButton.classList.remove("selected")
    buttonDiv.children[0].src = icon
    buttonDiv.children[1].textContent = name
    newButton.dataset.id = id

    sidebarButtonActions.set(newButton, clickAction)

    const scroll = document.querySelector(".l-bar-scroll");
    scroll.append(newButton);

    // sort all children by data-id after every insert
    Array.from(scroll.children)
        .sort((a, b) => Number(a.dataset.id) - Number(b.dataset.id))
        .forEach(el => scroll.append(el));
}

function translate(string) {
    return window.GameLanguage.t(string)
}

async function localize() {
    await GameLanguage.init();

    addButton("./images/shop.svg", translate('buttons.shop'), () => shopFunc(".shop-button"), "shop-button")
    addButton("./images/backpack.svg", translate('buttons.inventory'), () => inventoryFunc(".inventory-button"), "inventory-button")
}

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

function furnaceFunc(button) {
    resetAndReset(button)
    document.querySelector(".furnace-zone").classList.add("shown")
}

function resetAndReset(button) {
    try {
        audios[1].play()
    } catch (error) {
        console.warn("Failed to play button sound!")
    }
    hideAllTabs()
    resetButtons()
    document.querySelector(button).classList.add("selected")
    selectedTab = button.slice(1).split('-')[0]

    const zone = button.slice(1).replace('-button', '');
    history.pushState({ button }, '', `?zone=${zone}`);

}

function showPopup(popupClass, header, hasOptions, mainText) {

}

a(0)