function energyFunc(button) {
    resetAndReset(button)
    document.querySelector(".shop-zone").classList.add("shown")
}

addButton("./images/energy.svg", Game.translate('buttons.energy'), () => energyFunc(".energy-button"), "energy-button", 6)
