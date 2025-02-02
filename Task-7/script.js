const n = validateNumber();

const squares = Array.from({ length: n }, (_, i) => (i + 1) ** 2);

const totalSum = squares.reduce((sum, num) => sum + num, 0);

const average = totalSum / squares.length;
const median = getMedian();

console.log(`First ${n} square numbers:`);
squares.forEach((square) => {
  console.log(square);
});
console.log(`\nTotal sum: ${totalSum}`);
console.log(`Average: ${average.toFixed(2)}`);
console.log(`Median: ${median}`);

function getMedian() {
  if (squares.length % 2 === 0) {
    return (squares[squares.length / 2 - 1] + squares[squares.length / 2]) / 2;
  }
  return squares[Math.floor(squares.length / 2)];
}
function validateNumber() {
  let number;
  do {
    number = prompt("Enter a number: ").trim();
    number = parseFloat(number);

    if (isNaN(number) || number < 0)
      alert("Price must be a number and greater than 0.\nTry again.");
  } while (isNaN(number) || number < 0);
  return number;
}
