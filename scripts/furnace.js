const rawInput = document.querySelector(".raw-input")
const fuelInput = document.querySelector(".fuel-input")
const output = document.querySelector(".output")

let furnace = {
    raw: {iron: 0},
    fuel: {coal: 0},
    output: {}
}

rawInput.addEventListener("click", ()=>{
    openInventoryOverlay(furnace, "raw", "furnace")
})

fuelInput.addEventListener("click", ()=>{
    openInventoryOverlay(furnace, "fuel", "furnace")
})

function checkFurnace() {
  const result = CraftingSystem.checkVars({ iron: 1, coal: 1 }, furnace);

  if (result.ok) {
    const craftResult = CraftingSystem.craft("furnace", "iron_ingot", furnace);
    if (craftResult.success) output.textContent = furnace.output.iron_ingot;
  }
}

a(6)