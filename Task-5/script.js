const students = [];

do {
  const firstName = validateText("Enter a student's name: ");
  const lastName = validateText("Enter a student's surname: ");
  const score = validateScore();

  const student = {
    firstName: firstName,
    lastName: lastName,
    score: score,
    category: getCategory(score),
  };

  let category = students.find((cat) => cat.category === student.category);

  if (!category) {
    category = {
      category: student.category,
      totalScore: 0,
      students: [],
    };
    students.push(category);
  }

  category.students.push(student);
  category.totalScore += score;
} while (confirm("Do you want to continue?"));

students.forEach((category) => {
  category.students.sort((a, b) => a.lastName.localeCompare(b.lastName));
});

students.forEach((category) => {
  console.log(`Category: ${category.category}`);
  category.students.forEach((student) => {
    console.log(
      `${student.lastName}, ${student.firstName}: ${student.score} points`
    );
  });

  const averageScore = category.totalScore / category.students.length;
  console.log(
    `Average score for ${category.category}: ${averageScore.toFixed(2)}`
  );
  console.log("");
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

function validateScore() {
  let score = 0;

  do {
    score = prompt("Enter score (0-100): ").trim();
    score = parseInt(score);

    if (isNaN(score) || score < 0 || score > 100) {
      alert("Score must be a number between 0 and 100.\nTry again.");
    }
  } while (score < 0 || score > 100 || isNaN(score));

  return score;
}

function getCategory(score) {
  if (score <= 25) return "0-25%";
  if (score <= 50) return "25-50%";
  if (score <= 75) return "50-75%";
  return "75-100%";
}
