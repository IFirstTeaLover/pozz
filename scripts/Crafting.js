const CraftingSystem = (() => {

  const recipeTypes = {};

  function addMaterial(name, amount) {
    inventory[name] = (inventory[name] || 0) + amount;
  }

  function removeMaterial(name, amount) {
    if ((inventory[name] || 0) < amount) return false;
    inventory[name] -= amount;
    return true;
  }

  function getInventory() {
    return { ...inventory };
  }


  // recipe types
  // handler(recipe, inventory) should:
  //   - check if crafting is possible
  //   - consume materials if so
  //   - return { success: bool, message: string, result?: any }
  //
  // Example types: "standard", "smelt", "enchant", "combine"

  function registerType(typeName, handler) {
    if (recipeTypes[typeName]) {
      console.warn(`Recipe type "${typeName}" already exists. Overwriting.`);
    }
    recipeTypes[typeName] = { handler, recipes: {} };
  }

  function registerRecipe(typeName, recipeName, recipeData) {
    if (!recipeTypes[typeName]) {
      throw new Error(`Unknown recipe type "${typeName}". Register the type first.`);
    }
    recipeTypes[typeName].recipes[recipeName] = recipeData;
  }

  function getRecipe(typeName, recipeName) {
    return recipeTypes[typeName]?.recipes[recipeName] ?? null;
  }

  function listRecipes(typeName) {
    if (!recipeTypes[typeName]) return [];
    return Object.keys(recipeTypes[typeName].recipes);
  }

  function listTypes() {
    return Object.keys(recipeTypes);
  }

  function craft(typeName, recipeName, context) {
    const type = recipeTypes[typeName];
    if (!type) return { success: false, message: `Unknown recipe type "${typeName}".` };

    const recipe = type.recipes[recipeName];
    if (!recipe) return { success: false, message: `Recipe "${recipeName}" not found.` };

    return type.handler(recipe, context ?? inventory);
  }

  function hasEnough(requirements) {
    return Object.entries(requirements).every(
      ([mat, qty]) => (inventory[mat] || 0) >= qty
    );
  }

  function consume(requirements) {
    for (const [mat, qty] of Object.entries(requirements)) {
      inventory[mat] = (inventory[mat] || 0) - qty;
    }
  }

  function checkVars(requirements, ...vars) {
    function findKey(obj, key) {
      if (obj === null || typeof obj !== "object") return undefined;
      if (key in obj) return obj[key];
      for (const val of Object.values(obj)) {
        const found = findKey(val, key);
        if (found !== undefined) return found;
      }
      return undefined;
    }

    const missing = [];

    for (const [key, need] of Object.entries(requirements)) {
      let have = 0;
      for (const v of vars) {
        const found = findKey(v, key);
        if (found !== undefined) { have = found; break; }
      }
      if (have < need) missing.push({ key, need, have });
    }

    return { ok: missing.length === 0, missing };
  }

  return {
    addMaterial,
    removeMaterial,
    getInventory,
    registerType,
    registerRecipe,
    getRecipe,
    listRecipes,
    listTypes,
    craft,
    hasEnough,
    consume,
    checkVars,
  };

})();



// smelting
// recipe shape: { input: string, inputQty: number, fuel: string, fuelQty: number, output: string }

CraftingSystem.registerType("furnace", (recipe, ctx) => {
  // ctx is the furnace object you pass in manually
  const rawHave = ctx.raw[recipe.input] ?? 0;
  const fuelHave = ctx.fuel[recipe.fuel] ?? 0;

  if (rawHave < recipe.inputQty || fuelHave < recipe.fuelQty) {
    return { success: false, message: "Not enough materials in furnace." };
  }

  ctx.raw[recipe.input] -= recipe.inputQty;
  ctx.fuel[recipe.fuel] -= recipe.fuelQty;
  ctx.output[recipe.output] = (ctx.output[recipe.output] || 0) + 1;

  return { success: true, message: `Smelted ${recipe.output}.`, result: { item: recipe.output, qty: 1 } };
});


CraftingSystem.registerRecipe("furnace", "iron_ingot", {
  input: "iron", inputQty: 1,
  fuel: "coal", fuelQty: 1,
  output: "iron_ingot",
});


CraftingSystem.checkVars({ raw_iron: 1, coal: 1 }, furnace);
// { success: true, message: 'Smelted 2x Iron Ore into 1x Iron Ingot.', ... }

console.log(CraftingSystem.getInventory());