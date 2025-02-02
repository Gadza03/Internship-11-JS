const industries = [];

do {
  const name = validateText("Enter a worker's name: ");
  const surname = validateText("Enter a worker's surname: ");
  const industryName = validateText("Enter an industry name: ");
  const salary = validatePrice();

  const worker = {
    name: name,
    surname: surname,
    industry: industryName,
    salary: salary,
    salaryShare: 0,
  };

  let industry = industries.find((ind) => ind.name === industryName);

  if (!industry) {
    industry = {
      name: industryName,
      salaryShare: 0,
      sectorSalary: 0,
      workers: [],
    };
    industries.push(industry);
  }

  industry.workers.push(worker);
  industry.sectorSalary += salary;
} while (confirm("Do you want to continue?"));

const totalSalary = industries.reduce(
  (sum, industry) => sum + industry.sectorSalary,
  0
);

industries.forEach((industry) => {
  industry.salaryShare = (industry.sectorSalary / totalSalary) * 100;

  industry.workers.forEach((worker) => {
    worker.salaryShare = (worker.salary / industry.sectorSalary) * 100;
  });
});

industries.sort((a, b) => b.salaryShare - a.salaryShare);

console.log(`Total salary: ${totalSalary.toFixed(2)}\n`);

industries.forEach((industry) => {
  console.log(
    `${industry.name}: ${industry.salaryShare.toFixed(2)}% of total salary`
  );
  industry.workers.forEach((worker) => {
    console.log(
      `${worker.name} ${worker.surname}, salary: ${
        worker.salary
      }, contribution in sector: ${worker.salaryShare.toFixed(2)}%`
    );
  });
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

function validatePrice() {
  let price = 0;
  do {
    price = prompt("Enter a salary: ").trim();
    price = parseFloat(price);
    if (isNaN(price) || price <= 0) {
      alert("Salary must be a number and greater than 0.\nTry again.");
    }
  } while (price <= 0 || isNaN(price));
  return price;
}
