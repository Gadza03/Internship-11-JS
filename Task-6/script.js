const equipment = [];
const availableList = [];
const unavailableList = [];

do {
  const name = validateText("Enter equipment name: ");
  const price = validatePrice();
  const status = validateSatus();

  const equipmentItem = {
    name: name,
    price: price,
    status: status,
  };

  if (status === "available") {
    availableList.push(equipmentItem);
  } else {
    unavailableList.push(equipmentItem);
  }

  equipment.push(equipmentItem);
} while (confirm("Do you want to continue?"));

unavailableEquipmentIndex();

availableItemsSorted();

printEquipmentStatistics();

printGroupRangs();

function availableItemsSorted() {
  const sortedEquipment = availableList.sort((a, b) => {
    if (a.price === b.price) {
      return a.name.localeCompare(b.name);
    }
    return a.price - b.price;
  });

  console.log("\nAvailable equipment (sorted by price and name):");
  if (sortedEquipment.length === 0) {
    console.log("No items in available list.");
  } else {
    sortedEquipment.forEach((item) => {
      console.log(`Name: ${item.name}, Price: ${item.price}$`);
    });
  }
}

function printGroupRangs() {
  const groupedEquipment = {
    cheap: availableList.filter((item) => item.price < 50),
    medium: availableList.filter(
      (item) => item.price >= 50 && item.price <= 100
    ),
    expensive: availableList.filter((item) => item.price > 100),
  };

  const printGroup = (groupName, items) => {
    console.log(`\n${groupName.toUpperCase()} equipment:`);
    if (items.length === 0) {
      console.log("No items in this group.");
    } else {
      items.forEach((item, index) => {
        console.log(`${index + 1}. Name: ${item.name}, Price: ${item.price}$`);
      });
    }
  };

  printGroup("Cheap", groupedEquipment.cheap);
  printGroup("Medium", groupedEquipment.medium);
  printGroup("Expensive", groupedEquipment.expensive);
}

function printEquipmentStatistics() {
  const totalValue = equipment.reduce((sum, item) => sum + item.price, 0);

  const unavailableValue = unavailableList.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const percentageUnavailable = (unavailableValue / totalValue) * 100;

  console.log(`\nTotal value of all equipment: ${totalValue}$`);
  console.log(`Total value of unavailable equipment: ${unavailableValue}$`);
  console.log(
    `Percentage of unavailable equipment: ${percentageUnavailable.toFixed(2)}%`
  );
}

function unavailableEquipmentIndex() {
  console.log("Unavailable equipment list:");
  for (let i = 0; i < equipment.length; i++) {
    const item = equipment[i];
    if (item.status === "unavailable") {
      console.log(`${i}. ${item.name}`);
    }
  }
}

function validatePrice() {
  let price = 0;

  do {
    price = prompt("Enter a price: ").trim();
    price = parseFloat(price);

    if (isNaN(price) || price <= 0) {
      alert("Price must be a number and greater than 0.\nTry again.");
    }
  } while (price <= 0 || isNaN(price));

  return price;
}

function validateSatus() {
  const status = ["available", "unavailable"];
  let text;
  do {
    text = prompt("Enter a status (available/unavailable): ");
    if (!status.includes(text)) {
      alert("Status must be either 'available' or 'unavailable'.\nTry again.");
    }
  } while (!status.includes(text));

  return text;
}

function validateText(textPrompt) {
  let text = "";

  do {
    text = prompt(textPrompt).trim();
    if (text.length < 2) {
      alert(
        "This field cannot be empty or shorter than 2 characters.\nTry again."
      );
    }
  } while (text.length < 2);

  return text;
}
