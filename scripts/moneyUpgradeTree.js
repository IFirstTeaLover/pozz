const tooltip = document.querySelector(".tooltip")
const origin = document.getElementById("origin")
const infos = [
    { header: "Iron Drill", mainInfo: "Unlocks iron drill", price: 5000, max: 1, purchased: false },
    { header: "Copper Drill", mainInfo: "Unlocks copper drill", price: 50000, max: 1, purchased: false },
    { header: "Better coal", mainInfo: "Makes coal more valuable (+10/lvl)", price: 10000, max: 10, purchased: false, level: 0, },
    { header: "Unlock Blast Furnace", mainInfo: "Unlocks blast furnace to make alloys", price: 7500, max: 1, purchased: false },
]

origin.addEventListener("pointermove", e => {
    showInfo(e.clientX, e.clientY, 0)
});

origin.addEventListener("pointerleave", () => {
    hideInfo()
});

origin.addEventListener("click", () => buyTreeUpgrade(0, origin))
function addNode(nodeID, x, y, parentId, iconSrc) {
    const container = document.querySelector('.money-upgrade-tree-zone');
    const lineGroup = document.getElementById('line-group');
    const newNodeId = "node-" + nodeID;

    const span = document.createElement('span');
    span.id = newNodeId;
    span.className = 'node';

    span.style.left = x * 100 + 2480 + "px";
    span.style.top = 0 - y * 100 + 250 + "px";

    span.addEventListener("pointermove", e => {
        showInfo(e.clientX, e.clientY, nodeID)
    });

    span.addEventListener("pointerleave", () => {
        hideInfo()
    });

    span.addEventListener("click", () => {
        buyTreeUpgrade(nodeID, span)
    })

    container.appendChild(span);

    const icon = document.createElement("img");
    icon.src = iconSrc
    icon.style.width = "40px"
    icon.style.aspectRatio = "1/1"
    icon.style.objectFit = "contain"

    if (iconSrc == "./images/MUP/more_coal_value.png") icon.style.width = "60px"

    span.appendChild(icon)

    if (parentId) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const lineId = "line-" + newNodeId;
        line.setAttribute("id", lineId);
        line.setAttribute("stroke", "#555");
        line.setAttribute("stroke-width", "8");
        line.style.opacity = "0.2"
        lineGroup.appendChild(line);
        updateConnection(parentId, newNodeId, lineId);
    }

    return newNodeId;
}

function updateConnection(id1, id2, lineId) {
    const node1 = document.getElementById(id1);
    const node2 = document.getElementById(id2);
    const line = document.getElementById(lineId);
    const container = document.querySelector('.money-upgrade-tree-zone').getBoundingClientRect();

    const r1 = node1.getBoundingClientRect();
    const r2 = node2.getBoundingClientRect();

    line.setAttribute('x1', (r1.left + r1.width / 2) - container.left);
    line.setAttribute('y1', (r1.top + r1.height / 2) - container.top);
    line.setAttribute('x2', (r2.left + r2.width / 2) - container.left);
    line.setAttribute('y2', (r2.top + r2.height / 2) - container.top);
}

const node1 = addNode(1, -1, 1, "origin", "./images/MUP/drill.svg");
const node2 = addNode(2, 1, 1, "origin", "./images/MUP/more_coal_value.png");
const node3 = addNode(3, -1, -1, "origin", "./images/blast_furnace.svg");


const zone = document.querySelector('.money-upgrade-tree-zone');

zone.classList.remove("shown")

let isDragging = false;
let lastX = 0;
let lastY = 0;

let offsetX = -2000
let offsetY = 0

zone.style.left = offsetX + "px";
zone.style.top = offsetY + "px";

function onMouseMove(event) {
    if (!isDragging) return;

    event.preventDefault();

    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    lastX = event.clientX;
    lastY = event.clientY;

    offsetX += deltaX;
    offsetY += deltaY;

    const canvas = document.querySelector(".money-upgrade-tree-zone");

    let currentLeft = parseFloat(canvas.style.left) || 0;
    canvas.style.left = offsetX + "px";

    let currentTop = parseFloat(canvas.style.top) || 0;
    canvas.style.top = offsetY + "px";

}

document.addEventListener("pointerdown", (event) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;

    document.addEventListener("pointermove", onMouseMove);

});

document.addEventListener("pointerup", () => {
    isDragging = false;
    document.removeEventListener("pointermove", onMouseMove);
});

let hideTimeout = null
let showFrame = null

function showInfo(x, y, id) {
    if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
    }
    

    tooltip.style.display = "block"
    tooltip.style.left = x + 15 + "px"
    tooltip.style.top = y + 15 + "px"
    
    showFrame = requestAnimationFrame(() => {
        tooltip.classList.add("shown")
    })

    const text = tooltip.children

    text[0].innerHTML = infos[id]?.header || "Failed to find tooltip header!"
    text[1].innerHTML = infos[id]?.mainInfo || "Please try reloading"
    try {
        if (infos[id].purchased == false) {
            text[2].innerHTML = "$" + infos[id]?.price
        } else {
            text[2].innerHTML = "Purchased"
        }
    } catch (e) { text[2].innerHTML = "Unknown" }


}

function hideInfo() {
    if (showFrame) {
        cancelAnimationFrame(showFrame)
        showFrame = null
    }

    tooltip.classList.remove("shown")
    hideTimeout = setTimeout(() => {
        tooltip.style.display = "none"
        hideTimeout = null
    }, 200)
}

function buyTreeUpgrade(id, purchaser) {
    if (infos[id].purchased) return
    const enoughMoney = money >= infos[id].price
    const isMax = infos[id].max >= infos[id].level
    if (enoughMoney) money -= infos[id].price
    switch (id) {
        case 0:
            if (enoughMoney) {
                purchasedDrills.push({
                    type: "iron", level: 1, miningTime: 0, upgradePrice: 1000, firstCase: true
                })
                addUpgrade("inventory/iron.png", window.GameLanguage.t("shopUpgrades.higherIronDrillSpeed") , "Increases iron drill speed (5000 divided by (level/2))", "1000", "iron-drill-speed")
                const newBar = document.querySelector(".progress-bar").cloneNode(true)
                progressBar2 = newBar.querySelector(".progress-fill")
                document.querySelector(".drills-zone").append(newBar)
                purchaser.classList.add("purchased")
                infos[id].purchased = true
                break;
            }

        case 2:
            if (enoughMoney) {
                if (isMax) {
                    prices[0] += 10
                    infos[2].level = infos[2].level + 1
                    infos[2].price = infos[2].price + 2500
                } else {
                    infos[id].purchased = true
                    purchaser.classList.add("purchased")
                }
                updateCards()
                break;
            }

        case 3:
            if (enoughMoney) {
                infos[id].purchased = true;
                purchaser.classList.add("purchased");
                blastFurnaceUnlocked = true;
                break;
            }
    }
}

a(4)
