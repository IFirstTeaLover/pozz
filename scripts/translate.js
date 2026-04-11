const availableLanguages = ['en-US', 'ru-RU'];

window.GameLanguage = {
    translations: {},
    ready: null,
    readyResolve: null,
    async init() {
        let lang = navigator.language
        if (!availableLanguages.includes(lang)) lang = 'en-US';
        this.translations = await loadTranslations(lang);
        this.readyResolve();
    },
    t(path) {
        return path.split('.').reduce((o, key) => o?.[key], this.translations) ?? path;
    }
};

window.GameLanguage.ready = new Promise((resolve) => {
    GameLanguage.readyResolve = resolve;
});

async function loadTranslations(language) { const response = await fetch(`language/${language}.json`); return await response.json(); }
async function bakeTranslations() {
    await GameLanguage.init()

    document.querySelector(".drills-button").querySelector("h4").textContent = Game.translate("buttons.drills")
    document.querySelector(".settings-button").querySelector("h4").textContent = Game.translate("buttons.settings")

    const coalUpgradeTexts = document.querySelector(".coal-drill-speed").querySelector(".upgrade-info-wrapper")
    const mupUnlock = document.querySelector(".money-upgrade-tree").querySelector(".upgrade-info-wrapper")

    coalUpgradeTexts.querySelector(".upgrade-header-text").textContent = Game.translate("shopUpgrades.higherCoalDrillSpeed.header")
    coalUpgradeTexts.querySelector(".upgrade-bottom-text").textContent = Game.translate("shopUpgrades.higherCoalDrillSpeed.mainInfo")

    coalUpgradeTexts.querySelector(".upgrade-amount-text").textContent = Game.translate("etc.level") + ": 1"

    mupUnlock.querySelector(".upgrade-header-text").textContent = Game.translate("shopUpgrades.upgradeTreeUnlock.header")
    mupUnlock.querySelector(".upgrade-bottom-text").textContent = Game.translate("shopUpgrades.upgradeTreeUnlock.mainInfo")

    const inventoryCoalCardButtons = Array.from(document.querySelector(".coal-card").querySelector(".inv-actions").children)

    inventoryCoalCardButtons[0].textContent = Game.translate("etc.sell")
    inventoryCoalCardButtons[2].textContent = Game.translate("etc.sellall")

    document.querySelector(".coal-card").querySelector("p").textContent = Game.translate("inventory.coal")

    document.querySelector(".load-screen").querySelector("h3").textContent = Game.translate("etc.loading")

    let furnaceZone = document.querySelector(".furnace-zone");

    furnaceZone.querySelector(".raw-input").querySelector("h3").textContent = Game.translate("furnace.rawInput")
    furnaceZone.querySelector(".fuel-input").querySelector("h3").textContent = Game.translate("furnace.fuelInput")
    furnaceZone.querySelector(".output").querySelector("h3").textContent = Game.translate("furnace.output")

    document.querySelector(".inventory-overlay").querySelector("h3").textContent = Game.translate("etc.selectItem")

    let settingsZone = document.querySelector(".settings-section")

    settingsZone.querySelector("p").textContent = Game.translate("settings.sounds")
    settingsZone.querySelector(".sfx").querySelector("h3").textContent = Game.translate("settings.sfx")
    settingsZone.querySelector(".music").querySelector("h3").textContent = Game.translate("settings.music")

    document.querySelector(".credits").textContent = Game.translate("settings.credits")

    document.querySelector(".credits-popup").querySelector("h3").textContent = Game.translate("settings.credits") + ":"
}

bakeTranslations()



window.GameLanguage = GameLanguage;
a(7)