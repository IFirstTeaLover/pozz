let inventory = {
    coal: 0,
    iron: 0,
    steel: 0
}

let types = {
    raw: ["raw_iron"],
    fuel: ["coal"]
}

const closeButton = document.querySelector(".inventory-overlay-close");
const overlay = document.querySelector(".inventory-overlay")

let prices = [20, 100];

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

function openInventoryOverlay(executor, slot) {
    const overlayCards = overlay.querySelector(".overlay-cards")
    const inventory = document.querySelector(".inventory-zone")
    overlayCards.innerHTML = inventory.innerHTML

    const inventoryCards = Array.from(overlayCards.children)
    const transDef = "translate(-50%, -50%) scale("

    inventoryCards.forEach(card => {
        const invActionsPath = Array.from(Array.from(card.children)[3].children)
        invActionsPath[0].innerHTML = "Select"
        invActionsPath[2].innerHTML = "Select Max"

        invActionsPath[0].addEventListener("click", () => {
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

        btnOne._listener = () => selectOne(type, executor, slot);
        btnAll._listener = () => selectAll(type, executor, slot);

        btnOne.addEventListener("click", btnOne._listener);
        btnAll.addEventListener("click", btnAll._listener);
    });
}

function selectOne(type, executor, slot) {
    if (inventory[type] > 0) {
        retrieveFromInventory(1, executor, type, slot)
    }
}

function selectAll(type, executor, slot) {
    let amount
    if (inventory[type] > 0) {
        if (inventory[type] > 100) {
            amount = 100
        } else {
            amount = inventory[type]
        }
    }
    retrieveFromInventory(amount, executor, type, slot)
}

closeButton.addEventListener("click", () => {
    overlay.style.transform = "translate(-50%, -50%) scale(0)";
    overlay.querySelector(".overlay-cards").innerHTML = "";
})

function retrieveFromInventory(amount, executor, type, slot) {
    inventory[type] -= amount
    switch (slot) {
        case "raw":
            executor.raw[type] += amount
            break;
    }
}

a(1)