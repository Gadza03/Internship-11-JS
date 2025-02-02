const equipment = [];

document
  .querySelector("#equipment-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#name-input").value.trim();
    if (name.length < 2) {
      alert("Name can't be empty or shorter than 2 characters.\nTry Again.");
      return;
    }

    let price = document.querySelector("#price-input").value;
    price = validatePrice(price);
    if (!price) {
      alert("PRice must be a number and greater than 0.\nTry again.");
      return;
    }
    const status = document.querySelector("input[name='status']:checked").value;

    equipment.push({ name, price, status });

    updateList();

    getRatio();

    this.reset();
  });

function updateList() {
  equipment.sort(
    (a, b) => a.status.localeCompare(b.status) || a.name.localeCompare(b.name)
  );

  let listWrapper = document.querySelector("#equipment-list");
  listWrapper.innerHTML = "";

  equipment.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toFixed(2)}$`;
    li.style.color = item.status === "Available" ? "green" : "red";
    listWrapper.appendChild(li);
  });
}

function getRatio() {
  let availableCount = 0;
  let unavailableCount = 0;
  equipment.forEach((item) => {
    if (item.status === "Available") availableCount++;
    else unavailableCount++;
  });

  const ratio = document.querySelector("#status-ratio");
  ratio.textContent = `Ratio: ${availableCount} / ${unavailableCount}`;
}

function validatePrice(price) {
  price = parseFloat(price);
  if (isNaN(price) || price <= 0) return null;

  return price;
}
