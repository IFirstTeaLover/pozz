let inventory = {
    coal: 0,
    iron: 0,
    steel: 0
}
const keys = ["coal", "iron", "steel"];
let prices = [20, 100]

function updateCards() {
    let cards = Array.from(document.getElementsByClassName("inventory-zone")[0].children)

    cards.forEach((card, index) => {
        const type = keys[index];
        const cardButtons = card.children[3]

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
        money += prices[index]
    }
}

function sellAll(type, index) {
    if (inventory[type] > 0) {
        money += inventory[type] * prices[index];
        inventory[type] = 0;
    }
}

updateCards()

a(1)