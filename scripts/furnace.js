const rawInput = document.querySelector(".raw-input")
const fuelInput = document.querySelector(".fuel-input")
const output = document.querySelector(".output")

let furnace = {
    raw: {raw_iron: 0},
    fuel: 0,
    output: 0
}

rawInput.addEventListener("click", ()=>{
    openInventoryOverlay(furnace, "raw")
})

a(6)