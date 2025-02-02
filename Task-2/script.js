let workers = [];

do {
  let name = validateText("Enter a worker's name:: ");
  let surname = validateText("Enter a worker's surname: ");
  let industry = validateText("Enter an indurstry name: ");
  let salary = validateSalary();

  let worker = {
    name: name,
    surname: surname,
    industry: industry,
    salary: salary,
  };

  workers.push(worker);
} while (confirm("Do you want to continue?"));

function calculateAverageSalaryByIndustry(workers) {
  let industryStats = {};

  workers.forEach((worker) => {
    if (!industryStats[worker.industry]) {
      industryStats[worker.industry] = {
        totalSalary: 0,
        count: 0,
      };
    }
    industryStats[worker.industry].totalSalary += worker.salary;
    industryStats[worker.industry].count += 1;
  });

  for (let industry in industryStats) {
    industryStats[industry].averageSalary =
      industryStats[industry].totalSalary / industryStats[industry].count;
  }

  return industryStats;
}

function sortIndustries(industryStats) {
  let industries = [];

  for (let industry in industryStats) {
    industries.push(industry);
  }

  return industries.sort((a, b) => a.localeCompare(b));
}

function filterIndustriesWithTwoOrMoreEmployees(industryStats) {
  let filteredIndustries = {};

  for (let industry in industryStats) {
    if (industryStats[industry].count >= 2) {
      filteredIndustries[industry] = industryStats[industry];
    }
  }

  return filteredIndustries;
}

let industryStats = calculateAverageSalaryByIndustry(workers);

for (let industry in industryStats) {
  console.log(
    `${industry}: Average Salary: ${industryStats[
      industry
    ].averageSalary.toFixed(2)}, Number of Employees: ${
      industryStats[industry].count
    }`
  );
}

let filteredIndustries = filterIndustriesWithTwoOrMoreEmployees(industryStats);

let sortedIndustries = sortIndustries(filteredIndustries);

if (sortedIndustries.length > 0) {
  console.log("Industry statistics with at least 2 employees:");
  sortedIndustries.forEach((industry) => {
    console.log(
      `Industry: ${industry}, Average Salary: ${filteredIndustries[
        industry
      ].averageSalary.toFixed(2)}, Number of Employees: ${
        filteredIndustries[industry].count
      }`
    );
  });
} else {
  console.log("No industries with at least 2 employees found.");
}

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

function validateSalary() {
  let price = 0;

  do {
    price = prompt("Enter a salary: ").trim();
    price = parseFloat(price);

    if (isNaN(price) || price <= 600) {
      alert("Price have to be a number and greater than 600.\n Try again.");
    }
  } while (price <= 600 || isNaN(price));

  return price;
}
