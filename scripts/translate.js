const availableLanguages = ['en-US', 'ru-RU'];

window.GameLanguage = {
    translations: {},
    ready: null,
    readyResolve: null,
    async init() {
        let lang = navigator.language;
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

    document.querySelector(".drills-button").querySelector("h4").innerHTML = window.GameLanguage.t("buttons.drills")

    const coalUpgradeTexts = document.querySelector(".coal-drill-speed").querySelector(".upgrade-info-wrapper")

    coalUpgradeTexts.querySelector(".upgrade-header-text").innerHTML = window.GameLanguage.t("shopUpgrades.higherCoalDrillSpeed.header")
    coalUpgradeTexts.querySelector(".upgrade-bottom-text").innerHTML = window.GameLanguage.t("shopUpgrades.higherCoalDrillSpeed.mainInfo")

    const inventoryCoalCardButtons = Array.from(document.querySelector(".coal-card").querySelector(".inv-actions").children)

    inventoryCoalCardButtons[0].innerHTML = window.GameLanguage.t("etc.sell")
    inventoryCoalCardButtons[2].innerHTML = window.GameLanguage.t("etc.sellall")
}

bakeTranslations()



window.GameLanguage = GameLanguage;
a(7)