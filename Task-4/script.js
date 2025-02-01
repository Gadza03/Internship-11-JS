const plants = [];

do {
  const plantName = validateText("Enter plant name: ");
  const color = validateText("Enter color: ");
  const calories = validateCalories();

  const plant = {
    name: plantName,
    color: color,
    calories: calories,
  };

  let colorGroup = plants.find((group) => group.color === color);

  if (!colorGroup) {
    colorGroup = {
      color: color,
      totalCalories: 0,
      plants: [],
    };
    plants.push(colorGroup);
  }

  colorGroup.plants.push(plant);
  colorGroup.totalCalories += calories;
} while (confirm("Do you want to continue?"));

plants.sort((a, b) => a.color.localeCompare(b.color));

console.log("Plants grouped by color and total calories:");
plants.forEach((group) => {
  console.log(`Color: ${group.color}`);
  console.log(`Total calories: ${group.totalCalories}`);
  group.plants.forEach((plant) => {
    console.log(`${plant.name}: ${plant.calories} calories`);
  });
  console.log();
});

const topThreeColors = plants
  .sort((a, b) => b.totalCalories - a.totalCalories)
  .slice(0, 3);

console.log("Top 3 colors:");
topThreeColors.forEach((group) => {
  console.log(`${group.color}: ${group.totalCalories} calories`);
});

function validateText(textPrompt) {
  let text = "";

  do {
    text = prompt(textPrompt).trim();
    if (text.length < 2) {
      alert(
        "This field can't be empty, or shorter than 2 characters.\nTry Again."
      );
    }
  } while (text.length < 2);

  return text;
}

function validateCalories() {
  let calories = 0;

  do {
    calories = prompt("Enter number of calories: ").trim();
    calories = parseInt(calories);

    if (isNaN(calories) || calories <= 0) {
      alert("Calories must be a number and greater than 0.\n Try again.");
    }
  } while (calories <= 0 || isNaN(calories));

  return calories;
}
