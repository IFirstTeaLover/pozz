const rawInput = document.querySelector(".raw-input")
const fuelInput = document.querySelector(".fuel-input")
const output = document.querySelector(".output")

let furnace = {
    raw: {raw_iron: 0},
    fuel: {coal: 0},
    output: {}
}

rawInput.addEventListener("click", ()=>{
    openInventoryOverlay(furnace, "raw")
})

fuelInput.addEventListener("click", ()=>{
    openInventoryOverlay(furnace, "fuel")
})

function checkFurnace(){
    
}

a(6)