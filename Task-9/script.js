const cities = [];

do {
  const city = validateText("Enter the name of the city: ");
  cities.push(city);
} while (confirm("Do you want to continue?"));

cities.sort((a, b) => a.localeCompare(b));
console.log("All cities list: ");
cities.forEach((city) => {
  console.log(city);
});

const filteredCities = cities.filter((city) => city.length > 5); // Store the result

console.log("\nCities with name longer than 5 characters:");
filteredCities.forEach((city) => {
  console.log(city);
});

const csvFormat = filteredCities.join(", ");

const saveButton = document.querySelector("#saveBtn");

saveButton.addEventListener("click", () => {
  const fileContent = new Blob([csvFormat], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(fileContent);
  downloadLink.download = "cities.csv";
  downloadLink.click();
});

function validateText(textPrompt) {
  let text = "";
  do {
    text = prompt(textPrompt).trim();
    if (text.length < 2) {
      alert(
        "This field can't be empty or shorter than 2 characters.\nTry Again."
      );
    }
  } while (text.length < 2);
  return text;
}
