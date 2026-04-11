let inventory = {
    coal: 10,
    iron: 10,
    steel: 0
}

let types = {
    raw: ["raw_iron"],
    fuel: ["coal"]
}

const closeButton = document.querySelector(".inventory-overlay-close");
const overlay = document.querySelector(".inventory-overlay")

let prices = [20, 40, 200];

function updateCards() {
    let cards = Array.from(document.getElementsByClassName("inventory-zone")[0].children)

    cards.forEach((card, index) => {
        const type = Array.from(card.classList)
            .find(c => c.endsWith("-card") && c !== "inventory-card")
            .replace("-card", "")
        const cardButtons = card.children[3];

        const btnOne = cardButtons.children[0];
        const btnAll = cardButtons.children[2];

        if (btnOne._listener) btnOne.removeEventListener("click", btnOne._listener);
        if (btnAll._listener) btnAll.removeEventListener("click", btnAll._listener);

        btnOne._listener = () => sellOne(type, index);
        btnAll._listener = () => sellAll(type, index);

        btnOne.addEventListener("click", btnOne._listener);
        btnAll.addEventListener("click", btnAll._listener);
    });
}

function sellOne(type, index) {
    if (inventory[type] > 0) {
        inventory[type] -= 1;
        money += prices[index];
    }
}

function sellAll(type, index) {
    if (inventory[type] > 0) {
        money += inventory[type] * prices[index];
        inventory[type] = 0;
    }
}

updateCards()

function openInventoryOverlay(executor, slot, inventoryType) {
    const overlayCards = overlay.querySelector(".overlay-cards")
    const inventory = document.querySelector(".inventory-zone")
    overlayCards.innerHTML = inventory.innerHTML

    const inventoryCards = Array.from(overlayCards.children)
    const transDef = "translate(-50%, -50%) scale("

    inventoryCards.forEach(card => {
        const invActionsPath = Array.from(Array.from(card.children)[3].children)
        invActionsPath[0].innerHTML = Game.translate("etc.select")
        invActionsPath[2].innerHTML = Game.translate("etc.selectAll")

        invActionsPath[0].addEventListener("click", () => {
            overlay.style.transform = transDef + "0)"
        })

        invActionsPath[2].addEventListener("click", () => {
            overlay.style.transform = transDef + "0)"
        })
    })

    overlay.style.transform = transDef + "1)"

    let cards = Array.from(document.querySelector(".overlay-cards").children)

    cards.forEach((card, index) => {
        const type = Array.from(card.classList)
            .find(c => c.endsWith("-card") && c !== "inventory-card")
            .replace("-card", "")

        const cardButtons = card.children[3];

        const btnOne = cardButtons.children[0];
        const btnAll = cardButtons.children[2];

        if (btnOne._listener) btnOne.removeEventListener("click", btnOne._listener, slot);
        if (btnAll._listener) btnAll.removeEventListener("click", btnAll._listener, slot);

        btnOne._listener = () => selectOne(type, executor, slot, inventoryType);
        btnAll._listener = () => selectAll(type, executor, slot, inventoryType);

        btnOne.addEventListener("click", btnOne._listener);
        btnAll.addEventListener("click", btnAll._listener);
    });
}

function selectOne(type, executor, slot, inventoryType) {
    if (inventory[type] > 0) {
        retrieveFromInventory(1, executor, type, slot, inventoryType)
    }
}

function selectAll(type, executor, slot, inventoryType) {
    let amount
    if (inventory[type] > 0) {
        if (inventory[type] > 100) {
            amount = 100
        } else {
            amount = inventory[type]
        }
    }
    retrieveFromInventory(amount, executor, type, slot, inventoryType)
}

closeButton.addEventListener("click", () => {
    overlay.style.transform = "translate(-50%, -50%) scale(0)";
    overlay.querySelector(".overlay-cards").innerHTML = "";
})

function retrieveFromInventory(amount, executor, type, slot, inventoryType) {
    switch (inventoryType) {
        case "furnace":

            switch (slot) {
                case "raw":

                    if (Object.values(executor.raw).every(v => v === 0)) {
                        if (executor.raw[type] !== null) {
                            executor.raw[type] += executor.raw[type] + amount;
                            inventory[type] -= amount
                        }
                    } else {
                        Game.Notification(notification.generic.occupied.slot);
                    }

                    checkFurnace()
                    break;

                case "fuel":

                    if (Object.values(executor.fuel).every(v => v === 0)) {
                        if (furnace.fuel["coal"] !== null) {
                            executor.fuel[type] += executor.fuel[type] + amount;
                            inventory[type] -= amount
                        }
                    } else {
                        Game.Notification(notification.generic.occupied.slot);
                    }

                    checkFurnace()
                    break;
            }

    }
}

function newInventoryCard(className, name, image) {
    card = coalCard.cloneNode(true)
    card.classList.replace("coal-card", className)
    card.children[0].innerHTML = Game.translate(name)
    ironAmount = card.querySelector(".inv-amount");
    card.querySelector(".item-preview").src = image

    document.querySelector(".inventory-zone").appendChild(card)
    updateCards()
    updateInventoryCards()
}

a(1)

//note: minimal desktop webapp size is 1035!!