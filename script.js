// 😋 Ingredient list
const ingredients = [
  "Tomato", "Lettuce", "Cheese", "Bread", "Onion",
  "Chicken", "Egg", "Bacon", "Pickle", "Patty"
];

// 🍔 Active order
let currentOrder = [];

// 🔪 DOM selectors
const ingredientsDiv = document.getElementById("ingredients");
const pan = document.getElementById("pan");
const orderText = document.getElementById("order-text");

// 🍽️ Create draggable ingredients
function setupIngredients() {
  ingredientsDiv.innerHTML = "";
  ingredients.forEach(name => {
    const ing = document.createElement("div");
    ing.classList.add("ingredient");
    ing.textContent = name;
    ing.draggable = true;
    ing.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", name);
    });
    ingredientsDiv.appendChild(ing);
  });
}

// 👨‍🍳 Start the game
function startGame() {
  generateOrder();
  setupIngredients();
}

// 🎯 Generate a random order of 3-5 ingredients
function generateOrder() {
  const shuffled = ingredients.sort(() => 0.5 - Math.random());
  currentOrder = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
  orderText.textContent = currentOrder.join(", ");
}

// 🍳 Pan drop logic
pan.addEventListener("dragover", e => {
  e.preventDefault();
});

pan.addEventListener("drop", e => {
  e.preventDefault();
  const name = e.dataTransfer.getData("text/plain");
  const dropItem = document.createElement("div");
  dropItem.textContent = name;
  dropItem.classList.add("ingredient");
  pan.appendChild(dropItem);

  // 🔍 Check if all items in order are added
  const currentItems = Array.from(pan.children).map(div => div.textContent);
  const matched = currentOrder.every(item => currentItems.includes(item));

  if (matched) {
    setTimeout(() => {
      alert("🍽️ Order complete! Great job chef!");
      pan.innerHTML = "";
      generateOrder();
    }, 300);
  }
});
